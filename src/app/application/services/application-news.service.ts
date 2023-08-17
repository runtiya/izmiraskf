import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { NewsModel } from "../models/application-news.model";

import { globalFunctions } from "../../functions/global.function";

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
    try {
      this.http
        .get<{data: {newsList: NewsModel[], newsCount: number}}>(
          `http://localhost:3000/haberler/list?paginationPageSize=${paginationPageSize}&paginationCurrentPage=${paginationCurrentPage}`
        )
        /*
        .pipe(
          map(data => {
            return {
              news: data.news.map(newsObj => {
                return {
                  id: newsObj.id,
                  createdAt: newsObj.createdAt,
                  updatedAt: newsObj.updatedAt,
                  title: newsObj.title,
                  content: newsObj.content,
                  newsImage: newsObj.newsImage,
                  isOnline: newsObj.isOnline
                };
              }),
              maxNews: 10
            };
          })
        )
        */
       .subscribe({
        next: (data) => {
          this.newsList = data.data.newsList;
          this.newsUpdated.next(data.data); //this.newsUpdated.next([...this.newsList]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar('server.error');
        }
       });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }

  }

  getNewsUpdateListener() {
    return this.newsUpdated.asObservable();
  }

  getNewsById(id: number) {
    try {
      this.http
        .get<{data: NewsModel}>(
          'http://localhost:3000/haberler/news-id/' + id
        )
        .subscribe({
          next: (data) => {
            this.newsById = data.data;
            this.newsByIdSubject.next(this.newsById);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        })
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getNewsByIdUpdateListener() {
    return this.newsByIdSubject.asObservable();
  }

  getNewsForSlider() {
    try {
      this.http
        .get<{data: NewsModel[]}>(
          'http://localhost:3000/haberler/hot-topics'
        )
        .subscribe({
          next: (data) => {
            this.newsForSliderList = data.data;
            this.newsForSliderListSubject.next([...this.newsForSliderList]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getNewsForSliderUpdateListener() {
    return this.newsForSliderListSubject.asObservable();
  }
}
