import { Component, Inject, OnDestroy, OnInit, Input, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from "@angular/router";

import { NewsModel } from "../../models/application-news.model";
import { NewsService } from "../../services/application-news.service";

import { globalFunctions } from "../../../functions/global.function";

import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon.list";

@Component({
  selector: 'app-application-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['../../../app.component.css','./news-list.component.css']
})
export class ApplicationNewsList implements OnInit, OnDestroy {
  toolbarTitle = "HABERLER";
  isLoading: boolean = false;
  newsList: NewsModel[] = [];
  private newsSub: Subscription;

  fontAwesomeIconList = fontAwesomeIconList;


  constructor(
    public newsService: NewsService,
    private router: Router,
    private globalFunctions: globalFunctions,
    ) {}

  ngOnInit(): void {

    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.newsService.getNews();
    this.newsSub = this.newsService.getNewsUpdateListener()
      .subscribe((data: NewsModel[]) => {
        this.newsList = data;
      });
  }

  showNewsDetails(_id: number) {
    this.router.navigate(['/haberler/detaylar', _id]);
  }

  ngOnDestroy(): void {
    this.newsSub.unsubscribe();
  }
}
