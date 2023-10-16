import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from 'rxjs';

import { SeasonsModel } from "../../models/admin-seasons.model";
import { SeasonsService } from "../../services/admin-seasons.service";

import { LeaguesModel } from "../../models/admin-leagues.model";
import { LeaguesService } from "../../services/admin-leagues.service";

import { GroupStagesModel } from "../../models/admin-groupstages.model";
import { GroupStagesService } from "../../services/admin-groupstages.service";

import { TeamsInGroupstagesService } from "../../services/admin-teams-in-groupstages.service";

import { FixtureSearchModel } from "../../models/admin-fixture-search-index.model";
import { FixtureService } from "../../services/admin-fixtures.service";

import { PointBoardService } from "../../services/admin-pointboard.service";

import { globalFunctions } from "../../../functions/global.function";


@Component({
  selector: 'app-admin-pointboard-fixture-wrap',
  templateUrl: './pointboard-fixture-wrap.component.html',
  styleUrls: ['../../../app.component.css', './pointboard-fixture-wrap.component.css']
})
export class AdminPointBoardFixtureWrap implements OnInit, OnDestroy {
  isLoading: boolean = false;
  toolbarTitle = "PUAN TABLOSU VE FİKSTÜR";
  seasonsList: SeasonsModel[] = [];
  private seasonsListSub: Subscription;
  leaguesList: LeaguesModel[] = [];
  private leaguesListSub: Subscription;
  groupstagesList: GroupStagesModel[] = [];
  private groupstagesListSub: Subscription;
  weekSequenceList: Array<number>[] = [];
  private weekSequenceListSub: Subscription;

  fixtureSearchIndex = <FixtureSearchModel>{};

  @Input() seasonSelectionId: number;
  @Input() leagueSelectionId: number;
  @Input() groupstageSelectionId: number;
  @Input() matchWeekSelectionValue: number;

  constructor(
    public seasonsService: SeasonsService,
    public leaguesService: LeaguesService,
    public groupstagesService: GroupStagesService,
    public teamsingroupstageService: TeamsInGroupstagesService,
    public fixtureService: FixtureService,
    public pointboardService: PointBoardService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.seasonsService.getSeasons();
    this.seasonsListSub = this.seasonsService.getSeasonsListUpdateListener()
      .subscribe({
        next: (data: SeasonsModel[]) => {
          console.log(data)
          if (data.length > 0) {
            this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
            this.seasonSelectionId = this.seasonsList[0].id;
            this.leaguesService.getLeagues(this.seasonSelectionId);
          } else {
            this.seasonsList = [];
            this.leaguesList = [];
            this.groupstagesList = [];
            this.weekSequenceList = [];

            this.seasonSelectionId = null;
            this.leagueSelectionId = null;
            this.groupstageSelectionId = null;
            this.matchWeekSelectionValue = null;

            this.isLoading = false;
          }
        }
      });

    this.leaguesListSub = this.leaguesService.getLeagueListUpdateListener()
      .subscribe({
        next: (data: LeaguesModel[]) => {
          if (data.length > 0) {
            this.leaguesList = data.sort((a, b) => a.orderNo - b.orderNo);
            this.leagueSelectionId = this.leaguesList[0].id;
            this.groupstagesService.getGroupstages(this.leagueSelectionId);
          } else {
            this.leaguesList = [];
            this.groupstagesList = [];
            this.weekSequenceList = [];

            this.leagueSelectionId = null;
            this.groupstageSelectionId = null;
            this.matchWeekSelectionValue = null;

            this.isLoading = false;
          }
        }
      });

    this.groupstagesListSub = this.groupstagesService.getGroupStageListUpdateListener()
      .subscribe({
        next: (data: GroupStagesModel[]) => {
          if (data.length > 0) {
            this.groupstagesList = data.sort((a, b) => a.orderNo - b.orderNo);
            this.groupstageSelectionId = this.groupstagesList[0].id;
            this.groupstagesService.getGroupWeeks(this.groupstageSelectionId);
            this.groupstagesService.getPlayedLastMatchWeek(this.groupstageSelectionId)
              .subscribe({
                next: (data: {data: number}) => {
                  // call onSearch only if matchWeekSelectionValue is null before assignment, means work only page loaded.
                  // Subsequently, only the onSearch button will be searched.
                  if (!this.matchWeekSelectionValue) {
                    this.teamsingroupstageService.getTeamsInGroupstages(this.groupstageSelectionId);
                    this.matchWeekSelectionValue = data.data;
                    this.onSearch();
                  } else {
                    this.matchWeekSelectionValue = data.data;
                    this.isLoading = false;
                  }
                }
              });
          } else {
            this.groupstagesList = [];
            this.weekSequenceList = [];

            this.groupstageSelectionId = null;
            this.matchWeekSelectionValue = null;

            this.isLoading = false;
          }


        }
      });

    this.weekSequenceListSub = this.groupstagesService.getGroupWeeksUpdateListener()
      .subscribe({
        next: (data: Array<number>[]) => {
          this.weekSequenceList = data;
          this.isLoading = false;
        }
      });
  }

  onSeasonChange() {
    this.isLoading = true;
    this.leaguesService.getLeagues(this.seasonSelectionId);
  }

  onLeagueChange() {
    this.isLoading = true;
      this.groupstagesService.getGroupstages(this.leagueSelectionId);
  }

  onGroupStageChange() {
    this.isLoading = true;
    //this.matchWeekSelectionValue = null;
    this.groupstagesService.getGroupWeeks(this.groupstageSelectionId);
  }

  onSearch() {
    // Get Teams In Disqualifications
    this.teamsingroupstageService.getTeamsInGroupstages(this.groupstageSelectionId);

    //Get Point Board
    this.pointboardService.getPointBoard(this.groupstageSelectionId, this.matchWeekSelectionValue);

    // Get Fixture
    this.fixtureSearchIndex.seasonId = this.seasonSelectionId || null;
    this.fixtureSearchIndex.leagueId = this.leagueSelectionId || null;
    this.fixtureSearchIndex.groupstageId = this.groupstageSelectionId || null;
    this.fixtureSearchIndex.matchWeek = this.matchWeekSelectionValue || null;
    this.fixtureService.getFixtureBySearchIndex(this.fixtureSearchIndex);
  }

  ngOnDestroy(): void {
    this.seasonsListSub.unsubscribe();
    this.leaguesListSub.unsubscribe();
    this.groupstagesListSub.unsubscribe();
    this.weekSequenceListSub.unsubscribe();
  }
}
