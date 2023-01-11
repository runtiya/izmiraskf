import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";


import { NewsModel } from "../../models/admin-news.model";


@Injectable({providedIn: 'root'})
export class NewsService {
  private newsList: NewsModel[] = [];
  private newsUpdated = new Subject<NewsModel[]>();



  constructor(private http: HttpClient, private router: Router) {}

  getNews() {
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
                title: newsObj.title,
                content: newsObj.content,
                newsImage: newsObj.img,
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
  }


  getNewsUpdateListener() {
    return this.newsUpdated.asObservable();
  }


  addNews(news: NewsModel) {

    this.http
      .post<{error: boolean, message: string, newsId: number}>(
        'http://localhost:3000/admin/haberler', news
      )
      .subscribe((data) => {
        console.log(data.message);
        // Add Angular Component Snackbar OR Bootstrap Toasts
        const createdNewsId = data.newsId;
        news.id = createdNewsId;
        this.newsList.push(news);
        this.newsUpdated.next([...this.newsList]);
      });

  }


  deleteNews(newsId: number) {
     this.http
      .delete<{error: boolean, message: string}>(
        'http://localhost:3000/admin/haberler/' + newsId
      )
      .subscribe((data) => {
        console.log(data.message);
        const updatedNews = this.newsList.filter(news => news.id !== newsId);
        this.newsList = updatedNews;
        this.newsUpdated.next([...this.newsList]);
      });
  }


  updateNews(news: NewsModel) {

    this.http
      .put<{error: boolean, message: string}>(
        'http://localhost:3000/admin/haberler/' + news.id, news
      )
      .subscribe((data) => {
        if (!data.error) {
          // Add Angular Component Snackbar OR Bootstrap Toasts
          this.newsList.forEach((item, i) => {
            if (item.id == news.id) {
              this.newsList[i] = news;
            }
          });
          this.newsUpdated.next([...this.newsList]);
        }
        else {
          null;
        }

      });
  }

}
