import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from 'rxjs';

import { MatDialog } from "@angular/material/dialog";

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

import { WeeklyMatchProgramModel } from "../../models/admin-weeklymatchprogram.model";
import { WeeklyMatchProgramService } from "../../services/admin-weeklymatchprogram.service";

import { FixtureSearchModel } from "../../models/admin-fixture-search-index.model";

import { globalFunctions } from "../../../functions/global.function";
import { fixtureFunctions } from "../../functions/fixture.function";
import { fileImportExportFunctions } from "../../functions/file-import-export.function";

import { matchStatusList } from "../../../assets/lists/match-status.list";
import { townList } from "../../../assets/lists/town-izmir.list";


import { MatchModel } from "../../models/admin-match.model";

@Component({
  selector: 'app-admin-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['../../../app.component.css', './score-board.component.css']
})
export class AdminScoreBoard implements OnInit, OnDestroy {
  toolbarTitle = "SKOR TABLOSU";
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


  tableColumnsFixture: string[] = [
                                    "matchNo",
                                    "homeTeam",
                                    "details",
                                    "awayTeam",
                                    "edit"
                                  ];

  constructor(
    private seasonsService: SeasonsService,
    private leaguesService: LeaguesService,
    private groupstagesService: GroupStagesService,
    private stadiumsService: StadiumsService,
    private teamsService: TeamsService,
    private fixtureService: FixtureService,
    private weeklymatchprogramService: WeeklyMatchProgramService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions,
    private fixtureFunctions: fixtureFunctions,
    private fileImportExportFunctions: fileImportExportFunctions
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
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

  onScoreChange(_matchNo: string, _homeTeamScore: number, _awayTeamScore: number) {
    if (_homeTeamScore !== null && _awayTeamScore !== null && _matchNo !== null) {
      let match = <FixtureModel>{};
      match = this.fixtureList.find(f => f.matchNo == _matchNo);
      let matchIndex = this.fixtureList.findIndex(f => f.matchNo == _matchNo);

      match.homeTeamScore = _homeTeamScore;
      match.awayTeamScore = _awayTeamScore;
      match.matchStatus = 'PLAYED';
      if (_homeTeamScore > _awayTeamScore) {
        match.homeTeamPoint = 3;
        match.awayTeamPoint = 0;
      } else if (_awayTeamScore > _homeTeamScore) {
        match.homeTeamPoint = 0;
        match.awayTeamPoint = 3;
      } else if (_homeTeamScore == _awayTeamScore) {
        match.homeTeamPoint = 1;
        match.awayTeamPoint = 1;
      }

      this.fixtureList[matchIndex] = match;
    } else if (_homeTeamScore == null && _awayTeamScore == null && _matchNo !== null) {
      let match = <FixtureModel>{};
      match = this.fixtureList.find(f => f.matchNo == _matchNo);
      let matchIndex = this.fixtureList.findIndex(f => f.matchNo == _matchNo);

      match.homeTeamScore = _homeTeamScore;
      match.awayTeamScore = _awayTeamScore;
      match.matchStatus = 'NOTPLAYED';
      match.homeTeamPoint = null;
      match.awayTeamPoint = null;

      this.fixtureList[matchIndex] = match;
    }

  }

  onPointChange(_matchNo: string, _homeTeamPoint: number, _awayTeamPoint: number) {
    if (_matchNo !== null && _homeTeamPoint !== null && _awayTeamPoint !== null) {
      let match = <FixtureModel>{};
      match = this.fixtureList.find(f => f.matchNo == _matchNo);
      let matchIndex = this.fixtureList.findIndex(f => f.matchNo == _matchNo);

      match.homeTeamPoint = _homeTeamPoint;
      match.awayTeamPoint = _awayTeamPoint;

      this.fixtureList[matchIndex] = match;
    }

  }

  onWinByForfeitChange(_matchNo: string, _winnerByForfeit: string) {
    let match = <FixtureModel>{};
    match = this.fixtureList.find(f => f.matchNo == _matchNo);
    let matchIndex = this.fixtureList.findIndex(f => f.matchNo == _matchNo);

    if (_winnerByForfeit == 'homeTeamWinByForfeit') {
      match.isHomeTeamWinByForfeit = true;
      match.isAwayTeamWinByForfeit = false;
      match.matchStatus = 'BYFORFEIT';
    } else if (_winnerByForfeit == 'awayTeamWinByForfeit') {
      match.isHomeTeamWinByForfeit = false;
      match.isAwayTeamWinByForfeit = true;
      match.matchStatus = 'BYFORFEIT';
    } else {
      match.isHomeTeamWinByForfeit = false;
      match.isAwayTeamWinByForfeit = false;

      if (match.homeTeamScore !== null && match.awayTeamScore !== null) {
        match.matchStatus = 'PLAYED';
      } else {
        match.matchStatus = 'NOTPLAYED';
      }
    }

    if (match.homeTeamScore == null && match.awayTeamScore == null) {
      if (_winnerByForfeit == 'homeTeamWinByForfeit') {
        match.homeTeamScore = 3;
        match.awayTeamScore = 0;
      } else if (_winnerByForfeit == 'awayTeamWinByForfeit') {
        match.homeTeamScore = 0;
        match.awayTeamScore = 3;
      }

      if (match.homeTeamScore > match.awayTeamScore) {
        match.homeTeamPoint = 3;
        match.awayTeamPoint = 0;
      } else if (match.awayTeamScore > match.homeTeamScore) {
        match.homeTeamPoint = 0;
        match.awayTeamPoint = 3;
      } else if ((match.homeTeamScore && match.awayTeamScore) && match.homeTeamScore == match.awayTeamScore) {
        match.homeTeamPoint = 1;
        match.awayTeamPoint = 1;
      }
    }

    this.fixtureList[matchIndex] = match;
  }

  findTeamWinByForfeit(isHomeTeamWinByForfeit: boolean, isAwayTeamWinByForfeit: boolean): string {
    if (!!isHomeTeamWinByForfeit) {
      return 'homeTeamWinByForfeit';
    } else if (!!isAwayTeamWinByForfeit) {
      return 'awayTeamWinByForfeit';
    } else return null;
  }

  onMatchStatusChange(_matchNo: string, _status: string) {
    let match = <FixtureModel>{};
    match = this.fixtureList.find(f => f.matchNo == _matchNo);
    let matchIndex = this.fixtureList.findIndex(f => f.matchNo == _matchNo);

    match.matchStatus = _status;
    this.fixtureList[matchIndex] = match;
  }

  onStadiumChange(_matchNo: string, _stadiumId: number) {
    let match = <FixtureModel>{};
    match = this.fixtureList.find(f => f.matchNo == _matchNo);
    let matchIndex = this.fixtureList.findIndex(f => f.matchNo == _matchNo);

    match.stadiumId = _stadiumId;
    this.fixtureList[matchIndex] = match;
  }

  onMatchDateChange(_matchNo: string, _matchDate: Date) {
    let match = <FixtureModel>{};
    match = this.fixtureList.find(f => f.matchNo == _matchNo);
    let matchIndex = this.fixtureList.findIndex(f => f.matchNo == _matchNo);

    if (_matchDate.toString() === '') {
      match.matchDate = null;
    } else {
      match.matchDate = _matchDate;
    }

    this.fixtureList[matchIndex] = match;
  }

  onMatchExplanationChange(_matchNo: string, _explanation: string) {
    let match = <FixtureModel>{};
    match = this.fixtureList.find(f => f.matchNo == _matchNo);
    let matchIndex = this.fixtureList.findIndex(f => f.matchNo == _matchNo);

    match.explanation = _explanation;
    this.fixtureList[matchIndex] = match;
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
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
      this.globalFunctions.showSnackBar('scoreboard.search.keymissing');
      this.isLoading = false;
    }
  }

  numbersOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  findStadiumName(stadiumId: number): string {
    return !!stadiumId ? this.stadiumList.find(stadium => stadium.id == stadiumId).stadiumName : null;
  }

  findTeamName(teamId: number): string {
    let team: TeamsModel = this.teamList.find(team => team.id == teamId);
    return !!team ? team.officialName : null;;
  }

  findTeamLogo(teamId: number): string {
    let team : TeamsModel = this.teamList.find(team => team.id == teamId);
    return !!team ? team.imagePath : null;;
  }

  getMatchStatus(status: string): string {
    return this.globalFunctions.getMatchStatusValue(status);
  }

  getMatchStatusClass(status: string): string {
    return this.globalFunctions.getMatchStatusClass(status);
  }

  findTown(town: string) {
    return town ? townList.find(t => t.name == town).value : 'Seçiniz';
  }

  getMatchDate(_date: Date): string {
    const longDate = this.globalFunctions.getLocalDate(_date);
    const shortTime = this.globalFunctions.getLocalDateTime(_date);

    return longDate || shortTime ? (longDate + " " + shortTime) : null;
  }

  onClear() {
    this.seasonSelectionId = null;
    this.leagueSelectionId = null;

    this.groupstageSelectionId = null;
    this.matchWeekSelectionValue = null;
    this.matchNoInputValue = null;
    this.stadiumSelectionId = null;
    this.homeTeamSelectionId = null;
    this.awayTeamSelectionId = null;
    this.matchStatusSelectionValue = null;
    this.townSelectionValue = null;
    this.startDatePickedValue = null;
    this.endDatePickedValue = null;
    this.weeklyMatchProgramId = null;
    this.fixtureSearchIndex = null;

    this.fixtureList = [];
  }

