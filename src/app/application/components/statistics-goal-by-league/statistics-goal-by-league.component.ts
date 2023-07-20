import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { StatisticsService } from "../../services/application-statistics.service";

import { globalFunctions } from "../../../functions/global.function";
import { chartsFunctions } from "../../functions/charts.function";

@Component({
  selector: 'app-application-statistics-goal-by-league',
  templateUrl: './statistics-goal-by-league.component.html',
  styleUrls: ['../../../app.component.css', './statistics-goal-by-league.component.css']
})
export class ApplicationStatisticsGoalByLeague implements OnInit, OnDestroy {

  goalByLeagueList: any[] = [];
  private goalByLeagueSub: Subscription;
  chartOptions = null;

  constructor(
    private statisticsService: StatisticsService,
    private globalFunctions: globalFunctions,
    private chartsFunctions: chartsFunctions
  ) {}

  ngOnInit(): void {
    this.statisticsService.getGoalByLeague();
    this.goalByLeagueSub = this.statisticsService.getGoalByLeagueListUpdateListener()
      .subscribe({
        next: (data: any[]) => {
          this.goalByLeagueList = data;
          /*
          this.chartOptions = this.chartsFunctions.initChart();
          this.chartOptions.title.text = "Liglere Göre Gol Sayısı";
          this.chartOptions.data[0].type = "column";
          this.chartOptions.data[0].yValueFormatString = "# GOL";
          this.chartOptions.data[0].dataPoints = this.goalByLeagueList;
          */
        },
        error: (error) => {
        }
      });


  }

  ngOnDestroy(): void {
    this.goalByLeagueSub.unsubscribe();
  }
}
