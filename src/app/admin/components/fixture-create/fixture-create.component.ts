import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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


import { fixtureKey3, fixtureKey4, fixtureKey5, fixtureKey6, fixtureKey7, fixtureKey8 } from "../../assets/lists/fixture-keys-list";


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


  @Input() seasonSelectionId: number;
  @Input() leagueSelectionId: number;
  @Input() groupstageSelectionId: number;

  displayedColumns: string[] = ["orderNo", "teamName"];
  displayedColumnsFixture: string[] = ["matchNo", "homeTeam", "details", "awayTeam", "edit"];
  groupByFixture: any[] = [];

  constructor(public seasonsService: SeasonsService,
              public leaguesService: LeaguesService,
              public groupstagesService: GroupStagesService,
              public teamsingroupstagesService: TeamsInGroupstagesService,
              public fixturesService: FixtureService,
              public stadiumsService: StadiumsService,
              private _snackBar: MatSnackBar
            ) {}

  ngOnInit(): void {
    this.seasonsService.getSeasons();
    this.seasonListSub = this.seasonsService.getSeasonsListSubListener()
      .subscribe((data: SeasonsModel[]) => {
        this.isLoading = true;
        this.seasonList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
        this.seasonSelectionId = this.seasonList[0]["id"];
        this.leaguesService.getLeagues(this.seasonSelectionId);
        this.isLoading = false;
      });

    this.leagueListSub = this.leaguesService.getLeagueListUpdateListener()
      .subscribe((data: LeaguesModel[]) => {
        this.isLoading = true;
        this.leagueList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.leagueSelectionId = this.leagueList[0]["id"];
        this.groupstagesService.getGroups(this.leagueSelectionId);
        this.isLoading = false;
      });

    this.groupstageListSub = this.groupstagesService.getGroupStageListUpdateListener()
      .subscribe((data: GroupStagesModel[]) => {
        this.isLoading = true;
        this.groupstageList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.groupstageSelectionId = this.groupstageList[0]["id"];
        this.teamsingroupstagesService.getTeamsInGroupstages(this.groupstageSelectionId);
        this.fixturesService.getFixture(this.groupstageSelectionId);
        this.isLoading = false;
      });


    this.teamsingroupstagesListSub = this.teamsingroupstagesService.getTeamsInGroupstagesUpdateListener()
      .subscribe((data: TeamsInGroupstagesModel[]) => {
        this.isLoading = true;
        this.teamsingroupstagesList = data.sort((a, b) => a.orderNo - b.orderNo);

        this.isLoading = false;
      });

    this.fixtureListSub = this.fixturesService.getFixtureUpdateListener()
      .subscribe((data: FixtureModel[]) => {
        this.isLoading = true;
        this.fixtureList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.groupByFixture = this.groupByToFixture(this.fixtureList);
        this.isLoading = false;
      })

    this.stadiumsService.getStadiums();
    this.stadiumListSub = this.stadiumsService.getStadiumListUpdateListener()
      .subscribe((data: StadiumsModel[]) => {
        this.isLoading = true;
        this.stadiumList = data.sort((a, b) => a.stadiumName.localeCompare(b.stadiumName));
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
    this.groupstagesService.getGroups(leagueSelectionId);
    this.isLoading = false;
  }

  onGroupstageChange(groupstageSelectionId: number) {
    this.isLoading = true;
    this.teamsingroupstagesService.getTeamsInGroupstages(groupstageSelectionId);
    this.fixturesService.getFixture(groupstageSelectionId);
    this.isLoading = false;
  }

  createFixture(teams: TeamsInGroupstagesModel[]) {
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
                fixture = this.createMatch(homeTeam, awayTeam, week, orderNo);
                fixtureListDemo.push(fixture);
            }
        }
      }

      fixtureListDemo.sort((a, b) => a.orderNo - b.orderNo)
      this.groupByFixture = this.groupByToFixture(fixtureListDemo);
      this.fixtureList = fixtureListDemo;

    } catch (error) {
      fixtureListDemo = [];
      this.groupByFixture = this.groupByToFixture(this.fixtureList);
      // Show error message here
      console.log(error);
    }

  }

  createMatch(homeTeam: TeamsInGroupstagesModel, awayTeam: TeamsInGroupstagesModel, week: number, orderNo: number): FixtureModel {
    try {
      const seasonSelectionId = this.seasonSelectionId;
      const leagueSelectionId = this.leagueSelectionId;
      const groupstageId = this.groupstageSelectionId;
      const teamsingroupstagesList = this.teamsingroupstagesList;

      let fixture = <FixtureModel>{};

      fixture.id = null;
      fixture.groupstageId = groupstageId;
      fixture.matchNo = ('35' + seasonSelectionId + leagueSelectionId + groupstageId + week + orderNo);
      fixture.matchWeek = week;

      fixture.stadiumId = homeTeam ? homeTeam.teamStadiumId : null;

      fixture.homeTeamId = homeTeam ? homeTeam.teamId : null;
      fixture.homeTeamStadiumId = homeTeam ? homeTeam.teamStadiumId : null;

      fixture.awayTeamId = awayTeam ? awayTeam.teamId : null;
      fixture.awayTeamStadiumId = awayTeam ? awayTeam.teamStadiumId : null;

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

    matchTemp.stadiumId = match.awayTeamStadiumId;

    matchTemp.homeTeamId = match.awayTeamId;
    matchTemp.homeTeamStadiumId = match.awayTeamStadiumId;

    matchTemp.awayTeamId = match.homeTeamId;
    matchTemp.awayTeamStadiumId = match.homeTeamStadiumId;

    matchTemp.orderNo = match.orderNo;

    this.fixtureList[indexNo] = matchTemp;
    this.groupByFixture = this.groupByToFixture(this.fixtureList);

  }

  findStadium(stadiumId: number): string {
    let stadiumName;
    if (stadiumId) {
      stadiumName = this.stadiumList.find(stadium => stadium.id == stadiumId).stadiumName;
    } else {
      stadiumName = 'Belirtilmemiş';
    }

    return stadiumName;
  }

  findTeamName(teamId: number): string {

    let team: TeamsInGroupstagesModel;
    let teamName: string;
    team = this.teamsingroupstagesList.find(team => team.teamId == teamId);
    teamName = !!team ? team.teamOfficialName : 'BAY';

    return teamName;
  }

  onSaveFixture() {
    this.isLoading = true;
    const fixtureList = this.fixtureList;
    const groupstageId = this.groupstageSelectionId;
    this.fixturesService.createFixture(fixtureList, groupstageId);
    this.isLoading = false;
  }

  ngOnDestroy(): void {

  }
}
