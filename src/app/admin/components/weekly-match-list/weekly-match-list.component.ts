import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { SeasonsModel } from "../../models/admin-seasons.model";
import { SeasonsService } from "../../services/admin-seasons.service";

import { WeeklyMatchProgramModel } from "../../models/admin-weeklymatchprogram.model";
import { WeeklyMatchProgramService } from "../../services/admin-weeklymatchprogram.service";

import { WeeklyMatchListModel } from "../../models/admin-weeklymatchlist.model";
import { WeeklyMatchListService } from "../../services/admin-weeklymatchlist.service";

import { FixtureModel } from "../../models/admin-fixture.model";
import { FixtureService } from "../../services/admin-fixtures.service";
import { AdminFixtureEditModal } from "../fixture-edit/fixture-edit.component";

import { AdminWeeklyMatchListAddMatchModal } from "../weekly-match-list-add-match/weekly-match-list-add-match.component";

import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";
import { TeamsInGroupstagesService } from "../../services/admin-teams-in-groupstages.service";

import { StadiumsModel } from "../../models/admin-stadiums.model";
import { StadiumsService } from "../../services/admin-stadiums.service";

import { globalFunctions } from "../../../functions/global.function";
import { fixtureFunctions } from "../../functions/fixture.function";

import { FixtureSearchModel } from "../../models/admin-fixture-search-index.model";

import { fileImportExportFunctions } from "../../functions/file-import-export.function";

@Component({
  selector: 'app-admin-weeklymatch-list',
  templateUrl: './weekly-match-list.component.html',
  styleUrls: ['../../../app.component.css', './weekly-match-list.component.css']
})
export class AdminWeeklyMatchList implements OnInit, OnDestroy {
  toolbarTitle = "HAFTALIK MÜSABAKA LİSTESİ";
  isLoading: boolean = false;

  seasonsList: SeasonsModel[] = [];
  private seasonsListSubscription: Subscription;
  weeklyMatchProgramList: WeeklyMatchProgramModel[] = [];
  private weeklyMatchProgramListSubscription: Subscription;
  weeklyMatchList: WeeklyMatchListModel[] = [];
  private weeklyMatchListSubscription: Subscription;
  fixtureList: FixtureModel[] = [];
  private fixtureListSub: Subscription;
  teamsingroupstagesList: TeamsInGroupstagesModel[] = [];
  private teamsingroupstgesListSub: Subscription;
  stadiumList: StadiumsModel[] = [];
  private stadiumListSub: Subscription;

  @Input() seasonSelectionId: number;
  @Input() weeklyMatchProgramSelectionId: number;

  tableColumns: string[] = [
                            "matchNo",
                            "homeTeam",
                            "details",
                            "awayTeam",
                            "actions"
                          ];

  constructor(
    private seasonsService: SeasonsService,
    private weeklymatchprogramService: WeeklyMatchProgramService,
    private weeklymatchlistService : WeeklyMatchListService,
    private fixtureService: FixtureService,
    private teamsingroupstagesService: TeamsInGroupstagesService,
    private stadiumService: StadiumsService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions,
    private fixtureFunctions: fixtureFunctions,
    private fileImportExportFunctions: fileImportExportFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListUpdateListener()
      .subscribe({
        next: (data: SeasonsModel[]) => {
          if (data.length > 0) {
            this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
            this.seasonSelectionId = this.seasonSelectionId || this.seasonsList[0]["id"];
            this.weeklymatchprogramService.getWeeklyMatchProgram(this.seasonSelectionId);
          } else {
            this.weeklyMatchProgramList = [];
            this.weeklyMatchList = [];

            this.seasonSelectionId = null;
            this.weeklyMatchProgramSelectionId = null;
            this.isLoading = false;
          }
        }
      });

    this.weeklyMatchProgramListSubscription = this.weeklymatchprogramService.getDocumentsListUpdateListener()
      .subscribe({
        next: (data: WeeklyMatchProgramModel[]) => {
          if (data.length > 0) {
            this.weeklyMatchProgramList = data;
            this.weeklyMatchProgramSelectionId = this.weeklyMatchProgramSelectionId || this.weeklyMatchProgramList[0]["id"];
            this.weeklymatchlistService.getWeeklyMatchList(this.weeklyMatchProgramSelectionId);
            this.fixtureService.getFixtureBySearchIndex(this.onGetFixtureSearchIndex(this.seasonSelectionId, this.weeklyMatchProgramSelectionId));
          } else {
            this.weeklyMatchProgramSelectionId = null;
            this.weeklyMatchProgramList = [];
            this.weeklyMatchList = [];
            this.fixtureList = [];
            this.isLoading = false;
          }
        }
      });

    this.weeklyMatchListSubscription = this.weeklymatchlistService.getWeeklyMatchListUpdateListener()
      .subscribe({
        next: (data: WeeklyMatchListModel[]) => {
          this.weeklyMatchList = data.length > 0 ? data : [];
        }
      });

    this.fixtureListSub = this.fixtureService.getFixtureUpdateListener()
      .subscribe({
        next: (data: FixtureModel[]) => {
          this.fixtureList = data.length > 0 ? data : [];

          this.isLoading = false;
        }
      });

    this.stadiumService.getStadiums();
    this.stadiumListSub = this.stadiumService.getStadiumListUpdateListener()
      .subscribe({
        next: (data: {stadiumsList: StadiumsModel[], stadiumsCount: number}) => {
          this.stadiumList = data.stadiumsList.length > 0 ? data.stadiumsList : [];
        }
      });
  }

