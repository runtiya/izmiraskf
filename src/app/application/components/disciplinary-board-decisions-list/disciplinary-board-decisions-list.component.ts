import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { DisciplinaryBoardDecisionModel } from "../../models/application-disciplinaryboarddecisions.model";
import { DisciplinaryBoardDecisionsService } from "../../services/application-disciplinaryboarddecisions.service";

import { DisciplinaryBoardFileModel } from "../../models/application-disciplinaryboardfiles.model";
import { DisciplinaryBoardFilesService } from "../../services/application-disciplinaryboardfiles.service";

import { SeasonsService } from "../../services/application-seasons.service";
import { SeasonsModel } from "../../models/application-seasons.model";

import { disciplinaryPenalTypeList } from "../../../assets/lists/disciplinary-penaltype.list";
import { disciplinaryBelongingToList } from "../../../assets/lists/disciplinary-belongingto.list";
import { disciplinaryCommitteesList } from "../../../assets/lists/disciplinary-committees.list";

import { ApplicationDisciplinaryBoardDecisionsDetailsModal } from "../disciplinary-board-decisions-details/disciplinary-board-decisions-details.component";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-application-disciplinary-board-decisions-list',
  templateUrl: './disciplinary-board-decisions-list.component.html',
  styleUrls: ['../../../app.component.css', './disciplinary-board-decisions-list.component.css']
})
export class ApplicationDisciplinaryBoardDecisionsList implements OnInit, OnDestroy {
  toolbarTitle = null;
  isLoading: boolean = false;

  seasonsList: SeasonsModel[] = [];
  private seasonsListSubscription: Subscription;

  disciplinaryBoardFilesList: DisciplinaryBoardFileModel[] = [];
  private disciplinaryBoardFilesListSubscription: Subscription;
  disciplinaryBoardFileDetails: DisciplinaryBoardFileModel = <DisciplinaryBoardFileModel>{};

  disciplinaryBoardDecisionsList: DisciplinaryBoardDecisionModel[] = [];
  private disciplinaryBoardDecisionsListSubscription: Subscription;

  disciplinaryPenalTypeList = disciplinaryPenalTypeList;
  disciplinaryBelongingToList = disciplinaryBelongingToList;
  disciplinaryCommitteesList = disciplinaryCommitteesList;

  url_caseType: string = null;

  @Input() seasonSelectionId: number;
  @Input() disciplinaryBoardFileSelectionId: number;

  tableColumns: string[] = [
                              "leagueName",
                              "teamName",
                              "licenseNo",
                              "fullName",
                              "belongingTo",
                              "penalType",
                              "duration",
                              "actions"
                            ];

  constructor(
    public disciplinaryBoardDecisionsService: DisciplinaryBoardDecisionsService,
    public disciplinaryBoardFilesService: DisciplinaryBoardFilesService,
    public seasonsService: SeasonsService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions,
    private router: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.router.paramMap
          .subscribe(params => {
            this.url_caseType = params.get('casetype').toUpperCase();
            this.toolbarTitle = disciplinaryCommitteesList.find(c => c.name == this.url_caseType).pageDecisionTitle;
            this.globalFunctions.setToolbarTitle(this.toolbarTitle);
            this.seasonsService.getSeasons();
          });


    this.seasonsListSubscription = this.seasonsService.getSeasonsListUpdateListener()
      .subscribe({
        next: (data: SeasonsModel[]) => {
          this.seasonsList = data;
          this.seasonSelectionId = this.seasonsList[0]["id"];
          this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(this.seasonSelectionId, this.url_caseType);
          this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
        },
        error: (error) => {

        }
      });


    this.disciplinaryBoardFilesListSubscription = this.disciplinaryBoardFilesService.getDisciplinaryBoardFilesUpdateListener()
      .subscribe({
        next: (data: DisciplinaryBoardFileModel[]) => {
          this.disciplinaryBoardFilesList = data;
          this.disciplinaryBoardFileSelectionId = this.disciplinaryBoardFilesList[0]["id"];
          this.disciplinaryBoardFileDetails = this.disciplinaryBoardFilesList[0];
          this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
        },
        error: (error) => {

        }
      });

    this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisionsUpdateListener()
      .subscribe({
        next: (data: DisciplinaryBoardDecisionModel[]) => {

          const filteredDisciplinaryBoardDecisionsList = data.filter(decision => decision.disciplinaryBoardFileId === this.disciplinaryBoardFileSelectionId);
          this.disciplinaryBoardDecisionsList = filteredDisciplinaryBoardDecisionsList;
          //this.disciplinaryBoardDecisionsList = data;
        },
        error: (error) => {

        }
      })

  }

  onSearch() {
    if (this.disciplinaryBoardFileSelectionId !== null) {
      this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
      this.disciplinaryBoardFileDetails = this.disciplinaryBoardFileSelectionId !== null ? this.disciplinaryBoardFilesList.find(file => file.id == this.disciplinaryBoardFileSelectionId) : null;
    } else {
      // Show error message here
      alert('Dosya Numarası seçiniz')
    }

  }

  onSeasonChange() {
    this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(this.seasonSelectionId, this.url_caseType);
    this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
  }

  onFileNoChange() {
      this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
      this.disciplinaryBoardFileDetails = this.disciplinaryBoardFileSelectionId !== null ? this.disciplinaryBoardFilesList.find(file => file.id == this.disciplinaryBoardFileSelectionId) : null;
  }

  findPenalType(penalType: string): string {
    return penalType ? this.disciplinaryPenalTypeList.find(p => p.name == penalType).value : null;
  }

  findBelongingTo(belongingTo: string): string {
    return belongingTo ? this.disciplinaryBelongingToList.find(b => b.name == belongingTo).value : null;
  }

  openDisciplinaryBoardDecisionDetailsModal(disciplinaryBoardDecision: DisciplinaryBoardDecisionModel) {
    const dialogRef = this.dialog.open(ApplicationDisciplinaryBoardDecisionsDetailsModal, {
      data: {
        disciplinaryBoardDecisionInfo: disciplinaryBoardDecision,
        disciplinaryBoardFileInfo: this.disciplinaryBoardFileDetails
      }
    });
  }

  ngOnDestroy(): void {
    this.seasonsListSubscription.unsubscribe();
    this.disciplinaryBoardFilesListSubscription.unsubscribe();
    //this.disciplinaryBoardDecisionsListSubscription.unsubscribe();
  }
}
