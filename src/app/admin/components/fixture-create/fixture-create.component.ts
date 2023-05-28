import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from "@angular/material/dialog";

import { GroupStagesModel } from "../../models/admin-groupstages.model";
import { LeaguesModel } from "../../models/admin-leagues.model";
import { SeasonsModel } from "../../models/admin-seasons.model";
import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";
import { FixtureModel } from "../../models/admin-fixture.model";
import { StadiumsModel } from "../../models/admin-stadiums.model";

import { GroupStagesService } from "../../services/admin-groupstages.service";
import { LeaguesService } from "../../services/admin-leagues.service";
import { SeasonsService } from "../../services/admin-seasons.service";
import { TeamsInGroupstagesService } from "../../services/admin-teams-in-groupstages.service";
import { FixtureService } from "../../services/admin-fixtures.service";
import { StadiumsService } from "../../services/admin-stadiums.service";

import { AdminFixtureEditModal } from "../fixture-edit/fixture-edit.component";

import { fixtureFunctions } from "../../functions/fixture.function";
import { globalFunctions } from "../../../functions/global.function";

import { fixtureKey3, fixtureKey4, fixtureKey5, fixtureKey6, fixtureKey7, fixtureKey8, fixtureKey9, fixtureKey10, fixtureKey11, fixtureKey12, fixtureKey13, fixtureKey14, fixtureKey15 } from "../../assets/lists/fixture-keys-list";
import { matchStatusList } from "../../../assets/lists/match-status-list";

import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon-list";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-admin-fixture-create',
  templateUrl: './fixture-create.component.html',
  styleUrls: ['../../../app.component.css', './fixture-create.component.css']
})
export class AdminFixtureCreate implements OnInit, OnDestroy {
  headerTitle = "FİKSTÜR OLUŞTUR";
  isLoading = false;

  seasonList: SeasonsModel[] = [];
  private seasonListSub: Subscription;
  leagueList: LeaguesModel[] = [];
  private leagueListSub: Subscription;
  groupstageList: GroupStagesModel[] = [];
  private groupstageListSub: Subscription;
  teamsingroupstagesList: TeamsInGroupstagesModel[] = [];
  private teamsingroupstagesListSub: Subscription;
  fixtureList: FixtureModel[] = [];
  private fixtureListSub: Subscription;
  stadiumList: StadiumsModel[] = [];
  private stadiumListSub: Subscription;

  matchStatusList = matchStatusList;
  fontAwesomeIconList = fontAwesomeIconList;

  @Input() seasonSelectionId: number;
  @Input() leagueSelectionId: number;
  @Input() groupstageSelectionId: number;

  tableColumnsGroup: string[] = [
                                      "orderNo",
                                      "status",
                                      "teamName",
                                      "stadiumName"
                                    ];
  tableColumnsFixture: string[] = [
                                        "matchNo",
                                        "homeTeam",
                                        "details",
                                        "awayTeam",
                                        "actions"
                                      ];
  groupByFixture: any[] = [];
  constructor(public seasonsService: SeasonsService,
              public leaguesService: LeaguesService,
              public groupstagesService: GroupStagesService,
              public teamsingroupstagesService: TeamsInGroupstagesService,
              public fixturesService: FixtureService,
              public stadiumsService: StadiumsService,
              public dialog: MatDialog,
              private _datePipe: DatePipe,
              private globalFunctions: globalFunctions
            ) {}

