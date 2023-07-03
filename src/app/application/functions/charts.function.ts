import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class chartsFunctions {

  constructor(

  ) {}

  initChart(): Object {
    const chartOptions = {
      title: {
        text: null,
      },
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      axisY: {
      includeZero: true,
      valueFormatString: null
      },
      data: [{
      type: "column", //change type to bar, line, area, pie, etc
      yValueFormatString: null,
      color: "#3F51B5",
      dataPoints: []
      }]
    }

    return chartOptions;
  }

}

