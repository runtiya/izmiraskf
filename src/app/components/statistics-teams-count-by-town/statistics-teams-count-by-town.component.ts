import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { GlobalStatisticsService } from "../../services/global-statistics.service";
import { statisticsFunctions } from "../../functions/global-statistics.funtion";

import { globalFunctions } from "../../functions/global.function";

@Component({
  selector: 'app-global-statistics-teams-count-by-town',
  templateUrl: './statistics-teams-count-by-town.component.html',
  styleUrls: ['../../app.component.css', './statistics-teams-count-by-town.component.css']
})
export class GlobalStatisticsTeamsCountByTown implements OnInit, OnDestroy {

  teamsCountByTownList: any[] = [];
  private teamsCountByTownListSub: Subscription;

  chartOptions: any = this.statisticsFunctions.initChartPie();


  constructor(
    private statisticsService: GlobalStatisticsService,
    private statisticsFunctions: statisticsFunctions,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {

    this.statisticsService.getTeamsCountByTown();
    this.teamsCountByTownListSub = this.statisticsService.getTeamsCountByTownUpdateListener()
      .subscribe({
        next: (data: any[]) => {
          this.teamsCountByTownList = data;
          this.chartOptions.title.text = "İlçelere Göre Takım Sayısı";
          const { seriesArray, labelsArray } = this.statisticsFunctions.separateDataForPieChart(this.teamsCountByTownList);
          this.chartOptions.series = seriesArray;
          labelsArray.forEach((item, i) => {
            labelsArray[i] = this.globalFunctions.getTownValue(item);
          });
          this.chartOptions.labels = labelsArray;
        }
      });
  }

  ngOnDestroy(): void {
    this.teamsCountByTownListSub.unsubscribe();
  }
}
