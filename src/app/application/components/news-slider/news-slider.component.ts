import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

import { NewsModel } from "../../models/application-news.model";
import { NewsService } from "../../services/application-news.service";

import { globalFunctions } from "../../../functions/global.function";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-application-news-slider',
  templateUrl: './news-slider.component.html',
  styleUrls: ['../../../app.component.css', './news-slider.component.css']
})
export class ApplicationNewsSlider implements OnInit, OnDestroy {
  toolbarTitle = "HABERLER";
  isLoading: boolean = false;
  newsList: NewsModel[] = [];
  private newsListSubscription: Subscription;
  environment = environment;

  constructor(
    private newsService: NewsService,
    private globalFunctions: globalFunctions,
    private router: Router
  ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.newsListSubscription = this.newsService.getNewsForSliderUpdateListener()
      .subscribe({
        next: (data) => {
          this.newsList = data;
          this.newsList.map(n => {
            if (n.imagePath !== null) {
              n.imagePath = `${environment.serverUrl}${n.imagePath}`;
            }
          })
          this.isLoading = false;
        }
      });
  }

  showNewsDetails(_id: number) {
    this.router.navigate(['/haberler/detaylar', _id]);
  }

  getDate(date: string): string {
    return this.globalFunctions.getLocalDate(date);
  }

  ngOnDestroy(): void {
    this.newsListSubscription.unsubscribe();
  }
}
