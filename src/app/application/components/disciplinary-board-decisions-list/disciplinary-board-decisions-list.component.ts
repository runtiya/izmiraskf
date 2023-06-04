import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { DisciplinaryBoardDecisionModel } from "../../models/application-disciplinaryboarddecisions.model";
import { DisciplinaryBoardDecisionsService } from "../../services/application-disciplinaryboarddecisions.service";

import { DisciplinaryBoardFileModel } from "../../models/application-disciplinaryboardfiles.model";
import { DisciplinaryBoardFilesService } from "../../services/application-disciplinaryboardfiles.service";

import { SeasonsService } from "../../services/application-seasons.service";
import { SeasonsModel } from "../../models/application-seasons.model";


import { disciplinaryPenalTypeList } from "../../../assets/lists/disciplinary-penaltype-list";
import { disciplinaryBelongingToList } from "../../../assets/lists/disciplinary-belongingto-list";

@Component({
  selector: 'app-application-disciplinary-board-decisions-list',
  templateUrl: './disciplinary-board-decisions-list.component.html',
  styleUrls: ['../../../app.component.css', './disciplinary-board-decisions-list.component.css']
})
export class ApplicationDisciplinaryBoardDecisionsList implements OnInit, OnDestroy {

  headerTitle = "DİSİPLİN KURULU KARARLARI";
  isLoading = false;

  seasonsList: SeasonsModel[] = [];
  private seasonsListSubscription: Subscription;

  disciplinaryBoardFilesList: DisciplinaryBoardFileModel[] = [];
  private disciplinaryBoardFilesListSubscription: Subscription;

  disciplinaryBoardDecisionsList: DisciplinaryBoardDecisionModel[] = [];
  private disciplinaryBoardDecisionsListSubscription: Subscription;

  disciplinaryPenalTypeList = disciplinaryPenalTypeList;
  disciplinaryBelongingToList = disciplinaryBelongingToList;

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
                              "explanation"
                            ];

  constructor(
    public disciplinaryBoardDecisionsService: DisciplinaryBoardDecisionsService,
    public disciplinaryBoardFilesService: DisciplinaryBoardFilesService,
    public seasonsService: SeasonsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListSubListener()
      .subscribe((data: SeasonsModel[]) => {
          this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
          this.seasonSelectionId = this.seasonsList[0]["id"];
          this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(this.seasonSelectionId);
          this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);

      });


    this.disciplinaryBoardFilesListSubscription = this.disciplinaryBoardFilesService.getDisciplinaryBoardFilesUpdateListener()
      .subscribe((data: DisciplinaryBoardFileModel[]) => {
          this.disciplinaryBoardFilesList = data.sort((a, b) => b.caseDate.toString().localeCompare(a.caseDate.toString()));
          this.disciplinaryBoardFileSelectionId = this.disciplinaryBoardFilesList[0]["id"];
          this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
      });

    this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisionsUpdateListener()
      .subscribe((data: DisciplinaryBoardDecisionModel[]) => {
          const filteredDisciplinaryBoardDecisionsList = data.filter(decision => decision.disciplinaryBoardFileId === this.disciplinaryBoardFileSelectionId);
          this.disciplinaryBoardDecisionsList = filteredDisciplinaryBoardDecisionsList;

      });
  }

  onSeasonChange() {
    this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(this.seasonSelectionId);
    this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
  }

  onFileNoChange() {
      this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
  }

  findPenalType(penalType: string): string {
    return penalType ? this.disciplinaryPenalTypeList.find(p => p.name == penalType).value : null;
  }

  findBelongingTo(belongingTo: string): string {
      return belongingTo ? this.disciplinaryBelongingToList.find(b => b.name == belongingTo).value : null;
  }

  ngOnDestroy(): void {

  }
}
