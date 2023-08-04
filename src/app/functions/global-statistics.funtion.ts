import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';

import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from "ng-apexcharts";
import { StatisticsModel } from '../models/global-statistics.model';

@Injectable({
    providedIn: 'root'
})
export class statisticsFunctions {

  chartTitle: ApexTitleSubtitle = {
    text: 'Grafik Başlığı',
    style: {
      fontFamily: 'Roboto',
      //fontWeight: 500,
      //color: '#3F51B5'
    }
  };
  chartSeries: ApexNonAxisChartSeries = [1];
  chartColors: any[] = ['#006c9e', '#de425b', '#69d148', '#7f6ebe', '#df61a9', '#ff6d68', '#a9dc5d', '#fcbe6e', '#d9e87b', '#fff4a0'];
  chartLabels = ['label #1'];
  chartDataLabels: ApexDataLabels = {
    enabled: true
  }

  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  };

  constructor(

  ) {}

  initChart(): Object {
    const chartOptions: Object = new Object({
      title: this.chartTitle,
      series: this.chartSeries,
      colors: this.chartColors,
      labels: this.chartLabels,
      dataLabels: this.chartDataLabels,
      details: this.chartDetails
    });

    return chartOptions;

  }

  separateData(data: StatisticsModel[]): { seriesArray: ApexNonAxisChartSeries, labelsArray: any[] } {
    const seriesArray: ApexNonAxisChartSeries = [];
    const labelsArray: any[] = [];

    data.forEach(item => {
      seriesArray.push(Number(item.series));
      labelsArray.push(item.labels.toString());
    });



    return { seriesArray: seriesArray, labelsArray: labelsArray };
  }


}
