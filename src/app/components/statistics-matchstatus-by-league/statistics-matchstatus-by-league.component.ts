import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";

import { GlobalStatisticsService } from "../../services/global-statistics.service";
import { statisticsFunctions } from "../../functions/global-statistics.funtion";

import { SeasonsModel } from "../../application/models/application-seasons.model";
import { SeasonsService } from "../../application/services/application-seasons.service";

import { globalFunctions } from "../../functions/global.function";
import { matchStatusList } from "../../assets/lists/match-status.list";

@Component({
  selector: 'app-global-statistics-matchstatus-by-league',
  templateUrl: './statistics-matchstatus-by-league.component.html',
  styleUrls: ['../../app.component.css', './statistics-matchstatus-by-league.component.css']
})
export class GlobalStatisticsMatchStatusByTown implements OnInit, OnDestroy {

  matchStatusCountByLeagueList: any[] = [];
  _matchStatusCountByLeagueList: any[];
  private matchStatusCountByLeagueListSub: Subscription;

  seasonsList: SeasonsModel[] = [];
  private seasonsListSubscription: Subscription;

  @Input() seasonSelectionId: number;

  chartOptions: any = this.statisticsFunctions.initChartPie();

  matchStatusList = matchStatusList;

  constructor(
    private statisticsService: GlobalStatisticsService,
    private seasonsService: SeasonsService,
    private statisticsFunctions: statisticsFunctions,
    private globalFunctions: globalFunctions
  ) {

  }

  ngOnInit(): void {
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
          this.chartOptions.title.text = "Liglere Göre Müsabaka Statüleri";
          this.chartOptions.chart.type = "bar";
          this.chartOptions.chart.stacked = true;
          this.chartOptions.tooltip.y.formatter = (val) => {return (`${val} Müsabaka`)};
          this.chartOptions.colors = ["#808080", "#008000", "#ffa500", "#ff0000"];

          this.chartOptions.series = [
          ];
          this.chartOptions.xaxis = {
            categories: []
          }

          this.matchStatusCountByLeagueList = data;
          this._matchStatusCountByLeagueList = this.onGroupByLeagueName(this.matchStatusCountByLeagueList);
          this._matchStatusCountByLeagueList.map((leagues) => {
            this.chartOptions.xaxis.categories.push(leagues.leagueName);
          });

          this.matchStatusList.forEach(status => {
            var _series = <{name: string, data: any[]}>{};
            _series.name = status.value;
            _series.data = []

            for (let i = 0; i < this._matchStatusCountByLeagueList.length; i++) {
              const leagues = this._matchStatusCountByLeagueList[i];

              const statistic = leagues.statistics.find(ms => ms.matchStatus == status.name);
              if (statistic) {
                _series.data.push(statistic.statusCount);
              } else {
                _series.data.push(0)
              }
            }

            this.chartOptions.series.push(_series)
          });

        }
      });
  }

  onSeasonChange(seasonId: number) {
    this.statisticsService.getMatchStatusCountByLeague(seasonId);
  }

  onGroupByLeagueName(_matchStatusCountByLeagueList: any[]): any[] {
    const groupBy = prop => data => {
      return data.reduce((dict, item) => {
        const { [prop]: _, ...rest } = item;
        dict[item[prop]] = [...(dict[item[prop]] || []), rest];
        return dict;
      }, {});
    };

    const _groupByToLeague = Object.entries(groupBy('leagueName')(this.matchStatusCountByLeagueList))
      .map(([key, value]) => ({ leagueName: key, statistics: value }));

    return _groupByToLeague;
  }

  ngOnDestroy(): void {
    this.matchStatusCountByLeagueListSub.unsubscribe();
    this.seasonsListSubscription.unsubscribe();
  }
}