  onSave() {
    this.isLoading = true;
    this.matchList = this.fixtureFunctions.convertModelFixtureToMatch(this.fixtureList);
    this.fixtureService.updateFixture(this.matchList, this.fixtureSearchIndex);
  }

  onFilePicked(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files[0];
      let isValidMimeType = this.globalFunctions.checkMimeType(file.type);
      if (isValidMimeType) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          let fileData: string = e.target.result;
          let fileDataParseResult = this.fileImportExportFunctions.parseExcelDataToJSON(fileData);
          if (fileDataParseResult !== null) {
            this.setFileDataToFixtureList(fileDataParseResult);
          } else {
            this.globalFunctions.showSnackBar('file.import.error');
          }

        }
        reader.readAsBinaryString(file);

      } else {
        this.globalFunctions.showSnackBar('file.import.error.mimetype');
      }
    } catch (error) {
      this.globalFunctions.showSnackBar('file.import.error');
    }
  }


  setFileDataToFixtureList(tableData: any) {
    try {
      for (let i = 0; i < tableData.length; i++) {
        const match = tableData[i];

        const matchNo: string = match["Müsabaka No"];
        const matchDate: string = match["Tarih Saat"];
        const stadiumName: string = match["Saha"];
        const homeTeam: string = match["Ev Sahibi Takım"];
        const homeTeamScore: number = match["Ev Sahibi Takım Skor"];
        const homeTeamPoint: number = match["Ev Sahibi Takım Puan"];
        const awayTeam: string = match["Misafir Takım"];
        const awayTeamScore: number = match["Misafir Takım Skor"];
        const awayTeamPoint: number = match["Misafir Takım Puan"];
        const matchStatus: string = match["Müsabaka Durumu"];
        const winnerByForfeit: string = match["Hükmen Galip"];
        const explanation: string = match["Açıklama"];


        const _match = this.fixtureList.find(f => f.matchNo === matchNo);
        const _matchIndex = this.fixtureList.findIndex(f => f.matchNo === matchNo);

        _match.matchDate = this.globalFunctions.getConvertedDateEU(matchDate);
        _match.stadiumId = this.stadiumList.find(s => s.stadiumName === stadiumName).id;
        _match.stadiumName = this.stadiumList.find(s => s.stadiumName === stadiumName).stadiumName;
        _match.stadiumTown = this.stadiumList.find(s => s.stadiumName === stadiumName).town;
        _match.homeTeamScore = homeTeamScore;
        _match.homeTeamPoint = homeTeamPoint;
        _match.awayTeamScore = awayTeamScore;
        _match.awayTeamPoint = awayTeamPoint;
        _match.matchStatus = this.globalFunctions.getMatchStatusName(matchStatus);
        _match.isHomeTeamWinByForfeit = (winnerByForfeit == 'Ev Sahibi Takım') ? true : false;
        _match.isAwayTeamWinByForfeit = (winnerByForfeit == 'Misafir Takım') ? true : false;
        _match.explanation = explanation;

        this.fixtureList[_matchIndex] = _match;

      }
    } catch (error) {
      this.globalFunctions.showSnackBar('file.import.error');
    }
  }

  onImport() {
    this.fileImportExportFunctions.importExcelScoreBoard();
  }

  onExport() {
    this.fileImportExportFunctions.exportExcelScoreBoard(this.fixtureList, this.teamList, this.stadiumList);
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
