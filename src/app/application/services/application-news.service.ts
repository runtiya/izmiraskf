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
  private newsUpdated = new Subject<NewsModel[]>();

  private newsById: NewsModel;
  private newsByIdSubject = new Subject<NewsModel>();

  private newsForSliderList: NewsModel[] = [];
  private newsForSliderListSubject = new Subject<NewsModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getNews() {
    try {
      this.http
        .get<{error: boolean, message: string, newsList: NewsModel[]}>(
          'http://localhost:3000/haberler/list'
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
        .subscribe((transformedData) => {
          this.newsList = transformedData.newsList;
          this.newsUpdated.next([...this.newsList]);

        });
    } catch (error) {
      this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
    }

  }

  getNewsUpdateListener() {
    return this.newsUpdated.asObservable();
  }

  getNewsById(id: number) {
    try {
      this.http
        .get<{error: boolean, message: string, news: NewsModel}>(
          'http://localhost:3000/haberler/news-id/' + id
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.newsById = data.news;
              this.newsByIdSubject.next(this.newsById);
            } else {

            }
          },
          error: (error) => {

          }
        })
    } catch (error) {

    }
  }

  getNewsByIdUpdateListener() {
    return this.newsByIdSubject.asObservable();
  }

  getNewsForSlider() {
    try {
      this.http
        .get<{error: boolean, message: string, newsList: NewsModel[]}>(
          'http://localhost:3000/haberler/hot-topics'
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.newsForSliderList = data.newsList;
              this.newsForSliderListSubject.next([...this.newsForSliderList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getNewsForSliderUpdateListener() {
    return this.newsForSliderListSubject.asObservable();
  }
}
