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

  filterLeagueList: Array<string> = [];
  @Input() filterLeagueSelectionValue: string = null;
  filterTeamList: Array<string> = [];
  @Input() filterTeamSelectionValue: string = null;
  filterBelongingToList: Array<string> = [];
  @Input() filterBelongingToSelectionValue: string = null;
  filterPenalTypeList: Array<string> = [];
  @Input() filterPenalTypeSelectionValue: string = null;

  filteredDisciplinaryBoardDecisionsList: DisciplinaryBoardDecisionModel[] = [];

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
    private disciplinaryBoardDecisionsService: DisciplinaryBoardDecisionsService,
    private disciplinaryBoardFilesService: DisciplinaryBoardFilesService,
    private seasonsService: SeasonsService,
    private dialog: MatDialog,
    private globalFunctions: globalFunctions,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
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
          if (data.length > 0) {
            this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
            this.seasonSelectionId = this.seasonsList[0]["id"];
            this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(this.seasonSelectionId, this.url_caseType);
            this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
          } else {
            this.seasonsList = [];
            this.disciplinaryBoardFilesList = [];
            this.disciplinaryBoardDecisionsList = [];

            this.seasonSelectionId = null;
            this.disciplinaryBoardFileSelectionId = null;

            this.isLoading = false;
          }

        }
      });

    this.disciplinaryBoardFilesListSubscription = this.disciplinaryBoardFilesService.getDisciplinaryBoardFilesUpdateListener()
      .subscribe({
        next: (data: DisciplinaryBoardFileModel[]) => {
          if (data.length > 0) {
            this.disciplinaryBoardFilesList = data;
            this.disciplinaryBoardFileSelectionId = this.disciplinaryBoardFilesList[0]["id"];
            this.disciplinaryBoardFileDetails = this.disciplinaryBoardFilesList[0];
            this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
          } else {
            this.disciplinaryBoardFilesList = [];
            this.disciplinaryBoardDecisionsList = [];

            this.disciplinaryBoardFileSelectionId = null;
            this.disciplinaryBoardFileDetails = null;

            this.isLoading = false;
          }
        }
      });

    this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisionsUpdateListener()
      .subscribe({
        next: (data: DisciplinaryBoardDecisionModel[]) => {
          if (data.length > 0) {
            const filteredDisciplinaryBoardDecisionsList = data.filter(decision => decision.disciplinaryBoardFileId === this.disciplinaryBoardFileSelectionId);
            this.disciplinaryBoardDecisionsList = filteredDisciplinaryBoardDecisionsList;
            this.filteredDisciplinaryBoardDecisionsList = this.disciplinaryBoardDecisionsList;

            this.filterLeagueList = this.getDistinctLeagueName(this.disciplinaryBoardDecisionsList);
            this.filterTeamList = this.getDistinctTeamName(this.disciplinaryBoardDecisionsList);
            this.filterBelongingToList = this.getDistinctBelongignToName(this.disciplinaryBoardDecisionsList);
            this.filterPenalTypeList = this.getDistinctPenalTypeName(this.disciplinaryBoardDecisionsList);
          } else {
            this.disciplinaryBoardDecisionsList = [];
            this.filteredDisciplinaryBoardDecisionsList = this.disciplinaryBoardDecisionsList;
          }

          this.isLoading = false;
        }
      });
  }

  onSearch() {
    if (this.disciplinaryBoardFileSelectionId !== null) {
      this.isLoading = true;
      this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
      this.disciplinaryBoardFileDetails = this.disciplinaryBoardFileSelectionId !== null ? this.disciplinaryBoardFilesList.find(file => file.id == this.disciplinaryBoardFileSelectionId) : null;
    } else {
      this.globalFunctions.showSnackBar('disciplinaryboard.error.selectfile');
    }

  }

  onSeasonChange() {
    this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(this.seasonSelectionId, this.url_caseType);
  }

  onFileNoChange() {
      this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
      this.disciplinaryBoardFileDetails = this.disciplinaryBoardFileSelectionId !== null ? this.disciplinaryBoardFilesList.find(file => file.id == this.disciplinaryBoardFileSelectionId) : null;
  }

  findPenalType(penalType: string): string {
    return penalType ? this.disciplinaryPenalTypeList.find(p => p.name == penalType).value : null;
  }

  findPenalTypeName(penalTypeValue: string): string {
    return penalTypeValue ? this.disciplinaryPenalTypeList.find(p => p.value == penalTypeValue).name : null;
  }

  findBelongingTo(belongingTo: string): string {
    return belongingTo ? this.disciplinaryBelongingToList.find(b => b.name == belongingTo).value : null;
  }

  findBelongingToName(belongingToValue: string): string {
    return belongingToValue ? this.disciplinaryBelongingToList.find(b => b.value == belongingToValue).name : null;
  }


  getDistinctLeagueName(disciplinaryBoardDecisionsList: DisciplinaryBoardDecisionModel[]): Array<string> {
    const distinctLeagueName = [...new Set(disciplinaryBoardDecisionsList.map(dbd => dbd.leagueName))].filter(dbd => dbd !== null);
    return distinctLeagueName;
  }

  getDistinctTeamName(disciplinaryBoardDecisionsList: DisciplinaryBoardDecisionModel[]): Array<string> {
    const distinctTeamName = [...new Set(disciplinaryBoardDecisionsList.map(dbd => dbd.teamShortName || dbd.teamOfficialName))].filter(dbd => dbd !== null);
    return distinctTeamName;
  }

  getDistinctBelongignToName(disciplinaryBoardDecisionsList: DisciplinaryBoardDecisionModel[]): Array<string> {
    const distinctBelongignToName = [...new Set(disciplinaryBoardDecisionsList.map(dbd => this.findBelongingTo(dbd.belongingTo)))].filter(dbd => dbd !== null);
    return distinctBelongignToName;
  }

  getDistinctPenalTypeName(disciplinaryBoardDecisionsList: DisciplinaryBoardDecisionModel[]): Array<string> {
    const distinctPenalTypeName = [...new Set(disciplinaryBoardDecisionsList.map(dbd => this.findPenalType(dbd.penalType)))].filter(dbd => dbd !== null);
    return distinctPenalTypeName;
  }

  filterDisciplinaryBoardDecisionsList() {
    let _filteredDisciplinaryBoardDecisionsList: DisciplinaryBoardDecisionModel[];

    _filteredDisciplinaryBoardDecisionsList = this.disciplinaryBoardDecisionsList.filter(dbd =>
      dbd.leagueName == (this.filterLeagueSelectionValue || dbd.leagueName) &&
      dbd.teamOfficialName == (this.filterTeamSelectionValue || dbd.teamOfficialName) &&
      dbd.belongingTo == (this.findBelongingToName(this.filterBelongingToSelectionValue) || dbd.belongingTo) &&
      dbd.penalType == (this.findPenalTypeName(this.filterPenalTypeSelectionValue) || dbd.penalType)
    );

    this.filteredDisciplinaryBoardDecisionsList = _filteredDisciplinaryBoardDecisionsList;
  }

  getLocalDate(_date: Date): string {
    return this.globalFunctions.getLocalDate(_date);
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
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
