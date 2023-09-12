import { Injectable, ViewChild } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexFill,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTheme
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  details: ApexChart;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  labels: any;
  colors: string[];
  theme: ApexTheme;
  responsive: ApexResponsive[];

};

@Injectable({
  providedIn: 'root'
})
export class statisticsFunctions {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptionsPie: Partial<ChartOptions>;
  public chartOptionsBart: Partial<ChartOptions>;

  constructor(

  ) {

  }

  initChartPie(): Object {
    this.chartOptionsPie = {
      title: {
        text: "Grafik Başlığı",
        style: {
          fontFamily: "Roboto"
        }
      },
      series: [1],
      chart: {
        type: "pie",
        stacked: false,
        stackType: "100%",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        categories: []
      },
      tooltip: {
        y: {
          formatter: null
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "left"
      },
      labels: ["label #1"],
      dataLabels: {
        enabled: true
      },
      //colors: ['#006c9e', '#de425b', '#69d148', '#7f6ebe', '#df61a9', '#ff6d68', '#a9dc5d', '#fcbe6e', '#d9e87b', '#fff4a0'],

    }

    return this.chartOptionsPie;

  }


  separateDataForPieChart(data: any[]): { seriesArray: ApexNonAxisChartSeries, labelsArray: any[] } {
    const seriesArray: ApexNonAxisChartSeries = [];
    const labelsArray: any[] = [];

    data.forEach(item => {
      seriesArray.push(Number(item.series));
      labelsArray.push(item.labels.toString());
    });

    return { seriesArray: seriesArray, labelsArray: labelsArray };
  }


}
