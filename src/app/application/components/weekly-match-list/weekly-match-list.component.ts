import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { WeeklyMatchProgramModel } from "../../models/application-weeklymatchprogram.model";
import { WeeklyMatchProgramService } from "../../services/application-weeklymatchprogram.service";

import { WeeklyMatchListModel } from "../../models/application-weeklymatchlist.model";
import { WeeklyMatchListService } from "../../services/application-weeklymatchlist.service";

import { FixtureModel } from "../../models/application-fixture.model";
import { FixtureService } from "../../services/application-fixtures.service";

import { globalFunctions } from "../../../functions/global.function";
import { fixtureFunctions } from "../../functions/fixture.function";

import { matchStatusList } from "../../../assets/lists/match-status.list";
import { townList } from "../../../assets/lists/town-izmir.list";

@Component({
  selector: 'app-application-weeklymatch-list',
  templateUrl: './weekly-match-list.component.html',
  styleUrls: ['../../../app.component.css', './weekly-match-list.component.css']
})
export class ApplicationWeeklyMatchList implements OnInit, OnDestroy {
  toolbarTitle = "HAFTALIK BÜLTEN";
  isLoading: boolean = false;
  weeklyMatchProgramList: WeeklyMatchProgramModel[] = [];
  private weeklyMatchProgramListSubscription: Subscription;
  weeklyMatchList: WeeklyMatchListModel[] = [];
  private weeklyMatchListSubscription: Subscription;
  fixtureList: FixtureModel[] = [];
  private fixtureListSub: Subscription;

  matchStatusList: Array<any> = matchStatusList;
  townList: Array<any> = townList;

  @Input() seasonSelectionId: number;

  filterSeasonList: Array<string> = [];
  @Input() filterSeasonSelectionValue: string = null;
  filterLeagueList: Array<string> = [];
  @Input() filterLeagueSelectionValue: string = null;
  filterGroupstageList: Array<string> = [];
  @Input() filterGroupstageSelectionValue: string = null;
  filterTeamList: Array<string> = [];
  @Input() filterTeamSelectionValue: string = null;
  filterTownList: Array<string> = [];
  @Input() filterTownSelectionValue: string = null;
  filterStadiumList: Array<string> = [];
  @Input() filterStadiumSelectionValue: string = null;
  filterDateList: Array<string> = [];
  @Input() filterDateSelectionValue: string = null;

  filteredFixtureList: FixtureModel[] = [];

  tableColumns: string[] = [
    "homeTeam",
    "details",
    "awayTeam",
  ];

  constructor(
    private weeklymatchprogramService: WeeklyMatchProgramService,
    private weeklymatchlistService: WeeklyMatchListService,
    private fixtureService: FixtureService,
    private globalFunctions: globalFunctions,
    private fixtureFunctions: fixtureFunctions
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);

    this.weeklymatchprogramService.getWeeklyMatchProgram();
    this.weeklyMatchProgramListSubscription = this.weeklymatchprogramService.getDocumentsListUpdateListener()
      .subscribe({
        next: (data: WeeklyMatchProgramModel[]) => {
          if (data.length > 0) {
            this.weeklyMatchProgramList = data;
            let _weeklyMatchProgramIds: Array<number> = [];
            this.weeklyMatchProgramList.forEach(wmpl => {
              _weeklyMatchProgramIds.push(wmpl.id);
            });

            this.weeklymatchlistService.getWeeklyMatchList();
            this.onSearchFixture(_weeklyMatchProgramIds);
          } else {
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
          if (data.length > 0) {
            this.weeklyMatchList = data;
          } else {
            this.weeklyMatchList = [];
          }
        }
      });

    this.fixtureListSub = this.fixtureService.getFixtureUpdateListener()
      .subscribe({
        next: (data: FixtureModel[]) => {
          this.fixtureList = data.length > 0 ? data.sort((a, b) => new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime()) : [];

          this.filterSeasonList = this.getDistinctSeasonName(this.fixtureList);
          this.filterLeagueList = this.getDistinctLeagueName(this.fixtureList);
          this.filterGroupstageList = this.getDistinctGroupstageName(this.fixtureList);
          this.filterTeamList = this.getDistinctTeamName(this.fixtureList);
          this.filterTownList = this.getDistinctTownName(this.fixtureList);
          this.filterStadiumList = this.getDistinctStadiumName(this.fixtureList);
          this.filterDateList = this.getDistinctMatchDate(this.fixtureList);

          this.onSearch();
          this.isLoading = false;
        }
      });
  }

