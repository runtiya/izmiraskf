import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { StatisticsService } from "../../services/global-statistics.service";
import { statisticsFunctions } from "../../functions/global-statistics.funtion";

import { globalFunctions } from "../../functions/global.function";

@Component({
  selector: 'app-global-statistics-stadiums-count-by-floortype',
  templateUrl: './statistics-stadiums-count-by-floortype.component.html',
  styleUrls: ['../../app.component.css', './statistics-stadiums-count-by-floortype.component.css']
})
export class GlobalStatisticsStadiumsCountByFloorType implements OnInit, OnDestroy {

  stadiumsCountByFloorTypeList: any[] = [];
  private stadiumsCountByFloorTypeListSub: Subscription;

  chartOptions: any = this.statisticsFunctions.initChartPie();


  constructor(
    private statisticsService: StatisticsService,
    private statisticsFunctions: statisticsFunctions,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {

    this.statisticsService.getStadiumsCountByFloorType();
    this.stadiumsCountByFloorTypeListSub = this.statisticsService.getStadiumsCountByFloorTypeUpdateListener()
      .subscribe({
        next: (data: any[]) => {
          this.stadiumsCountByFloorTypeList = data;

          this.chartOptions.title.text = "Zemin Türüne Göre Saha Sayısı";
          const { seriesArray, labelsArray } = this.statisticsFunctions.separateDataForPieChart(this.stadiumsCountByFloorTypeList);
          this.chartOptions.series = seriesArray;

          labelsArray.forEach((item, i) => {
            labelsArray[i] = this.globalFunctions.getFloorTypeValue(item);
          });
          this.chartOptions.labels = labelsArray;

        }
      });
  }

  ngOnDestroy(): void {
    this.stadiumsCountByFloorTypeListSub.unsubscribe();
  }
}
