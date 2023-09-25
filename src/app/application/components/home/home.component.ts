import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { NewsService } from "../../services/application-news.service";

import { ExternalLinksService } from "../../services/application-externallinks.service";
import { ExternalLinksModel } from "../../models/application-externallinks.model";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-application-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../app.component.css', './home.component.css']
})
export class ApplicationHome implements OnInit, OnDestroy {
  toolbarTitle = "ANA SAYFA";

  extAdvertisementList: ExternalLinksModel[] = [];
  private extAdvertisementListSubscription: Subscription;

  constructor(
    private newsService: NewsService,
    private externalLinksService: ExternalLinksService,
    private globalFunctions: globalFunctions,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.weatherForecast(document, 'script', 'weatherwidget-io-js');
    this.globalFunctions.setToolbarTitle(null);

    this.newsService.getNewsForSlider();
    this.externalLinksService.getLinks('RELATEDLINK');
    this.externalLinksService.getLinks('ADVERTISEMENT');
    this.extAdvertisementListSubscription = this.externalLinksService.getExternalAdvertisementUpdateListener()
      .subscribe({
        next: (data: ExternalLinksModel[]) => {
          this.extAdvertisementList = data;
        },
        error: (error) => {

        }
      });
  }

  weatherForecast(d, s, id) {
    var js,fjs = d.getElementsByTagName(s)[0];
    js=d.createElement(s);
    js.id=id;
    js.src='https://weatherwidget.io/js/widget.min.js';
    fjs.parentNode.insertBefore(js,fjs);
  }

  showNewsList() {
    this.router.navigate(['/haberler']);
  }

  showDisciplinaryBoardDecisions() {
    this.router.navigate(['/komite-kararlari/disiplinkurulu']);
  }

  showOrganizinCommitteeDecisions() {
    this.router.navigate(['/komite-kararlari/iltertipkomitesi']);
  }

  ngOnDestroy(): void {
    this.extAdvertisementListSubscription.unsubscribe();
  }

}
