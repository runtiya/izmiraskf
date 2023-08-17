import { DatePipe } from "@angular/common";
import { Component, OnInit, OnDestroy, ViewChild, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE }  from "@angular/material/core";
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { NewsModel } from "../../models/admin-news.model";
import { NewsService } from "../../services/admin-news.service";
import { imageUploadValidator } from "../../validators/image-upload.validator";

import { globalFunctions } from "../../../functions/global.function";
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-admin-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['../../../app.component.css', './news-create.component.css']
})
export class AdminNewsCreate implements OnInit, OnDestroy {
  toolbarTitle = "HABER OLUŞTUR";
  isLoading: boolean = false;
  newsCreateForm: FormGroup;

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
    private sanitizer: DomSanitizer,
    private globalFunctions: globalFunctions
    ) {}

  ngOnInit(): void {
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.newsCreateForm = new FormGroup({
      createdAt: new FormControl(null, {validators: []}),
      createdBy: new FormControl(null, {validators: []}),
      updatedAt: new FormControl(null, {validators: []}),
      updatedBy: new FormControl(null, {validators: []}),
      title: new FormControl(null, {validators: [Validators.required, Validators.maxLength(200)]}),
      content: new FormControl(this.newsContent, {validators: [Validators.required, Validators.maxLength(65535)]}),
      imagePath: new FormControl(null, {validators: []}),
      imageAttachment: new FormControl(null, {validators: [], asyncValidators: [imageUploadValidator]}),
      isVisible: new FormControl(true, {validators: [Validators.required]})
    });

  }

  onFilePicked(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files[0];
      this.newsCreateForm.patchValue({imageAttachment: file});
      this.newsCreateForm.get('imageAttachment').updateValueAndValidity();
      const reader = new FileReader();
      reader.onloadend = () => {
        let _imagePath = this.newsCreateForm.get('imageAttachment').valid ? reader.result as string : null;
        this.newsCreateForm.get('imagePath').setValue(_imagePath);
      };
      reader.readAsDataURL(file);
    } catch (error) {

    }
  }

  filePickerRemove() {
    this.newsCreateForm.get('imageAttachment').setValue(null);
    this.newsCreateForm.get('imagePath').setValue(null);
  }

  onClearNewsForm() {
    this.newsCreateForm.reset();
    this.newsCreateForm.get('imageAttachment').setValue(null);
    this.newsCreateForm.get('imagePath').setValue(null);
  }

  onCreateNews() {

    if (this.newsCreateForm.valid) {
      this.isLoading = true;
      this.newsService.createNews(this.newsCreateForm.value);
      this.isLoading = false;

      this.onClearNewsForm();

    } else {
      null;
    }

  }

  ngOnDestroy(): void {

  }

}