  onSearchFixture(weeklyMatchProgramIds: Array<number>) {
    let fixtureSearchModel = this.fixtureFunctions.setFixtureSearchModel(
      this.seasonSelectionId,
      null, null, null, null, null, null, null, null, null, null, null,
      weeklyMatchProgramIds
    );

    this.fixtureService.getFixtureBySearchIndex(fixtureSearchModel);
  }

  getMatchDate(_date: Date): string {
    return this.globalFunctions.getLocalDateTime(_date);
  }

  getMatchStatus(status: string): string {
    return this.globalFunctions.getMatchStatusValue(status);
  }

  getMatchStatusClass(status: string): string {
    return this.globalFunctions.getMatchStatusClass(status);
  }

  getTownName(town: string): string {
    return this.globalFunctions.getTownValue(town);
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  getDistinctSeasonName(fixtureList: FixtureModel[]): Array<string> {
    const distinctSeasonName = [...new Set(fixtureList.map(f => f.seasonName))].filter(f => f !== null);
    return distinctSeasonName;
  }

  getDistinctLeagueName(fixtureList: FixtureModel[]): Array<string> {
    const distinctLeagueName = [...new Set(fixtureList.map(f => f.leagueName))].filter(f => f !== null);
    return distinctLeagueName;
  }

  getDistinctGroupstageName(fixtureList: FixtureModel[]): Array<string> {
    const distinctGroupstageName = [...new Set(fixtureList.map(f => f.groupstageName))].filter(f => f !== null).sort((a, b) => a.localeCompare(b));
    return distinctGroupstageName;
  }

  getDistinctTeamName(fixtureList: FixtureModel[]): Array<string> {
    const mergedTeamName = [...new Set(fixtureList.map(f => f.homeTeamOfficialName)), ...new Set(fixtureList.map(f => f.awayTeamOfficialName))];
    const distinctTeamName = [...new Set(mergedTeamName.map(t => t))].filter(t => t !== null).sort((a, b) => a.localeCompare(b));
    return distinctTeamName;
  }

  getDistinctTownName(fixtureList: FixtureModel[]): Array<string> {
    const distinctTownName = [...new Set(fixtureList.map(f => f.stadiumTown))].filter(f => f !== null).sort((a, b) => a.localeCompare(b));
    return distinctTownName;
  }

  getDistinctStadiumName(fixtureList: FixtureModel[]): Array<string> {
    const distinctStadiumName = [...new Set(fixtureList.map(f => f.stadiumName))].filter(f => f !== null).sort((a, b) => a.localeCompare(b));
    return distinctStadiumName;
  }

  getDistinctMatchDate(fixtureList: FixtureModel[]): Array<string> {
    const distinctMatchDate = [...new Set(fixtureList.map(f => this.globalFunctions.getLocalDate(f.matchDate)))].filter(f => f !== null);
    return distinctMatchDate;
  }

  onSearch() {
    let _filteredFixtureList: FixtureModel[] = [];

    _filteredFixtureList = this.fixtureList.filter(f =>
      f.leagueName == (this.filterLeagueSelectionValue || f.leagueName) &&
      f.groupstageName == (this.filterGroupstageSelectionValue || f.groupstageName) &&
      (f.homeTeamOfficialName == (this.filterTeamSelectionValue || f.homeTeamOfficialName) ||
        f.awayTeamOfficialName == (this.filterTeamSelectionValue || f.awayTeamOfficialName)) &&
      f.stadiumTown == (this.filterTownSelectionValue || f.stadiumTown) &&
      f.stadiumName == (this.filterStadiumSelectionValue || f.stadiumName) &&
      this.globalFunctions.getLocalDate(f.matchDate) == (this.filterDateSelectionValue || this.globalFunctions.getLocalDate(f.matchDate))
    );

    this.filteredFixtureList = _filteredFixtureList;
  }

  onExport() {
    const _searchOptionsBar = document.getElementById("searchOptionsBar-WeeklyMatchList");
    const _header = document.getElementById("header-application");
    const _footer = document.getElementById("footer");
    const _exportButton = document.getElementById("btn-export-weeklymatchlist-application");
    _searchOptionsBar.hidden = true;
    _header.hidden = true;
    _footer.hidden = true;
    _exportButton.hidden = true;
    window.print();
    _searchOptionsBar.hidden = false;
    _header.hidden = false;
    _footer.hidden = false;
    _exportButton.hidden = false;
  }

  ngOnDestroy(): void {
    this.weeklyMatchProgramListSubscription.unsubscribe();
    this.weeklyMatchListSubscription.unsubscribe();
    this.fixtureListSub.unsubscribe()
  }
}
