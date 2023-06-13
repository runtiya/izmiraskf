import { DatePipe } from "@angular/common";
import { Component, OnInit, OnDestroy, ViewChild, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE }  from "@angular/material/core";
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from "@angular/router";

import { NewsModel } from "../../models/application-news.model";
import { NewsService } from "../../services/application-news.service";

import { globalFunctions } from "../../../functions/global.function";

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-application-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['../../../app.component.css', './news-details.component.css']
})
export class ApplicationNewsDetails implements OnInit, OnDestroy {
  isLoading = false;
  toolbarTitle = "HABER DETAYLARI";
  news: NewsModel = <NewsModel>{};
  private newsSub: Subscription;
  url_newsId: number;
  newsForm: FormGroup;

  editorConfig: AngularEditorConfig = {
    editable: false,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: false,
      showToolbar: false,
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['backgroundColor']
    ]
  }

  constructor(
    private router: ActivatedRoute,
    private newsService: NewsService,
    private _dateAdapter: DateAdapter<Date>,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.newsForm = new FormGroup({
      createdAt: new FormControl(null, {validators: []}),
      title: new FormControl(null, {validators: []}),
      content: new FormControl(null, {validators: []}),
    });

    this.router.paramMap
      .subscribe(params => {
        this.url_newsId = Number(params.get('id'));
        this.newsService.getNewsById(this.url_newsId);
        this.newsSub = this.newsService.getNewsByIdUpdateListener()
          .subscribe({
            next: (data) => {
              this.news = data;

              this.newsForm.get('createdAt').setValue(this.news.createdAt);
              this.newsForm.get('title').setValue(this.news.title);
              this.newsForm.get('content').setValue(this.news.content);
            },
            error: (error) => {

            }
          });
      });
  }

  ngOnDestroy(): void {
    this.newsSub.unsubscribe();
  }
}

