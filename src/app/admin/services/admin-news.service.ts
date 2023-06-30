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
        .get<{error: boolean, message: string, news: NewsModel[]}>(
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
          if (!data.error) {
            this.newsList = data.news;
            this.newsUpdated.next([...this.newsList]);
          } else {
            this.newsList = [];
            this.newsUpdated.next([]);
          }

        },
        error: (error) => {

        }
       });
    } catch (error) {
      this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
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
        .post<{error: boolean, message: string, newsId: number}>(
          'http://localhost:3000/admin/haberler', formData
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              newsInfo.id = data.newsId;
              this.newsList.push(newsInfo);
              this.newsUpdated.next([...this.newsList]);
            } else {
              this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
    }
  }

  updateNews(newsInfo: NewsModel) {
    try {
      const formData = new FormData();
      formData.append('image', newsInfo.imageAttachment);
      formData.append('newsInfo', JSON.stringify(newsInfo));

      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/haberler/' + newsInfo.id, formData
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              // Add Angular Component Snackbar OR Bootstrap Toasts
              this.newsList.forEach((item, i) => {
                if (item.id == newsInfo.id) {
                  this.newsList[i] = newsInfo;
                }
              });
              this.newsUpdated.next([...this.newsList]);
            }
            else {
              this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
    }
  }

  deleteNews(newsId: number) {
    try {
      this.http
        .delete<{error: boolean, message: string}>(
          'http://localhost:3000/admin/haberler/' + newsId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              const updatedNews = this.newsList.filter(news => news.id !== newsId);
              this.newsList = updatedNews;
              this.newsUpdated.next([...this.newsList]);
            } else {
              this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
    }

  }
}
