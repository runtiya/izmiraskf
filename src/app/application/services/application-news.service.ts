import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { NewsModel } from "../models/application-news.model";

import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class NewsService {
  private newsList: NewsModel[] = [];
  private newsUpdated = new Subject<{newsList: NewsModel[], newsCount: number}>();

  private newsById: NewsModel;
  private newsByIdSubject = new Subject<NewsModel>();

  private newsForSliderList: NewsModel[] = [];
  private newsForSliderListSubject = new Subject<NewsModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getNews(paginationPageSize: number, paginationCurrentPage: number) {
    this.http
      .get<{data: {newsList: NewsModel[], newsCount: number}}>(
        environment.serverUrl + `news/list?paginationPageSize=${paginationPageSize}&paginationCurrentPage=${paginationCurrentPage}`
      )
      .subscribe({
      next: (data) => {
        this.newsList = data.data.newsList;
        this.newsUpdated.next(data.data);
      },
      error: (error) => {
        this.newsUpdated.next({newsList: <NewsModel[]>{}, newsCount: 0});
        this.globalFunctions.showSnackBar(error);
      }
      });

  }

  getNewsUpdateListener() {
    return this.newsUpdated.asObservable();
  }

  getNewsById(id: number) {
    this.http
      .get<{data: NewsModel}>(
        environment.serverUrl + "news/news-id/" + id
      )
      .subscribe({
        next: (data) => {
          this.newsById = data.data;
          this.newsByIdSubject.next(this.newsById);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getNewsByIdUpdateListener() {
    return this.newsByIdSubject.asObservable();
  }

  getNewsForSlider() {
    this.http
      .get<{data: NewsModel[]}>(
        environment.serverUrl + "news/hot-topics"
      )
      .subscribe({
        next: (data) => {
          this.newsForSliderList = data.data;
          this.newsForSliderListSubject.next([...this.newsForSliderList]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getNewsForSliderUpdateListener() {
    return this.newsForSliderListSubject.asObservable();
  }
}
