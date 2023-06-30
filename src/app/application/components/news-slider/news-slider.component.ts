import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

import { NewsModel } from "../../models/application-news.model";
import { NewsService } from "../../services/application-news.service";


import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-application-news-slider',
  templateUrl: './news-slider.component.html',
  styleUrls: ['../../../app.component.css', './news-slider.component.css']
})
export class ApplicationNewsSlider implements OnInit, OnDestroy {
  toolbarTitle = "HABERLER";
  newsList: NewsModel[] = [];
  private newsListSubscription: Subscription;


  constructor(
    private newsService: NewsService,
    private globalFunctions: globalFunctions,
    private router: Router
  ){}

  ngOnInit(): void {

    this.newsListSubscription = this.newsService.getNewsForSliderUpdateListener()
      .subscribe({
        next: (data) => {
          this.newsList = data;
        },
        error: (error) => {

        }
      });

  }

  showNewsDetails(_id: number) {
    this.router.navigate(['/haberler/detaylar', _id]);
  }

  ngOnDestroy(): void {
    this.newsListSubscription.unsubscribe();
  }
}
