import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { SeasonsModel } from "../../models/admin-seasons.model";
import { SeasonsService } from "../../services/admin-seasons.service";

import { LeaguesModel } from "../../models/admin-leagues.model";
import { LeaguesService } from "../../services/admin-leagues.service";

import { GroupStagesModel } from "../../models/admin-groupstages.model";
import { GroupStagesService } from "../../services/admin-groupstages.service";

import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";
import { TeamsInGroupstagesService } from "../../services/admin-teams-in-groupstages.service";

import { FixtureService } from "../../services/admin-fixtures.service";
import { FixtureModel } from "../../models/admin-fixture.model";
import { FixtureSearchModel } from "../../models/admin-fixture-search-index.model";
import { MatchModel } from "../../models/admin-match.model";

import { StadiumsModel } from "../../models/admin-stadiums.model";
import { StadiumsService } from "../../services/admin-stadiums.service";

import { AdminFixtureEditModal } from "../fixture-edit/fixture-edit.component";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

import { fixtureFunctions } from "../../functions/fixture.function";
import { fileImportExportFunctions } from "../../functions/file-import-export.function";
import { globalFunctions } from "../../../functions/global.function";
import { environment } from "../../../../environments/environment";

import {
  fixtureKey3,
  fixtureKey4,
  fixtureKey5,
  fixtureKey6,
  fixtureKey7,
  fixtureKey8,
  fixtureKey9,
  fixtureKey10,
  fixtureKey11,
  fixtureKey12,
  fixtureKey13,
  fixtureKey14,
  fixtureKey15
} from "../../assets/lists/fixture-keys.list";


@Component({
  selector: 'app-admin-fixture-create',
  templateUrl: './fixture-create.component.html',
  styleUrls: ['../../../app.component.css', './fixture-create.component.css']
})
export class AdminFixtureCreate implements OnInit, OnDestroy {
  toolbarTitle = "FİKSTÜR";
  isLoading: boolean = false;

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
  environment = environment;

  fixtureSearchIndex: FixtureSearchModel = <FixtureSearchModel>{};

  @Input() seasonSelectionId: number;
  @Input() leagueSelectionId: number;
  @Input() groupstageSelectionId: number;


