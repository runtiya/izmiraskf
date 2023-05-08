import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from 'rxjs';

import { DatePipe } from "@angular/common";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from "@angular/material/dialog";

import { SeasonsModel } from "../../models/admin-seasons.model";
import { SeasonsService } from "../../services/admin/admin-seasons.service";

import { LeaguesModel } from "../../models/admin-leagues.model";
import { LeaguesService } from "../../services/admin/admin-leagues.service";

import { GroupStagesModel } from "../../models/admin-groupstages.model";
import { GroupStagesService } from "../../services/admin/admin-groupstages.service";

import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";
import { TeamsInGroupstagesService } from "../../services/admin/admin-teams-in-groupstages.service";

import { StadiumsModel } from "../../models/admin-stadiums.model";
import { StadiumsService } from "../../services/admin/admin-stadiums.service";

import { TeamsModel } from "../../models/admin-teams.model";
import { TeamsService } from "../../services/admin/admin-teams.service";

import { FixtureModel } from "../../models/admin-fixture.model";
import { FixtureService } from "../../services/admin/admin-fixtures.service";

import { PointBoardModel } from "../../models/admin-pointboard.model";
import { PointBoardService } from "../../services/admin/admin-pointboard.service";

import { globalFunctions } from "../../functions/global.function";
import { fontAwesomeIconList } from "../../assets/lists/font-awesome-icon-list";

@Component({
  selector: 'app-admin-point-board',
  templateUrl: './point-board.component.html',
  styleUrls: ['../../../app.component.css', './point-board.component.css']
})
export class AdminPointBoard implements OnInit, OnDestroy {
  headerTitle = 'PUAN DURUMU';
  isLoading = false;
  seasonList: SeasonsModel[] = [];
  private seasonListSub: Subscription;
  leagueList: LeaguesModel[] = [];
  private leagueListSub: Subscription;
  groupstageList: GroupStagesModel[] = [];
  private groupstageListSub: Subscription;
  weekSequenceList: Array<number>[] = [];
  private weekSequenceListSub: Subscription;
  teamsingroupstageList: TeamsInGroupstagesModel[] = [];
  private teamsingroupstageListSub: Subscription;
  expelledOrRecededTeamsInGroupstageList: TeamsInGroupstagesModel[] = [];
  stadiumList: StadiumsModel[] = [];
  private stadiumListSub: Subscription;
  teamList: TeamsModel[] = [];
  private teamListSub: Subscription;
  fixtureList: FixtureModel[] = [];
  private fixtureListSub: Subscription;
  pointBoardList: PointBoardModel[] = [];
  private pointBoardListSub: Subscription;

  fontAwesomeIconList = fontAwesomeIconList;

  @Input() seasonSelectionId: number;
  @Input() leagueSelectionId: number;
  @Input() groupstageSelectionId: number;
  @Input() matchWeekSelectionValue: number;

  displayedColumnsPointBoard: string[] = [
                                            "order",
                                            "team",
                                            "played",
                                            "win",
                                            "draw",
                                            "lose",
                                            "goalScored",
                                            "goalConceded",
                                            "goalAverage",
                                            "totalPoints"
                                          ];

  constructor(
    public seasonsService: SeasonsService,
    public leaguesService: LeaguesService,
    public groupstagesService: GroupStagesService,
    public teamsingroupstageService: TeamsInGroupstagesService,
    public stadiumsService: StadiumsService,
    public teamsService: TeamsService,
    public fixtureService: FixtureService,
    public pointboardService: PointBoardService,
    public dialog: MatDialog,
    private _datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {

    this.seasonsService.getSeasons();
    this.seasonListSub = this.seasonsService.getSeasonsListSubListener()
        .subscribe((data: SeasonsModel[]) => {
            if (data.length > 0) {
                this.seasonList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
                this.seasonSelectionId = this.seasonList[0].id;
                this.leaguesService.getLeagues(this.seasonSelectionId);
            } else {
                this.seasonList = [];
                this.leagueList = [];
                this.groupstageList = [];
            }
        });

    this.leagueListSub = this.leaguesService.getLeagueListUpdateListener()
        .subscribe((data: LeaguesModel[]) => {
            if (data.length > 0) {
                this.leagueList = data.sort((a, b) => a.orderNo - b.orderNo);
                this.leagueSelectionId = this.leagueList[0].id
                this.groupstagesService.getGroupstages(this.leagueSelectionId);
            } else {
                this.leagueList = [];
                this.groupstageList = [];
            }
        });

    this.groupstageListSub = this.groupstagesService.getGroupStageListUpdateListener()
        .subscribe((data: GroupStagesModel[]) => {
            if (data.length > 0) {
                this.groupstageList = data.sort((a, b) => a.orderNo - b.orderNo);
                this.groupstageSelectionId = this.groupstageList[0].id
                this.groupstagesService.getGroupWeeks(this.groupstageSelectionId);
                this.groupstagesService.getPlayedLastMatchWeek(this.groupstageSelectionId)
                  .subscribe((data: any) => {
                    this.matchWeekSelectionValue = data.matchWeek;
                    this.pointboardService.getPointBoard(this.groupstageSelectionId, this.matchWeekSelectionValue);
                  });
                this.teamsingroupstageService.getTeamsInGroupstages(this.groupstageSelectionId);
            } else {
                this.groupstageList = []
                this.weekSequenceList = [];
            }
        });

    this.teamsingroupstageListSub = this.teamsingroupstageService.getTeamsInGroupstagesUpdateListener()
        .subscribe((data: TeamsInGroupstagesModel[]) => {
          this.teamsingroupstageList = data;
          this.expelledOrRecededTeamsInGroupstageList = this.teamsingroupstageList.filter(t => !!t.isExpelled || !!t.isReceded );
        });

    this.weekSequenceListSub = this.groupstagesService.getGroupWeeksUpdateListener()
        .subscribe((data: Array<number>[]) => {
          this.weekSequenceList = data;
        });



    this.fixtureListSub = this.fixtureService.getFixtureUpdateListener()
        .subscribe((data: FixtureModel[]) => {
            this.fixtureList = data;
        });

    this.pointBoardListSub = this.pointboardService.getPointBoardUpdateListener()
        .subscribe((data: PointBoardModel[]) => {
          this.pointBoardList = data;
        });


  }

  onSeasonChange() {
    this.leaguesService.getLeagues(this.seasonSelectionId);
  }

  onLeagueChange() {
      this.groupstagesService.getGroupstages(this.leagueSelectionId);
  }

  onGroupStageChange() {
    this.groupstagesService.getGroupWeeks(this.groupstageSelectionId);
    this.teamsingroupstageService.getTeamsInGroupstages(this.groupstageSelectionId);
  }

  onMatchWeekChange() {

  }

  onSearch() {
    this.pointboardService.getPointBoard(this.groupstageSelectionId, this.matchWeekSelectionValue);
  }

  findExpelledOrRecededTeam(_teamId: number): boolean {
    let team = this.expelledOrRecededTeamsInGroupstageList.find(team => team.teamId == _teamId);

    return !!team;
  }

  findExpelledOrRecededExplanation(_teamId: number): string {
    let team = this.expelledOrRecededTeamsInGroupstageList.find(team => team.teamId == _teamId);

    return !!team ? team.explanation : '';



  }

  ngOnDestroy(): void {
    this.seasonListSub.unsubscribe();
    this.leagueListSub.unsubscribe();
    this.groupstageListSub.unsubscribe();
    this.weekSequenceListSub.unsubscribe();
    this.fixtureListSub.unsubscribe();
  }
}
