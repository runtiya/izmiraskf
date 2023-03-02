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

import { GroupStagesService } from "../../services/admin/admin-groupstages.service";
import { LeaguesService } from "../../services/admin/admin-leagues.service";
import { SeasonsService } from "../../services/admin/admin-seasons.service";
import { TeamsInGroupstagesService } from "../../services/admin/admin-teams-in-groupstages.service";
import { FixtureService } from "../../services/admin/admin-fixtures.service";
import { StadiumsService } from "../../services/admin/admin-stadiums.service";

import { FixtureEditModal } from "../fixture-edit/fixture-edit.component";

import { fixtureKey3, fixtureKey4, fixtureKey5, fixtureKey6, fixtureKey7, fixtureKey8, fixtureKey9, fixtureKey10, fixtureKey11, fixtureKey12, fixtureKey13, fixtureKey14, fixtureKey15 } from "../../assets/lists/fixture-keys-list";
import { matchStatusList } from "../../assets/lists/match-status-list";
import { faCircleH } from "@fortawesome/free-solid-svg-icons";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-admin-fixture-create',
  templateUrl: './fixture-create.component.html',
  styleUrls: ['../../../app.component.css', './fixture-create.component.css']
})
export class FixtureCreate implements OnInit, OnDestroy {
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
  faCircleH = faCircleH;

  @Input() seasonSelectionId: number;
  @Input() leagueSelectionId: number;
  @Input() groupstageSelectionId: number;

  displayedColumnsGroup: string[] = ["orderNo", "status", "teamName", "stadiumName"];
  displayedColumnsFixture: string[] = ["matchNo", "homeTeam", "details", "awayTeam", "actions"];
  groupByFixture: any[] = [];
  constructor(public seasonsService: SeasonsService,
              public leaguesService: LeaguesService,
              public groupstagesService: GroupStagesService,
              public teamsingroupstagesService: TeamsInGroupstagesService,
              public fixturesService: FixtureService,
              public stadiumsService: StadiumsService,
              public dialog: MatDialog,
              private _datePipe: DatePipe
            ) {}