  onSeasonChange(seasonSelectionId: number) {
    this.isLoading = true;
    this.weeklymatchprogramService.getWeeklyMatchProgram(seasonSelectionId);
  }

  onWeeklyMatchProgramChange(seasonSelectionId: number, weeklyMatchProgramId: number) {
    this.isLoading = true;
    this.weeklymatchlistService.getWeeklyMatchList(weeklyMatchProgramId);
    this.fixtureService.getFixtureBySearchIndex(this.onGetFixtureSearchIndex(seasonSelectionId, weeklyMatchProgramId));
  }

  onGetFixtureSearchIndex(seasonSelectionId, weeklyMatchProgramId): FixtureSearchModel {
    let fixtureSearchIndex: FixtureSearchModel = this.fixtureFunctions.setFixtureSearchModel(
      seasonSelectionId,
      null, null, null, null, null, null, null, null, null, null, null,
      weeklyMatchProgramId
    );

    return fixtureSearchIndex;
  }

  onEdit(fixture: FixtureModel) {
    this.teamsingroupstagesService.getTeamsInGroupstages(fixture.groupstageId);
    this.teamsingroupstgesListSub = this.teamsingroupstagesService.getTeamsInGroupstagesUpdateListener()
      .subscribe({
        next: (data: TeamsInGroupstagesModel[]) => {
          this.teamsingroupstagesList = data;

          const dialogRef = this.dialog.open(AdminFixtureEditModal, {
            data: {
              pageMode: 'edit',
              fixtureInfo: fixture,
              stadiumList: this.stadiumList,
              teamsingroupstagesList: this.teamsingroupstagesList,
              seasonSelectionId: fixture.seasonId,
              leagueSelectionId: fixture.leagueId,
              groupstageSelectionId: fixture.groupstageId,
              fixtureSearchIndex: this.onGetFixtureSearchIndex(this.seasonSelectionId, this.weeklyMatchProgramSelectionId)
            }
          });

          dialogRef.afterClosed()
            .subscribe({
              next: (data) => {
                this.teamsingroupstagesList = [];
                this.teamsingroupstgesListSub.unsubscribe();
              }
            });
        }
      });
  }

  onAddList(matchId: number, matchNo: string) {
    let match = this.weeklyMatchList.find(wml => wml.matchId === matchId && wml.matchNo === matchNo);
    match.isInList = true;

    this.weeklymatchlistService.updateMatchList(match);
  }

  onRemoveList(matchId: number, matchNo: string) {
    let match = this.weeklyMatchList.find(wml => wml.matchId === matchId && wml.matchNo === matchNo);
    match.isInList = false;

    this.weeklymatchlistService.updateMatchList(match);
  }

  onAddMatch() {
    this.seasonsListSubscription.unsubscribe();
    this.weeklyMatchProgramListSubscription.unsubscribe();
    this.weeklyMatchListSubscription.unsubscribe();
    this.fixtureListSub.unsubscribe();
    const dialogRef = this.dialog.open(AdminWeeklyMatchListAddMatchModal, {
      data: {
        selectedSeasonId: this.seasonSelectionId,
        selectedWeeklyMatchProgramId: this.weeklyMatchProgramSelectionId,

      }
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (data) => {
          this.ngOnInit();
        }
      });
  }

  onClearWeeklyMatchList(seasonSelectionId: number, weeklyMatchProgramId: number) {
    let fixtureSearchIndex = this.onGetFixtureSearchIndex(seasonSelectionId, weeklyMatchProgramId);
    this.weeklymatchlistService.clearMatchList(weeklyMatchProgramId, fixtureSearchIndex);
  }

  onExport() {
    this.fileImportExportFunctions.exportExcelWeeklyMatchList(this.fixtureList, this.weeklyMatchProgramSelectionId);
  }

  getMatchDate(_date: Date): string {
    return this.globalFunctions.getDateTime(_date);
  }

  getMatchStatus(status: string): string {
    return this.globalFunctions.getMatchStatusValue(status);
  }

  getMatchStatusClass(status: string): string {
    return this.globalFunctions.getMatchStatusClass(status);
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  findMatchInFixture(matchId: number, matchNo): boolean {
    let match = this.fixtureList.find(f => f.id === matchId && f.matchNo === matchNo);
    return !!match;
  }

  findMatchInList(matchId: number, matchNo: string): boolean {
    let match = this.weeklyMatchList.find(wml => wml.matchId === matchId && wml.matchNo === matchNo);
    return match ? match.isInList : false;
  }

  ngOnDestroy(): void {
    this.seasonsListSubscription.unsubscribe();
    this.weeklyMatchProgramListSubscription.unsubscribe();
    this.weeklyMatchListSubscription.unsubscribe();
    this.fixtureListSub.unsubscribe();
    this.stadiumListSub.unsubscribe();
  }
}
