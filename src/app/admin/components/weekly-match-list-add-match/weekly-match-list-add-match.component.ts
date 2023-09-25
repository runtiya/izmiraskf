import { Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";
import { Subscription } from 'rxjs';

import { SeasonsModel } from "../../models/admin-seasons.model";
import { SeasonsService } from "../../services/admin-seasons.service";

import { LeaguesModel } from "../../models/admin-leagues.model";
import { LeaguesService } from "../../services/admin-leagues.service";

import { GroupStagesModel } from "../../models/admin-groupstages.model";
import { GroupStagesService } from "../../services/admin-groupstages.service";

import { StadiumsModel } from "../../models/admin-stadiums.model";
import { StadiumsService } from "../../services/admin-stadiums.service";

import { TeamsModel } from "../../models/admin-teams.model";
import { TeamsService } from "../../services/admin-teams.service";

import { FixtureModel } from "../../models/admin-fixture.model";
import { FixtureService } from "../../services/admin-fixtures.service";

import { FixtureSearchModel } from "../../models/admin-fixture-search-index.model";

import { globalFunctions } from "../../../functions/global.function";
import { fixtureFunctions } from "../../functions/fixture.function";

import { WeeklyMatchProgramModel } from "../../models/admin-weeklymatchprogram.model";
import { WeeklyMatchProgramService } from "../../services/admin-weeklymatchprogram.service";

import { WeeklyMatchListModel } from "../../models/admin-weeklymatchlist.model";
import { WeeklyMatchListService } from "../../services/admin-weeklymatchlist.service";

import { matchStatusList } from "../../../assets/lists/match-status.list";
import { townList } from "../../../assets/lists/town-izmir.list";

import { MatchModel } from "../../models/admin-match.model";

@Component({
  selector: 'app-admin-weeklymatch-list-add-match',
  templateUrl: './weekly-match-list-add-match.component.html',
  styleUrls: ['../../../app.component.css', './weekly-match-list-add-match.component.css']
})
export class AdminWeeklyMatchListAddMatchModal implements OnInit, OnDestroy {
  isLoading: boolean = false;
  seasonList: SeasonsModel[] = [];
  private seasonListSub: Subscription;
  leagueList: LeaguesModel[] = [];
  private leagueListSub: Subscription;
  groupstageList: GroupStagesModel[] = [];
  private groupstageListSub: Subscription;
  weekSequenceList: Array<number>[] = [];
  private weekSequenceListSub: Subscription;
  stadiumList: StadiumsModel[] = [];
  private stadiumListSub: Subscription;
  teamList: TeamsModel[] = [];
  private teamListSub: Subscription;
  weeklyMatchProgramList: WeeklyMatchProgramModel[] = [];
  private weeklyMatchProgramListSub: Subscription;
  fixtureList: FixtureModel[] = [];
  private fixtureListSub: Subscription;
  matchList: MatchModel[] = [];
  matchStatusList: Array<any> = matchStatusList;
  townList: Array<any> = townList;


  addedMatchToWeeklyProgram: WeeklyMatchListModel[] = [];

  @Input() seasonSelectionId: number;
  @Input() leagueSelectionId: number;
  @Input() groupstageSelectionId: number;
  @Input() matchWeekSelectionValue: number
  @Input() matchNoInputValue: string;
  @Input() stadiumSelectionId: number;
  @Input() homeTeamSelectionId: number;
  @Input() awayTeamSelectionId: number;
  @Input() matchStatusSelectionValue: string;
  @Input() townSelectionValue: string;
  @Input() startDatePickedValue: Date;
  @Input() endDatePickedValue: Date;
  @Input() weeklyMatchProgramId: number;
  @Input() fixtureSearchIndex: FixtureSearchModel;


  tableColumns: string[] = [
                                    "matchNo",
                                    "homeTeam",
                                    "details",
                                    "awayTeam",
                                    "actions"
                                  ];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<AdminWeeklyMatchListAddMatchModal>,
    private seasonsService: SeasonsService,
    private leaguesService: LeaguesService,
    private groupstagesService: GroupStagesService,
    private stadiumsService: StadiumsService,
    private teamsService: TeamsService,
    private fixtureService: FixtureService,
    private weeklymatchprogramService: WeeklyMatchProgramService,
    private weeklyMatchListService: WeeklyMatchListService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions,
    private fixtureFunctions: fixtureFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.seasonsService.getSeasons();
    this.seasonListSub = this.seasonsService.getSeasonsListUpdateListener()
      .subscribe({
        next: (data: SeasonsModel[]) => {
          if (data.length > 0) {
            this.seasonList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
          } else {
            this.seasonList = [];
            this.leagueList = [];
            this.groupstageList = [];
            this.weekSequenceList = [];
          }
          this.isLoading = false;
        }
      });

    this.leagueListSub = this.leaguesService.getLeagueListUpdateListener()
      .subscribe({
        next: (data: LeaguesModel[]) => {
          if (data.length > 0) {
            this.leagueList = data.sort((a, b) => a.orderNo - b.orderNo);
          } else {
            this.leagueList = [];
            this.groupstageList = [];
            this.weekSequenceList = [];
          }
          this.isLoading = false;
        }
      });

    this.groupstageListSub = this.groupstagesService.getGroupStageListUpdateListener()
      .subscribe({
        next: (data: GroupStagesModel[]) => {
          if (data.length > 0) {
            this.groupstageList = data.sort((a, b) => a.orderNo - b.orderNo);
          } else {
            this.groupstageList = [];
            this.weekSequenceList = [];
          }
          this.isLoading = false;
        }
      });

    this.weekSequenceListSub = this.groupstagesService.getGroupWeeksUpdateListener()
      .subscribe({
        next: (data: Array<number>[]) => {
          this.weekSequenceList = data;
          this.isLoading = false;
        }
      });


    this.stadiumsService.getStadiums();
    this.stadiumListSub = this.stadiumsService.getStadiumListUpdateListener()
      .subscribe({
        next: (data: {stadiumsList: StadiumsModel[], stadiumsCount: number}) => {
          this.stadiumList = data.stadiumsList.sort((a, b) => a.stadiumName.localeCompare(b.stadiumName));
        }
      });


    this.teamsService.getTeams();
    this.teamListSub = this.teamsService.getTeamsListUpdateListener()
      .subscribe({
        next: (data: {teamsList: TeamsModel[], teamsCount: number}) => {
          this.teamList = data.teamsList.sort((a, b) => a.officialName.localeCompare(b.officialName));
        }
      });

    this.weeklyMatchProgramListSub = this.weeklymatchprogramService.getDocumentsListUpdateListener()
      .subscribe({
        next: (data: WeeklyMatchProgramModel[]) => {
          this.weeklyMatchProgramList = data;
        }
      });

    this.fixtureListSub = this.fixtureService.getFixtureUpdateListener()
      .subscribe({
        next: (data: FixtureModel[]) => {
          this.fixtureList = data;
          this.isLoading = false;
        }
      });

  }

  onSeasonChange(_seasonSelectionId: number) {
    this.isLoading = true;
    this.leaguesService.getLeagues(_seasonSelectionId);
    this.weeklymatchprogramService.getWeeklyMatchProgram(_seasonSelectionId);
  }

  onLeagueChange(_leagueSelectionId: number) {
    this.isLoading = true;
    this.groupstagesService.getGroupstages(_leagueSelectionId);
  }

  onGroupstageChange(_groupstageSelectionId: number) {
    this.isLoading = true;
    this.groupstagesService.getGroupWeeks(_groupstageSelectionId);
  }

  findMatchStatus(status: string): string {
    return this.matchStatusList.find(s => s.name == status).value;
  }

  findMatchStatusClass(status: string): string {
    return this.matchStatusList.find(s => s.name == status).class;
  }

  findTown(town: string) {
    return town ? townList.find(t => t.name == town).value : 'Seçiniz';
  }

  getMatchDate(_date: Date): string {
    const longDate = this.globalFunctions.getLocalDate(_date);
    const shortTime = this.globalFunctions.getLocalDateTime(_date);

    return longDate || shortTime ? (longDate + " " + shortTime) : null;
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  isMatchinList(matchId: number, matchNo: string): boolean {
    const isMatchInList = this.addedMatchToWeeklyProgram.find(m => m.matchId === matchId && m.matchNo === matchNo);

    return !!isMatchInList;
  }

  onAddList(_matchId: number, _matchNo: string) {
    const match = this.fixtureList.find(f => f.id === _matchId && f.matchNo === _matchNo);
    let _weeklyMatchList: WeeklyMatchListModel = <WeeklyMatchListModel>{};
    _weeklyMatchList.id = null;
    _weeklyMatchList.createdAt = null;
    _weeklyMatchList.createdBy = null;
    _weeklyMatchList.updatedAt = null;
    _weeklyMatchList.updatedBy = null;
    _weeklyMatchList.weeklyMatchProgramId = this.data.selectedWeeklyMatchProgramId;
    _weeklyMatchList.matchId = _matchId;
    _weeklyMatchList.matchNo = _matchNo;
    _weeklyMatchList.isInList = true;

    this.addedMatchToWeeklyProgram.push(_weeklyMatchList);
  }

  onRemoveList(_matchId: number, _matchNo: string) {
    const _filtertedMatchList: WeeklyMatchListModel[] = this.addedMatchToWeeklyProgram.filter(m => m.matchId !== _matchId && m.matchNo !== _matchNo);
    this.addedMatchToWeeklyProgram = _filtertedMatchList;
  }

  onSearch() {
    this.isLoading = true;

    let arr_fixtureSearchValues = [];
    this.fixtureSearchIndex = this.fixtureFunctions.setFixtureSearchModel(
      this.seasonSelectionId || null,
      this.leagueSelectionId || null,
      this.groupstageSelectionId || null,
      this.matchWeekSelectionValue || null,
      this.matchNoInputValue || null,
      this.stadiumSelectionId || null,
      this.homeTeamSelectionId || null,
      this.awayTeamSelectionId || null,
      this.matchStatusSelectionValue || null,
      this.townSelectionValue || null,
      this.startDatePickedValue || null,
      this.endDatePickedValue || null,
      this.weeklyMatchProgramId || null
    );

    arr_fixtureSearchValues.push(this.fixtureSearchIndex.seasonId);
    arr_fixtureSearchValues.push(this.fixtureSearchIndex.leagueId);
    arr_fixtureSearchValues.push(this.fixtureSearchIndex.groupstageId);
    arr_fixtureSearchValues.push(this.fixtureSearchIndex.matchWeek);
    arr_fixtureSearchValues.push(this.fixtureSearchIndex.matchNo);
    arr_fixtureSearchValues.push(this.fixtureSearchIndex.stadiumId);
    arr_fixtureSearchValues.push(this.fixtureSearchIndex.homeTeamId);
    arr_fixtureSearchValues.push(this.fixtureSearchIndex.awayTeamId);
    arr_fixtureSearchValues.push(this.fixtureSearchIndex.matchStatus);
    arr_fixtureSearchValues.push(this.fixtureSearchIndex.town);
    arr_fixtureSearchValues.push(this.fixtureSearchIndex.startDate);
    arr_fixtureSearchValues.push(this.fixtureSearchIndex.endDate);
    arr_fixtureSearchValues.push(this.fixtureSearchIndex.weeklyMatchProgramId);

    let _filteredSearchKeys = arr_fixtureSearchValues.filter(v => v !== null);
    if (_filteredSearchKeys.length >= 2) {
      this.fixtureService.getFixtureBySearchIndex(this.fixtureSearchIndex);
    } else {
      this.isLoading = false;
      this.globalFunctions.showSnackBar('En az iki arama anahtarı giriniz!');
    }
  }

  onAdd() {
    this.weeklyMatchListService.createWeeklyMatchList(this.addedMatchToWeeklyProgram);
    this.dialogRef.close(this.data);
  }

  onClose() {
    this.dialogRef.close(this.data);
  }

  ngOnDestroy(): void {
    this.seasonListSub.unsubscribe();
    this.leagueListSub.unsubscribe();
    this.groupstageListSub.unsubscribe();
    this.stadiumListSub.unsubscribe();
    this.teamListSub.unsubscribe();
    this.fixtureListSub.unsubscribe();
  }
}