  ngOnInit(): void {

    this.isLoading = true;
    this.stadiumsService.getStadiums();
    this.stadiumListSub = this.stadiumsService.getStadiumListUpdateListener()
      .subscribe((data: StadiumsModel[]) => {
        this.stadiumList = data.sort((a, b) => a.stadiumName.localeCompare(b.stadiumName));
        this.isLoading = false;
      });

    this.isLoading = true;
    this.seasonsService.getSeasons();
    this.seasonListSub = this.seasonsService.getSeasonsListSubListener()
      .subscribe((data: SeasonsModel[]) => {
        this.seasonList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
        this.seasonSelectionId = this.seasonList[0]["id"];
        this.leaguesService.getLeagues(this.seasonSelectionId);
        this.isLoading = false;
      });

    this.isLoading = true;
    this.leagueListSub = this.leaguesService.getLeagueListUpdateListener()
      .subscribe((data: LeaguesModel[]) => {
        this.leagueList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.leagueSelectionId = this.leagueList[0]["id"];
        this.groupstagesService.getGroupstages(this.leagueSelectionId);
        this.isLoading = false;
      });

    this.isLoading = true;
    this.groupstageListSub = this.groupstagesService.getGroupStageListUpdateListener()
      .subscribe((data: GroupStagesModel[]) => {
        this.groupstageList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.groupstageSelectionId = this.groupstageList[0]["id"];
        this.teamsingroupstagesService.getTeamsInGroupstages(this.groupstageSelectionId);
        this.fixturesService.getFixture(this.groupstageSelectionId);
        this.isLoading = false;
      });

    this.isLoading = true;
    this.teamsingroupstagesListSub = this.teamsingroupstagesService.getTeamsInGroupstagesUpdateListener()
      .subscribe((data: TeamsInGroupstagesModel[]) => {
        this.teamsingroupstagesList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.isLoading = false;
      });

    this.isLoading = true;
    this.fixtureListSub = this.fixturesService.getFixtureUpdateListener()
      .subscribe((data: FixtureModel[]) => {
        this.fixtureList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.groupByFixture = this.groupByToFixture(this.fixtureList);
        this.isLoading = false;
      });
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

  createFixture(teams: TeamsInGroupstagesModel[]) {
    this.isLoading = true;

    try {
      const teamsCount = teams.length;
      const periodSystem = this.groupstageList.find(group => group.id == this.groupstageSelectionId).periodSystem;
      const teamList = teams;
      var weeks = [];

      var fixtureListDemo: FixtureModel[] = [];


      switch (teamsCount) {
        case 3:
          weeks = fixtureKey3;
          break;
        case 4:
          weeks = fixtureKey4;
          break;
        case 5:
          weeks = fixtureKey5;
          break;
        case 6:
          weeks = fixtureKey6;
          break;
        case 7:
          weeks = fixtureKey7;
          break;
        case 8:
          weeks = fixtureKey8;
          break;

        case 9:
          weeks = fixtureKey9;
          break;
        case 10:
          weeks = fixtureKey10;
          break;
        case 11:
          weeks = fixtureKey11;
          break;
        case 12:
          weeks = fixtureKey12;
          break;
        case 13:
          weeks = fixtureKey13;
          break;
        case 14:
          weeks = fixtureKey14;
          break;
        case 15:
            weeks = fixtureKey15;
            break;
        default:
          break;
      }

      this.clearFixtureList();

      for(let p = 1; p <= periodSystem; p++) {
        for(let i = 0; i<weeks.length; i++) {
            let element = weeks[i];
            let week = element.week + (weeks.length * (p-1));
            let key = element.key;
            for(let k = 0; k<key.length; k++) {
                let match = key[k];
                let orderNo = match.orderNo;
                let homeTeamOrderNo = match.homeTeam;
                let awayTeamOrderNo = match.awayTeam;

                let homeTeam = teamList.find(team => team.orderNo == ((p%2 == 1) ? homeTeamOrderNo : awayTeamOrderNo));
                let awayTeam = teamList.find(team => team.orderNo == ((p%2 == 1) ? awayTeamOrderNo : homeTeamOrderNo));

                var fixture = <FixtureModel>{};
                fixture = this.buildMatch(homeTeam, awayTeam, week, orderNo);
                fixtureListDemo.push(fixture);
            }
        }
      }

      this.fixturesService.buildFixtureAsObservable(fixtureListDemo);
      /*
      fixtureListDemo.sort((a, b) => a.orderNo - b.orderNo)
      this.groupByFixture = this.groupByToFixture(fixtureListDemo);
      this.fixtureList = fixtureListDemo;
      */

    } catch (error) {
      fixtureListDemo = [];
      this.groupByFixture = this.groupByToFixture(this.fixtureList);
      // Show error message here
      console.log(error);
    }

    this.isLoading = false;

  }

  buildMatch(homeTeam: TeamsInGroupstagesModel, awayTeam: TeamsInGroupstagesModel, week: number, orderNo: number): FixtureModel {
    try {
      const seasonId = this.seasonSelectionId;
      const leagueId = this.leagueSelectionId;
      const groupstageId = this.groupstageSelectionId;
      const teamsingroupstagesList = this.teamsingroupstagesList;

      let fixture = <FixtureModel>{};

      fixture.id = null;
      fixture.groupstageId = groupstageId;
      fixture.matchNo = ('35' + seasonId.toString().padStart(2, "0") + leagueId.toString().padStart(2, "0") + groupstageId.toString().padStart(2, "0") + '-' + week.toString().padStart(2, "0") + orderNo.toString().padStart(2, "0"));
      fixture.matchWeek = week;
      fixture.matchStatus = 'NOTPLAYED';

      fixture.stadiumId = homeTeam ? homeTeam.teamStadiumId : null;

      fixture.homeTeamId = homeTeam ? homeTeam.teamId : null;
      fixture.homeTeamScore = null;
      fixture.isHomeTeamWinByForfeit = false;
      fixture.homeTeamPoint = null;

      fixture.awayTeamId = awayTeam ? awayTeam.teamId : null;
      fixture.awayTeamScore = null;
      fixture.isAwayTeamWinByForfeit = false;
      fixture.awayTeamPoint = null;

      fixture.orderNo = orderNo;

      return fixture;

    } catch (error) {
      return null;
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
    this.fixtureList = [];
    this.groupByFixture = [];
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

    this.fixtureList[indexNo] = matchTemp;
    this.groupByFixture = this.groupByToFixture(this.fixtureList);

  }

  onScoreChange(matchNo: string, homeTeamScore: number, awayTeamScore: number) {
    console.log(matchNo)
    console.log(!!!homeTeamScore)
    console.log(awayTeamScore)


    if (!!homeTeamScore && !!awayTeamScore && !!matchNo) {
      let match = this.fixtureList.find(f => f.matchNo == matchNo);
      let matchIndex = this.fixtureList.findIndex(f => f.matchNo == matchNo);
      
      match.homeTeamScore = homeTeamScore;
      match.awayTeamScore = awayTeamScore;
      match.matchStatus = 'PLAYED';
      if (homeTeamScore > awayTeamScore) {
        match.homeTeamPoint = 3;
        match.awayTeamPoint = 0;
      } else if (awayTeamScore > homeTeamScore) {
        match.homeTeamPoint = 0;
        match.awayTeamPoint = 3;
      } else if (homeTeamScore == awayTeamScore) {
        match.homeTeamPoint = 1;
        match.awayTeamPoint = 1;
      }

      this.fixtureList[matchIndex] = match;
      this.groupByFixture = this.groupByToFixture(this.fixtureList);
    } else if (!!!homeTeamScore && !!!awayTeamScore && !!matchNo) {
      let match = this.fixtureList.find(f => f.matchNo == matchNo);
      let matchIndex = this.fixtureList.findIndex(f => f.matchNo == matchNo);
      
      match.homeTeamScore = homeTeamScore;
      match.awayTeamScore = awayTeamScore;
      match.matchStatus = 'NOTPLAYED';
      match.homeTeamPoint = null;
      match.awayTeamPoint = null;

      this.fixtureList[matchIndex] = match;
      this.groupByFixture = this.groupByToFixture(this.fixtureList);
    }
  }

  numbersOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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

  onCreateMatch() {
    const seasonId = this.seasonSelectionId;
    const leagueId = this.leagueSelectionId;
    const groupstageId = this.groupstageSelectionId;

    let matchDay = <FixtureModel>{};
    matchDay.matchNo = null;
    matchDay.groupstageId = groupstageId;
    
    const dialogRef = this.dialog.open(FixtureEditModal, {
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

    const dialogRef = this.dialog.open(FixtureEditModal, {
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

  onDelete(matchNo: string) {
    this.isLoading = true;
    this.fixturesService.deleteMatch(matchNo);
    this.isLoading = false;
  }

  onSaveFixture() {
    this.isLoading = true;
    this.fixturesService.createFixture(this.fixtureList, this.groupstageSelectionId);
    this.isLoading = false;
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