  tableColumnsFixture: string[] = [
                                    "matchNo",
                                    "homeTeam",
                                    "details",
                                    "awayTeam",
                                    "actions"
                                  ];
  groupByFixture: any[] = [];
  constructor(
    private seasonsService: SeasonsService,
    private leaguesService: LeaguesService,
    private groupstagesService: GroupStagesService,
    private teamsingroupstagesService: TeamsInGroupstagesService,
    private fixturesService: FixtureService,
    private stadiumsService: StadiumsService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions,
    private fixtureFunctions: fixtureFunctions,
    private fileImportExportFunctions: fileImportExportFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(null);
    this.seasonsService.getSeasons();
    this.seasonListSub = this.seasonsService.getSeasonsListUpdateListener()
      .subscribe({
        next: (data: SeasonsModel[]) => {
          if (data.length > 0) {
            this.seasonList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
            this.seasonSelectionId = this.seasonList[0]["id"];
            this.leaguesService.getLeagues(this.seasonSelectionId);
          } else {
            this.seasonList = [];
            this.leagueList = [];
            this.groupstageList = [];
            this.teamsingroupstagesList = [];
            this.fixtureList = [];
            this.groupByFixture = [];

            this.seasonSelectionId = null;
            this.leagueSelectionId = null;
            this.groupstageSelectionId = null;
            this.onSearch();
            this.isLoading = false;
          }
        }
      });


    this.leagueListSub = this.leaguesService.getLeagueListUpdateListener()
      .subscribe({
        next: (data: LeaguesModel[]) => {
          if (data.length > 0) {
            this.leagueList = data.sort((a, b) => a.orderNo - b.orderNo);
            this.leagueSelectionId = this.leagueList[0]["id"];
            this.groupstagesService.getGroupstages(this.leagueSelectionId);
          } else {
            this.groupstageList = [];
            this.teamsingroupstagesList = [];
            this.fixtureList = [];
            this.groupByFixture = [];

            this.leagueSelectionId = null;
            this.groupstageSelectionId = null;
            this.onSearch();
            this.isLoading = false;
          }
        }
      });


    this.groupstageListSub = this.groupstagesService.getGroupStageListUpdateListener()
      .subscribe({
        next: (data: GroupStagesModel[]) => {
          if (data.length > 0) {
            this.groupstageList = data.sort((a, b) => a.orderNo - b.orderNo);
            this.groupstageSelectionId = this.groupstageList[0]["id"];
          } else {
            this.groupstageSelectionId = null;
            this.teamsingroupstagesList = [];
            this.fixtureList = [];
            this.groupByFixture = [];

            this.groupstageSelectionId = null;

            this.isLoading = false;
          }
          this.onSearch();
        }
      });

      this.teamsingroupstagesListSub = this.teamsingroupstagesService.getTeamsInGroupstagesUpdateListener()
      .subscribe({
        next: (data: TeamsInGroupstagesModel[]) => {
          if (data.length > 0) {
            this.teamsingroupstagesList = data.sort((a, b) => a.orderNo - b.orderNo);
            this.teamsingroupstagesList.map(t => {
              if (t.teamImagePath !== null && !t.teamImagePath.includes(environment.serverUrl)) {
                t.teamImagePath = `${environment.serverUrl}${t.teamImagePath}`;
              }
            });
          } else {
            this.teamsingroupstagesList = [];
          }
          this.isLoading = false;
        }
      });


    this.fixtureListSub = this.fixturesService.getFixtureUpdateListener()
      .subscribe({
        next: (data: FixtureModel[]) => {
          if (data.length > 0) {
            this.fixtureList = data.sort((a, b) => a.orderNo - b.orderNo);
            this.fixtureList.map(f => {
              if (f.homeTeamImagePath !== null && !f.homeTeamImagePath.includes(environment.serverUrl)) {
                f.homeTeamImagePath = `${environment.serverUrl}${f.homeTeamImagePath}`;
              }

              if (f.awayTeamImagePath !== null && !f.awayTeamImagePath.includes(environment.serverUrl)) {
                f.awayTeamImagePath = `${environment.serverUrl}${f.awayTeamImagePath}`;
              }
            });
            this.groupByFixture = this.groupByToFixture(this.fixtureList);
          } else {
            this.fixtureList = [];
            this.groupByFixture = [];
          }

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
    this.onSearch();
  }


  onSearch() {
    this.isLoading = true;
    this.teamsingroupstagesService.getTeamsInGroupstages(this.groupstageSelectionId);

    this.fixtureSearchIndex = this.fixtureFunctions.setFixtureSearchModel(
      this.seasonSelectionId,
      this.leagueSelectionId,
      this.groupstageSelectionId,
      null, null, null, null, null, null, null, null, null, null
    );
    this.fixturesService.getFixtureBySearchIndex(this.fixtureSearchIndex);
  }

  buildFixtureList() {
    try {
      this.isLoading = true;
      const teamsList: TeamsInGroupstagesModel[] = this.teamsingroupstagesList;
      const fixtureKeyCount: number = teamsList.length;
      const periodSystem = this.groupstageList.find(g => g.id == this.groupstageSelectionId).periodSystem;
      var fixtureKey = [];
      var _matchList: MatchModel[] = [];

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


            var matchDraft: MatchModel = this.createDraft(homeTeam, awayTeam, week, orderNo);
            _matchList.push(matchDraft);
          }
        }
      }
      this.fixturesService.createFixture(_matchList, this.fixtureSearchIndex);
    } catch (error) {
      this.globalFunctions.showSnackBar('Hata!');
      _matchList = [];
      this.groupByFixture = this.groupByToFixture(this.fixtureList);
    }
  }

  createDraft(homeTeam: TeamsInGroupstagesModel, awayTeam: TeamsInGroupstagesModel, weekNumber: number, orderNo: number): MatchModel {
    const seasonId = this.seasonSelectionId;
    const leagueId = this.leagueSelectionId;
    const groupstageId = this.groupstageSelectionId;
    const teamsingroupstagesList = this.teamsingroupstagesList;

    let matchDraft: MatchModel;
    matchDraft = this.fixtureFunctions.setMatchDraft(
      homeTeam,
      awayTeam,
      weekNumber,
      orderNo,
      seasonId,
      leagueId,
      groupstageId
    );

    return matchDraft;
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

    const _groupByToFixture = Object.entries(groupBy('matchWeek')(fixtureList))
      .map(([key, value]) => ({ week: key, matchList: value }));

    return _groupByToFixture;
  }