  ngOnInit(): void {

    this.isLoading = true;
    this.stadiumsService.getStadiums();
    this.stadiumListSub = this.stadiumsService.getStadiumListUpdateListener()
      .subscribe((data: StadiumsModel[]) => {
        this.stadiumList = data.sort((a, b) => a.stadiumName.localeCompare(b.stadiumName));
      });


    this.seasonsService.getSeasons();
    this.seasonListSub = this.seasonsService.getSeasonsListSubListener()
      .subscribe((data: SeasonsModel[]) => {
        this.seasonList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
        this.seasonSelectionId = this.seasonList[0]["id"];
        this.leaguesService.getLeagues(this.seasonSelectionId);
      });


    this.leagueListSub = this.leaguesService.getLeagueListUpdateListener()
      .subscribe((data: LeaguesModel[]) => {
        this.leagueList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.leagueSelectionId = this.leagueList[0]["id"];
        this.groupstagesService.getGroupstages(this.leagueSelectionId);

      });


    this.groupstageListSub = this.groupstagesService.getGroupStageListUpdateListener()
      .subscribe((data: GroupStagesModel[]) => {
        this.groupstageList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.groupstageSelectionId = this.groupstageList[0]["id"];
        this.teamsingroupstagesService.getTeamsInGroupstages(this.groupstageSelectionId);
        this.fixturesService.getFixture(this.groupstageSelectionId);
      });


    this.teamsingroupstagesListSub = this.teamsingroupstagesService.getTeamsInGroupstagesUpdateListener()
      .subscribe((data: TeamsInGroupstagesModel[]) => {
        this.teamsingroupstagesList = data.sort((a, b) => a.orderNo - b.orderNo);
      });


    this.fixtureListSub = this.fixturesService.getFixtureUpdateListener()
      .subscribe((data: FixtureModel[]) => {
        this.fixtureList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.groupByFixture = this.groupByToFixture(this.fixtureList);
      });

    this.isLoading = false;
  }


  onSeasonChange(seasonSelectionId: number) {
    this.isLoading = true;
    this.leaguesService.getLeagues(seasonSelectionId);
    this.isLoading = false;
  }

  onLeagueChange(leagueSelectionId: number) {
    this.isLoading = true;
    this.groupstagesService.getGroupstages(leagueSelectionId);
    this.isLoading = false;
  }

  onGroupstageChange(groupstageSelectionId: number) {
    this.isLoading = true;
    this.teamsingroupstagesService.getTeamsInGroupstages(groupstageSelectionId);
    this.fixturesService.getFixture(groupstageSelectionId);
    this.isLoading = false;
  }

  buildFixtureList() {
    try {
      this.isLoading = true;
      const teamsList: TeamsInGroupstagesModel[] = this.teamsingroupstagesList;
      const fixtureKeyCount: number = teamsList.length;
      const periodSystem = this.groupstageList.find(g => g.id == this.groupstageSelectionId).periodSystem;
      var fixtureKey = [];
      var _fixtureList: FixtureModel[] = [];

      switch (fixtureKeyCount) {
        case 3:
          fixtureKey = fixtureKey3;
          break;
        case 4:
          fixtureKey = fixtureKey4;
          break;
        case 5:
          fixtureKey = fixtureKey5;
          break;
        case 6:
          fixtureKey = fixtureKey6;
          break;
        case 7:
          fixtureKey = fixtureKey7;
          break;
        case 8:
          fixtureKey = fixtureKey8;
          break;
        case 9:
          fixtureKey = fixtureKey9;
          break;
        case 10:
          fixtureKey = fixtureKey10;
          break;
        case 11:
          fixtureKey = fixtureKey11;
          break;
        case 12:
          fixtureKey = fixtureKey12;
          break;
        case 13:
          fixtureKey = fixtureKey13;
          break;
        case 14:
          fixtureKey = fixtureKey14;
          break;
        case 15:
          fixtureKey = fixtureKey15;
            break;
        default:
          throw new Error;
      }

      for (let ps = 1; ps <= periodSystem; ps++) {
        for (let fk = 0; fk < fixtureKey.length; fk++) {
          let element = fixtureKey[fk];
          let week = element.week + (fixtureKey.length * (ps - 1));
          let key = element.key;

          for (let k = 0; k < key.length; k++) {
            let matchFrame = key[k];
            let orderNo = matchFrame.orderNo;
            let homeTeamOrderNo = matchFrame.homeTeam;
            let awayTeamOrderNo = matchFrame.awayTeam;

            let homeTeam = teamsList.find(team => team.orderNo == ((ps%2 == 1) ? homeTeamOrderNo : awayTeamOrderNo));
            let awayTeam = teamsList.find(team => team.orderNo == ((ps%2 == 1) ? awayTeamOrderNo : homeTeamOrderNo));

            var matchDraft = <FixtureModel>{};
            matchDraft = this.createDraft(homeTeam, awayTeam, week, orderNo);
            _fixtureList.push(matchDraft);
          }
        }
      }
      this.fixturesService.createFixture(_fixtureList, this.groupstageSelectionId);
    } catch (error) {
      this.globalFunctions.showSnackBar.next('Hata!');
      _fixtureList = [];
      this.groupByFixture = this.groupByToFixture(this.fixtureList);
    }
    this.isLoading = false;
  }

