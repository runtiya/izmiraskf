import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from '@angular/material/dialog';

import { NewsModel } from "../../models/admin-news.model";
import { NewsService } from "../../services/admin/admin-news.service";
import { NewsUpdateModal } from "../news-update/news-update.component";
import { NgForm } from "@angular/forms";
import { style } from "@angular/animations";



@Component({
  selector: 'app-admin-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['../../../app.component.css','./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {
  title = "HABERLER";
  isLoading = false;
  newsList: NewsModel[] = [];
  private newsSub: Subscription;

  constructor(public newsService: NewsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = true;
    this.newsService.getNews();
    this.newsSub = this.newsService.getNewsUpdateListener()
      .subscribe((data: NewsModel[]) => {
        // Sort data regarding the updateDate || createDate
        this.newsList = data;
        this.isLoading = false;
      });

  }

  onDelete(id: number) {
    this.isLoading = true;
    this.newsService.deleteNews(id);
    this.isLoading = false;
  }

  openEditDialog(news) {
    const dialogRef = this.dialog.open(NewsUpdateModal, {
      data: {
        id: news.id,
        title: news.title,
        content: news.content,
        newsImage: news.newsImage,
        isOnline: news.isOnline
      }
    });
  }


  ngOnDestroy(): void {
    this.newsSub.unsubscribe();
  }

}
