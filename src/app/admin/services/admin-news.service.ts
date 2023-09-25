import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

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
    this.http
      .get<{data: {newsList: NewsModel[], newsCount: number}}>(
        `http://localhost:3000/admin/news?paginationPageSize=${paginationPageSize}&paginationCurrentPage=${paginationCurrentPage}`
      )
      .subscribe({
      next: (data) => {
        this.newsList = data.data.newsList;
        this.newsCount = data.data.newsCount;
        this.newsUpdated.next(data.data);
      },
      error: (error) => {
        this.globalFunctions.showSnackBar(error);
      }
      });
  }

  getNewsUpdateListener() {
    return this.newsUpdated.asObservable();
  }

  createNews(newsInfo: NewsModel) {
    const formData = new FormData();
    formData.append('image', newsInfo.imageAttachment);
    formData.append('requestData', JSON.stringify(newsInfo));

    this.http
      .post<{data: NewsModel}>(
        'http://localhost:3000/admin/news', formData
      )
      .subscribe({
        next: (responseData) => {
          this.newsList.push(responseData.data);
          this.newsCount++;
          this.newsUpdated.next({newsList: this.newsList, newsCount: this.newsCount});
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateNews(newsInfo: NewsModel) {
    const formData = new FormData();
    formData.append('image', newsInfo.imageAttachment);
    formData.append('requestData', JSON.stringify(newsInfo));

    this.http
      .put<{ data: NewsModel }>(
        'http://localhost:3000/admin/news/' + newsInfo.id, formData
      )
      .subscribe({
        next: (responseData) => {
          this.newsList.forEach((item, i) => {
            if (item.id == newsInfo.id) {
              this.newsList[i] = responseData.data;
            }
          });
          this.newsUpdated.next({newsList: this.newsList, newsCount: this.newsCount});
          this.globalFunctions.showSnackBar("system.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  deleteNews(newsId: number) {
    this.http
      .delete<{ }>(
        'http://localhost:3000/admin/news/' + newsId
      )
      .subscribe({
        next: (data) => {
          const updatedNews = this.newsList.filter(news => news.id !== newsId);
          this.newsList = updatedNews;
          this.newsCount--;
          this.newsUpdated.next({newsList: this.newsList, newsCount: this.newsCount});
          this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }
}
