import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";


import { NewsModel } from "../models/admin-news.model";

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
        .get<{news: NewsModel[]}>(
          'http://localhost:3000/admin/haberler'
        )
        /*
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
        */
       .subscribe({
        next: (data) => {
          this.newsList = data.news;
          this.newsUpdated.next([...this.newsList]);
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

  addNews(newsInfo: NewsModel) {
    try {
      const formData = new FormData();
      formData.append('image', newsInfo.imageAttachment);
      formData.append('newsInfo', JSON.stringify(newsInfo));

      this.http
        .post<{newsId: number}>(
          'http://localhost:3000/admin/haberler', formData
        )
        .subscribe({
          next: (data) => {
            newsInfo.id = data.newsId;
            this.newsList.push(newsInfo);
            this.newsUpdated.next([...this.newsList]);
            this.globalFunctions.showSnackBar("server.success");
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  updateNews(newsInfo: NewsModel) {
    try {
      const formData = new FormData();
      formData.append('image', newsInfo.imageAttachment);
      formData.append('newsInfo', JSON.stringify(newsInfo));

      this.http
        .put<{ }>(
          'http://localhost:3000/admin/haberler/' + newsInfo.id, formData
        )
        .subscribe({
          next: (data) => {
            this.newsList.forEach((item, i) => {
              if (item.id == newsInfo.id) {
                this.newsList[i] = newsInfo;
              }
            });
            this.newsUpdated.next([...this.newsList]);
            this.globalFunctions.showSnackBar("server.success");
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  deleteNews(newsId: number) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/haberler/' + newsId
        )
        .subscribe({
          next: (data) => {
            const updatedNews = this.newsList.filter(news => news.id !== newsId);
            this.newsList = updatedNews;
            this.newsUpdated.next([...this.newsList]);
            this.globalFunctions.showSnackBar("server.success");
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }
}
