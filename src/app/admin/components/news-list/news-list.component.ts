import { Component, Inject, OnDestroy, OnInit, Input, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PageEvent } from "@angular/material/paginator";

import { NewsModel } from "../../models/admin-news.model";
import { NewsService } from "../../services/admin-news.service";
import { AdminNewsUpdateModal } from "../news-update/news-update.component";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-admin-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['../../../app.component.css','./news-list.component.css']
})
export class AdminNewsList implements OnInit, OnDestroy {
  toolbarTitle = "HABERLER";
  isLoading: boolean = false;
  newsList: NewsModel[] = [];
  newsCount: number = 0;
  private newsSub: Subscription;
  paginationPageSizeOptions: Array<number> = this.globalFunctions.getPaginationPageSizeOptions();
  paginationPageSize: number = this.paginationPageSizeOptions[0];
  paginationCurrentPage: number = 1;

  constructor(
    private newsService: NewsService,
    private dialog: MatDialog,
    private globalFunctions: globalFunctions
    ) {}

  ngOnInit() {
    this.isLoading = true;
    this.newsService.getNews(this.paginationPageSize, this.paginationCurrentPage);
    this.newsSub = this.newsService.getNewsUpdateListener()
      .subscribe((data: {newsList: NewsModel[], newsCount: number}) => {
        this.newsList = data.newsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.newsCount = data.newsCount;
        this.isLoading = false;
      });

  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(AdminConfirmationDialogModal, {
      data: {
        title: 'İŞLEMİ ONAYLIYOR MUSUNUZ?',
        message: 'Bu işlem verilerinizi kalıcı olarak silecektir, işleminizi onaylıyor musunuz?'
      }
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.newsService.deleteNews(id);
          }
        }
      });
  }


  openEditDialog(news) {
    const dialogRef = this.dialog.open(AdminNewsUpdateModal, {
      data: {
        news: news
      }
    });
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  onChangePaginationPage(paginationData: PageEvent){
    this.newsService.getNews(paginationData.pageSize, paginationData.pageIndex + 1);
  }


  ngOnDestroy(): void {
    this.newsSub.unsubscribe();
  }

}
