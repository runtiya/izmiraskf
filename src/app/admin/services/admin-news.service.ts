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
  private newsCount: number = 0;
  private newsUpdated = new Subject<{newsList: NewsModel[], newsCount: number}>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getNews(paginationPageSize?: number, paginationCurrentPage?: number) {
    try {
      this.http
        .get<{data: {newsList: NewsModel[], newsCount: number}}>(
          `http://localhost:3000/admin/haberler?paginationPageSize=${paginationPageSize}&paginationCurrentPage=${paginationCurrentPage}`
        )
       .subscribe({
        next: (data) => {
          this.newsList = data.data.newsList;
          this.newsCount = data.data.newsCount;
          this.newsUpdated.next(data.data);
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

  createNews(newsInfo: NewsModel) {
    try {
      const formData = new FormData();
      formData.append('image', newsInfo.imageAttachment);
      formData.append('newsInfo', JSON.stringify(newsInfo));

      this.http
        .post<{data: NewsModel}>(
          'http://localhost:3000/admin/haberler', formData
        )
        .subscribe({
          next: (data) => {
            newsInfo = data.data;
            this.newsList.push(newsInfo);
            this.newsCount++;
            this.newsUpdated.next({newsList: this.newsList, newsCount: this.newsCount});
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
        .put<{ data: NewsModel }>(
          'http://localhost:3000/admin/haberler/' + newsInfo.id, formData
        )
        .subscribe({
          next: (data) => {
            this.newsList.forEach((item, i) => {
              if (item.id == newsInfo.id) {
                this.newsList[i] = data.data;
              }
            });
            this.newsUpdated.next({newsList: this.newsList, newsCount: this.newsCount});
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
            this.newsCount--;
            this.newsUpdated.next({newsList: this.newsList, newsCount: this.newsCount});
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
