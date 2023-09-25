import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { GlobalStatisticsService } from "../../services/global-statistics.service";
import { statisticsFunctions } from "../../functions/global-statistics.funtion";

import { globalFunctions } from "../../functions/global.function";

@Component({
  selector: 'app-global-statistics-stadiums-count-by-town',
  templateUrl: './statistics-stadiums-count-by-town.component.html',
  styleUrls: ['../../app.component.css', './statistics-stadiums-count-by-town.component.css']
})
export class GlobalStatisticsStadiumsCountByTown implements OnInit, OnDestroy {

  stadiumsCountByTownList: any[] = [];
  private stadiumsCountByTownListSub: Subscription;

  chartOptions: any = this.statisticsFunctions.initChartPie();

  constructor(
    private statisticsService: GlobalStatisticsService,
    private statisticsFunctions: statisticsFunctions,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {

    this.statisticsService.getStadiumsCountByTown();
    this.stadiumsCountByTownListSub = this.statisticsService.getStadiumsCountByTownUpdateListener()
      .subscribe({
        next: (data: any[]) => {
          this.stadiumsCountByTownList = data;
          this.chartOptions.title.text = "İlçelere Göre Saha Sayısı";
          const { seriesArray, labelsArray } = this.statisticsFunctions.separateDataForPieChart(this.stadiumsCountByTownList);
          this.chartOptions.series = seriesArray;
          labelsArray.forEach((item, i) => {
            labelsArray[i] = this.globalFunctions.getTownValue(item);
          });
          this.chartOptions.labels = labelsArray;
        }
      });
  }

  ngOnDestroy(): void {
    this.stadiumsCountByTownListSub.unsubscribe();
  }
}
