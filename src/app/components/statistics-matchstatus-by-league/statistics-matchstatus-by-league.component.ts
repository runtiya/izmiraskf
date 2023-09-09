import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { StatisticsService } from "../../services/global-statistics.service";
import { statisticsFunctions } from "../../functions/global-statistics.funtion";

import { SeasonsModel } from "../../admin/models/admin-seasons.model";
import { SeasonsService } from "../../admin/services/admin-seasons.service";

import { globalFunctions } from "../../functions/global.function";

@Component({
  selector: 'app-global-statistics-matchstatus-by-league',
  templateUrl: './statistics-matchstatus-by-league.component.html',
  styleUrls: ['../../app.component.css', './statistics-matchstatus-by-league.component.css']
})
export class GlobalStatisticsMatchStatusByTown implements OnInit, OnDestroy {

  matchStatusCountByLeagueList: any[] = [];
  private matchStatusCountByLeagueListSub: Subscription;

  seasonsList: SeasonsModel[] = [];
  private seasonsListSubscription: Subscription;

  chartOptions: any = this.statisticsFunctions.initChart();
  @Input() seasonSelectionId: number;

  constructor(
    private statisticsService: StatisticsService,
    private seasonsService: SeasonsService,
    private statisticsFunctions: statisticsFunctions,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.seasonsService.getSeasons();
    this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListUpdateListener()
      .subscribe({
        next: (data: SeasonsModel[]) => {
          this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
          this.seasonSelectionId = this.seasonsList[0]["id"];
          this.statisticsService.getMatchStatusCountByLeague(this.seasonSelectionId);
        }
      });

    this.matchStatusCountByLeagueListSub = this.statisticsService.getMatchStatusCountByLeagueUpdateListener()
      .subscribe({
        next: (data: any[]) => {

        }
      });
  }

  onSeasonChange(seasonId: number) {
    this.statisticsService.getMatchStatusCountByLeague(seasonId);
  }

  ngOnDestroy(): void {
    this.matchStatusCountByLeagueListSub.unsubscribe();
  }
}
