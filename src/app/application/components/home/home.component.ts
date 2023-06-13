import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { FormControl, NgForm } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE }  from "@angular/material/core";

import { globalFunctions } from "../../../functions/global.function";
@Component({
  selector: 'app-application-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../app.component.css', './home.component.css']
})
export class ApplicationHome implements OnInit, OnDestroy {
  toolbarTitle = "ANA SAYFA";

  constructor(
    private globalFunctions: globalFunctions
  ) {

  }

  ngOnInit(): void {
    this.globalFunctions.setToolbarTitle(null);
  }

  ngOnDestroy(): void {

  }

}