  createDraft(_homeTeam: TeamsInGroupstagesModel, _awayTeam: TeamsInGroupstagesModel, _weekNumber: number, _orderNo: number): FixtureModel {
    try {
      const seasonId = this.seasonSelectionId;
      const leagueId = this.leagueSelectionId;
      const groupstageId = this.groupstageSelectionId;
      const teamsingroupstagesList = this.teamsingroupstagesList;

      var matchDraft = <FixtureModel>{};
      matchDraft.id = null;
      matchDraft.groupstageId = groupstageId;
      matchDraft.matchNo = fixtureFunctions.setMatchNo(seasonId, leagueId, groupstageId, _weekNumber, _orderNo);
      matchDraft.matchWeek = _weekNumber;
      matchDraft.orderNo = _orderNo;
      matchDraft.matchStatus = 'NOTPLAYED';
      matchDraft.stadiumId = _homeTeam ? _homeTeam.teamStadiumId : null;
      matchDraft.homeTeamId = _homeTeam ? _homeTeam.teamId : null;
      matchDraft.homeTeamScore = null;
      matchDraft.homeTeamPoint = null;
      matchDraft.isHomeTeamWinByForfeit = false;
      matchDraft.awayTeamId = _awayTeam ? _awayTeam.teamId : null;
      matchDraft.awayTeamScore = null;
      matchDraft.awayTeamPoint = null;
      matchDraft.isAwayTeamWinByForfeit = false;

      return matchDraft;

    } catch (error) {
      this.globalFunctions.showSnackBar.next('Hata!');
      return null
    }
  }


  groupByToFixture(fixtureList: FixtureModel[]): any {
    this.groupByFixture = [];
    const groupBy = prop => data => {
      return data.reduce((dict, item) => {
        const { [prop]: _, ...rest } = item;
        dict[item[prop]] = [...(dict[item[prop]] || []), rest];
        return dict;
      }, {});
    };

    const groupByToFixture = Object.entries(groupBy('matchWeek')(fixtureList))
      .map(([key, value]) => ({ week: key, matchList: value }));

    return groupByToFixture;
  }


  clearFixtureList() {
    this.isLoading = true;
    this.fixturesService.clearFixture(this.groupstageSelectionId);
    this.isLoading = false;
  }

  onCreateMatch() {
    let matchDay = <FixtureModel>{};
    matchDay.matchNo = null;
    matchDay.groupstageId = this.groupstageSelectionId;

    const dialogRef = this.dialog.open(AdminFixtureEditModal, {
      data: {
        pageMode: 'create',
        fixtureInfo: matchDay,
        stadiumList: this.stadiumList,
        teamsingroupstagesList: this.teamsingroupstagesList,
        seasonSelectionId: this.seasonSelectionId,
        leagueSelectionId: this.leagueSelectionId,
        groupstageSelectionId: this.groupstageSelectionId
      }
    });
  }

