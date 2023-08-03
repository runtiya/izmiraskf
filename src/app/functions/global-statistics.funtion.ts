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
  chartColors: any[] = ['#99BF00', '#456789', '#546E7A', '#E91E63', '#FF9800', '#3F51B3', '#A12B34'];
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
