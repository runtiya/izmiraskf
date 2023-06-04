import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, NgForm } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE }  from "@angular/material/core";
import { Subscription } from "rxjs";

import { StadiumsService } from "../../services/admin-stadiums.service";



@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../app.component.css', './home.component.css']
})
export class AdminHome implements OnInit, OnDestroy {
  headerTitle = "ANA SAYFA";


  constructor(
    private stadiumsService: StadiumsService
  ) {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