  onEdit(matchDay: FixtureModel, matchWeek: number) {
    matchDay.matchWeek = matchWeek;

    const dialogRef = this.dialog.open(AdminFixtureEditModal, {
      data: {
        pageMode: 'edit',
        fixtureInfo: matchDay,
        stadiumList: this.stadiumList,
        teamsingroupstagesList: this.teamsingroupstagesList,
        seasonSelectionId: this.seasonSelectionId,
        leagueSelectionId: this.leagueSelectionId,
        groupstageSelectionId: this.groupstageSelectionId
      }
    });
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.fixturesService.deleteMatch(id);
    this.isLoading = false;
  }

  onImport() {

  }

  onExport() {

  }

  swapMatch(matchNo: string) {
    const match = this.fixtureList.find(m => m.matchNo == matchNo);
    const indexNo = this.fixtureList.findIndex(m => m.matchNo == matchNo);
    let matchTemp = <FixtureModel>{};

    matchTemp.id = match.id ? match.id : null;
    matchTemp.groupstageId = match.groupstageId;
    matchTemp.matchNo = match.matchNo;
    matchTemp.matchWeek = match.matchWeek;
    matchTemp.matchDate = match.matchDate;
    matchTemp.matchStatus = match.matchStatus;

    let teamElement = this.teamsingroupstagesList.find(team => team.teamId == match.awayTeamId);
    matchTemp.stadiumId = !!teamElement ? teamElement.teamStadiumId : null;
    matchTemp.homeTeamId = match.awayTeamId;
    matchTemp.homeTeamScore = match.awayTeamScore;
    matchTemp.isHomeTeamWinByForfeit = match.isAwayTeamWinByForfeit;
    matchTemp.homeTeamPoint = match.awayTeamPoint;

    matchTemp.awayTeamId = match.homeTeamId;
    matchTemp.awayTeamScore = match.homeTeamScore;
    matchTemp.isAwayTeamWinByForfeit = match.isHomeTeamWinByForfeit;
    matchTemp.awayTeamPoint = match.homeTeamPoint;

    matchTemp.orderNo = match.orderNo;

    var _fixtureList: FixtureModel[] = [];
    _fixtureList.push(matchTemp);
    this.fixturesService.updateFixture(_fixtureList);
  }

  numbersOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  findSeasonName(seasonId: number) {
    return this.seasonList.find(s => s.id == seasonId).seasonName;
  }

  findLeagueName(leagueId: number) {
    return this.leagueList.find(l => l.id == leagueId).leagueName;
  }

  findGroupstageName(groupstageId: number) {
    return this.groupstageList.find(gs => gs.id == groupstageId).groupName;
  }

  findStadium(stadiumId: number): string {
    return !!stadiumId ? this.stadiumList.find(stadium => stadium.id == stadiumId).stadiumName : null;
  }

  findTeamName(teamId: number): string {
    let team : TeamsInGroupstagesModel = this.teamsingroupstagesList.find(team => team.teamId == teamId);
    return !!team ? team.teamOfficialName : null;;
  }

  findMatchStatus(status: string): string {
    return this.matchStatusList.find(s => s.name == status).value;
  }

  findMatchStatusClass(status: string): string {
    return this.matchStatusList.find(s => s.name == status).class;
  }

  findExpelledOrReceded(teamId: number): boolean {
    let team: TeamsInGroupstagesModel = this.teamsingroupstagesList.find(team => team.teamId == teamId);
    return !!team ? (team.isExpelled || team.isReceded) : false;
  }

  findExpelledOrRecededExplanation(teamId: number): string {
    let team: TeamsInGroupstagesModel = this.teamsingroupstagesList.find(team => team.teamId == teamId);
    return !!team ? team.explanation : null;
  }


  ngOnDestroy(): void {
    this.seasonListSub.unsubscribe();
    this.leagueListSub.unsubscribe();
    this.groupstageListSub.unsubscribe();
    this.teamsingroupstagesListSub.unsubscribe();
    this.fixtureListSub.unsubscribe();
    this.stadiumListSub.unsubscribe();
  }
}
