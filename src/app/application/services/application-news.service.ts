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

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getNews() {
    try {
      this.http
        .get<{error: boolean, message: string, news: any}>(
          'http://localhost:3000/admin/haberler'
        )
        .pipe(
          map(data => {
            return {
              news: data.news.map(newsObj => {
                return {
                  id: newsObj.id,
                  createdAt: newsObj.createdAt,
                  createdBy: newsObj.createdBy,
                  updatedAt: newsObj.updatedAt,
                  updatedBy: newsObj.updatedBy,
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
        .subscribe((transformedData) => {
          this.newsList = transformedData.news;
          this.newsUpdated.next([...this.newsList]);

        });
    } catch (error) {
      this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
    }

  }


  getNewsUpdateListener() {
    return this.newsUpdated.asObservable();
  }
}
