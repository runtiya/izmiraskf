import { DatePipe } from "@angular/common";
import { Component, OnInit, OnDestroy, ViewChild, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE }  from "@angular/material/core";
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { NewsModel } from "../../models/admin-news.model";
import { NewsService } from "../../services/admin-news.service";
import { imageUploadValidator } from "../../validators/image-upload.validator";

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-admin-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['../../../app.component.css', './news-create.component.css']
})
export class AdminNewsCreateComponent implements OnInit, OnDestroy {
  headerTitle = "HABER OLUŞTUR";
  isLoading = false;
  newsCreateForm: FormGroup;
  imagePreview: string;

  newsContent = '';


  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '20rem',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
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
};


  constructor(
    private _dateAdapter: DateAdapter<Date>,
    private _datePipe: DatePipe,
    public newsService: NewsService,
    private sanitizer: DomSanitizer
    ) {}

  ngOnInit(): void {

    this.newsCreateForm = new FormGroup({
      createdAt: new FormControl(null, {validators: []}),
      createdBy: new FormControl(null, {validators: []}),
      updatedAt: new FormControl(null, {validators: []}),
      updatedBy: new FormControl(null, {validators: []}),
      title: new FormControl(null, {validators: [Validators.required, Validators.maxLength(200)]}),
      content: new FormControl(this.newsContent, {validators: [Validators.required, Validators.maxLength(65535)]}),
      newsImage: new FormControl(null, {validators: [], asyncValidators: [imageUploadValidator]}),
      isOnline: new FormControl(true, {validators: [Validators.required]})
    });

  }

  onFilePicked(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files[0];
      this.newsCreateForm.patchValue({newsImage: file});
      this.newsCreateForm.get('newsImage').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    } catch (error) {

    }

  }

  onClearNewsForm() {
    this.newsCreateForm.reset();
    this.imagePreview = null;
  }

  onAddNews() {

    if (this.newsCreateForm.valid) {
      this.isLoading = true;
      let createdAt = this._datePipe.transform((new Date), 'yyyy-MM-ddTHH:mm');
      this.newsCreateForm.get('createdAt').setValue(createdAt);
      this.newsService.addNews(this.newsCreateForm.value);
      this.isLoading = false;

      this.onClearNewsForm();

    } else {
      null;
    }

  }

  ngOnDestroy(): void {

  }

}
