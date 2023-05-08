import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { globalFunctions } from "./admin/functions/global.function";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'izmiraskf';
  snackBarDuration = 3000; //milisecond
  showSpinner: boolean;

  constructor(
    private globalFunctions: globalFunctions,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.globalFunctions.showSnackBar.subscribe(message => {
      this._snackBar.open(message, 'Tamam', {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: this.snackBarDuration
      });
    });

    // <mat-spinner> subscription
    this.globalFunctions.showSpinner
      .subscribe((_displaySpinner: boolean) => {
        this.showSpinner = _displaySpinner;
      });


  }

}