  clearFixtureList() {
    const dialogRef = this.dialog.open(AdminConfirmationDialogModal, {
      data: {
        title: 'İŞLEMİ ONAYLIYOR MUSUNUZ?',
        message: 'Bu işlem verilerinizi kalıcı olarak silecektir, işleminizi onaylıyor musunuz?'
      }
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.fixturesService.clearFixture(this.groupstageSelectionId);
          }
        }
      });
  }

  onCreateMatch() {
    let matchDay = <MatchModel>{};
    matchDay.matchNo = null;
    matchDay.groupstageId = this.groupstageSelectionId;

    let _fixtureSearchIndex: FixtureSearchModel = this.fixtureFunctions.setFixtureSearchModel(
      this.seasonSelectionId,
      this.leagueSelectionId,
      this.groupstageSelectionId,
      null, null, null, null, null, null, null, null, null, null
    );

    const dialogRef = this.dialog.open(AdminFixtureEditModal, {
      data: {
        pageMode: 'create',
        fixtureInfo: matchDay,
        stadiumList: this.stadiumList,
        teamsingroupstagesList: this.teamsingroupstagesList,
        seasonSelectionId: this.seasonSelectionId,
        leagueSelectionId: this.leagueSelectionId,
        groupstageSelectionId: this.groupstageSelectionId,
        fixtureSearchIndex: _fixtureSearchIndex
      }
    });
  }

  onEdit(matchDay: MatchModel, matchWeek: number) {
    matchDay.matchWeek = matchWeek;

    let _fixtureSearchIndex: FixtureSearchModel = this.fixtureFunctions.setFixtureSearchModel(
      this.seasonSelectionId,
      this.leagueSelectionId,
      this.groupstageSelectionId,
      null, null, null, null, null, null, null, null, null, null
    );

    const dialogRef = this.dialog.open(AdminFixtureEditModal, {
      data: {
        pageMode: 'edit',
        fixtureInfo: matchDay,
        stadiumList: this.stadiumList,
        teamsingroupstagesList: this.teamsingroupstagesList,
        seasonSelectionId: this.seasonSelectionId,
        leagueSelectionId: this.leagueSelectionId,
        groupstageSelectionId: this.groupstageSelectionId,
        fixtureSearchIndex: _fixtureSearchIndex
      }
    });
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(AdminConfirmationDialogModal, {
      data: {
        title: 'İŞLEMİ ONAYLIYOR MUSUNUZ?',
        message: 'Bu işlem verilerinizi kalıcı olarak silecektir, işleminizi onaylıyor musunuz?'
      }
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.fixturesService.deleteMatch(id);
          }
        }
      });
  }

  onImport() {

  }


  onExport() {
    this.fileImportExportFunctions.exportExcelFixture(this.groupByFixture);
  }

  swapMatch(matchNo: string) {
    const match = this.fixtureList.find(m => m.matchNo == matchNo);
    const indexNo = this.fixtureList.findIndex(m => m.matchNo == matchNo);
    let matchTemp = <MatchModel>{};

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

    var _matchList: MatchModel[] = [];
    _matchList.push(matchTemp);

    let fixtureSearchIndex: FixtureSearchModel = this.fixtureFunctions.setFixtureSearchModel(
      this.seasonSelectionId,
      this.leagueSelectionId,
      this.groupstageSelectionId,
      null, null, null, null, null, null, null, null, null, null
    )
    this.fixturesService.updateFixture(_matchList, fixtureSearchIndex);
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


  findTeamLogo(teamId: number): string {
    let team : TeamsInGroupstagesModel = this.teamsingroupstagesList.find(team => team.teamId == teamId);
    return !!team ? team.teamImagePath : null;;
  }

  findExpelledOrReceded(teamId: number): boolean {
    let team: TeamsInGroupstagesModel = this.teamsingroupstagesList.find(team => team.teamId == teamId);
    return !!team ? (team.isExpelled || team.isReceded) : false;
  }

  findExpelledOrRecededExplanation(teamId: number): string {
    let team: TeamsInGroupstagesModel = this.teamsingroupstagesList.find(team => team.teamId == teamId);
    return !!team ? team.explanation : null;
  }


  getDateTime(_date: Date): string {
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

  ngOnDestroy(): void {
    this.seasonListSub.unsubscribe();
    this.leagueListSub.unsubscribe();
    this.groupstageListSub.unsubscribe();
    this.teamsingroupstagesListSub.unsubscribe();
    this.fixtureListSub.unsubscribe();
    this.stadiumListSub.unsubscribe();
  }
}
