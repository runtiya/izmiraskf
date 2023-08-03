import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { StatisticsService } from "../../services/global-statistics.service";
import { StatisticsModel } from "../../models/global-statistics.model";
import { statisticsFunctions } from "../../functions/global-statistics.funtion";

import { globalFunctions } from "../../functions/global.function";

@Component({
  selector: 'app-global-statistics-teams-count-by-town',
  templateUrl: './statistics-teams-count-by-town.component.html',
  styleUrls: ['../../app.component.css', './statistics-teams-count-by-town.component.css']
})
export class GlobalStatisticsTeamsCountByTown implements OnInit, OnDestroy {

  teamsCountByTownList: StatisticsModel[] = [];
  private teamsCountByTownListSub: Subscription;

  chartOptions: any = this.statisticsFunctions.initChart();


  constructor(
    private statisticsService: StatisticsService,
    private statisticsFunctions: statisticsFunctions,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {

    this.statisticsService.getTeamsCountByTown();
    this.teamsCountByTownListSub = this.statisticsService.getTeamsCountByTownUpdateListener()
      .subscribe({
        next: (data: StatisticsModel[]) => {
          this.teamsCountByTownList = data;
          this.chartOptions.title.text = 'İlçelere Göre Takım Sayısı';
          const { seriesArray, labelsArray } = this.statisticsFunctions.separateData(this.teamsCountByTownList);
          this.chartOptions.series = seriesArray;

          labelsArray.forEach((item, i) => {
            labelsArray[i] = this.globalFunctions.getTownValue(item);
          });
          this.chartOptions.labels = labelsArray;
        }
      });
  }

  ngOnDestroy(): void {

  }
}
