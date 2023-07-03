import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { FormControl, NgForm } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE }  from "@angular/material/core";
import { Router } from "@angular/router";

import { NewsModel } from "../../models/application-news.model";
import { NewsService } from "../../services/application-news.service";

import { ExternalLinksService } from "../../services/application-externallinks.service";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-application-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../app.component.css', './home.component.css']
})
export class ApplicationHome implements OnInit, OnDestroy {
  toolbarTitle = "ANA SAYFA";

  constructor(
    private newsService: NewsService,
    private externalLinksService: ExternalLinksService,
    private globalFunctions: globalFunctions,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.globalFunctions.setToolbarTitle(null);

    this.newsService.getNewsForSlider();
    this.externalLinksService.getLinks('RELATEDLINK');
  }

  showNewsList() {
    this.router.navigate(['/haberler']);
  }

  showDisciplinaryBoardDecisions() {
    this.router.navigate(['/disiplin-kurulu-kararlari']);
  }

  ngOnDestroy(): void {

  }

}
