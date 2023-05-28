import { Component, Inject, OnDestroy, OnInit, Input, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { NewsModel } from "../../models/admin-news.model";
import { NewsService } from "../../services/admin-news.service";
import { AdminNewsUpdateModal } from "../news-update/news-update.component";

import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon-list";

@Component({
  selector: 'app-admin-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['../../../app.component.css','./news-list.component.css']
})
export class AdminNewsListComponent implements OnInit, OnDestroy {
  title = "HABERLER";
  isLoading = false;
  newsList: NewsModel[] = [];
  private newsSub: Subscription;

  fontAwesomeIconList = fontAwesomeIconList;


  constructor(
    public newsService: NewsService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
    ) {}

  ngOnInit() {
    this.isLoading = true;
    this.newsService.getNews();
    this.newsSub = this.newsService.getNewsUpdateListener()
      .subscribe((data: NewsModel[]) => {
        // Sort data regarding the updateDate || createDate
        this.newsList = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        this.isLoading = false;
      });

  }

  onDelete(id: number) {
    this.isLoading = true;
    this.newsService.deleteNews(id);
    this.isLoading = false;
  }


  openEditDialog(news) {
    const dialogRef = this.dialog.open(AdminNewsUpdateModal, {
      data: {
        news: news
      }
    });
  }


  ngOnDestroy(): void {
    this.newsSub.unsubscribe();
  }

}
