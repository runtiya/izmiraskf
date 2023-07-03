import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";
import { DatePipe } from "@angular/common";

import { NewsModel } from "../../models/admin-news.model";
import { NewsService } from "../../services/admin-news.service";
import { imageUploadValidator } from "../../validators/image-upload.validator";
import { globalFunctions } from "../../../functions/global.function";
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-admin-news-update-modal',
  templateUrl: './news-update.component.html',
  styleUrls: ['../../../app.component.css','./news-update.component.css']
})
export class AdminNewsUpdateModal {

  isLoading = false;
  newsUpdateForm: FormGroup;
  newsInfo = this.data.news;

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
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public newsService: NewsService,
    private _datePipe: DatePipe,
    private globalFunctions: globalFunctions
    ) {

  }


  ngOnInit() {
    this.newsUpdateForm = new FormGroup({
      id: new FormControl(this.newsInfo.id, {validators: []}),
      createdAt: new FormControl(this.newsInfo.createdAt, {validators: []}),
      createdBy: new FormControl(this.newsInfo.createdBy, {validators: []}),
      updatedAt: new FormControl(this.newsInfo.updatedAt, {validators: []}),
      updatedBy: new FormControl(this.newsInfo.updatedBy, {validators: []}),
      title: new FormControl(this.newsInfo.title, {validators: [Validators.required, Validators.maxLength(200)]}),
      content: new FormControl(this.newsInfo.content, {validators: [Validators.required, Validators.maxLength(65535)]}),
      imagePath: new FormControl(this.newsInfo.imagePath, {validators: []}),
      imageAttachment: new FormControl(null, {validators: [], asyncValidators: [imageUploadValidator]}),
      isVisible: new FormControl(!!this.newsInfo.isVisible, {validators: [Validators.required]})
    });

  }

  onFilePicked(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files[0];
      this.newsUpdateForm.patchValue({imageAttachment: file});
      this.newsUpdateForm.get('imageAttachment').updateValueAndValidity();
      const reader = new FileReader();
      reader.onloadend = () => {
        let _imagePath = this.newsUpdateForm.get('imageAttachment').valid ? reader.result as string : null;
        this.newsUpdateForm.get('imagePath').setValue(_imagePath);
      };
      reader.readAsDataURL(file);
    } catch (error) {

    }
  }

  filePickerRemove() {
    this.newsUpdateForm.get('imageAttachment').setValue(null);
    this.newsUpdateForm.get('imagePath').setValue(null);
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.newsService.deleteNews(id);
    this.isLoading = false;

  }

  onUpdateNews() {

    if (this.newsUpdateForm.valid) {
      this.isLoading = true;
      this.newsUpdateForm.get('updatedAt').setValue(this.globalFunctions.getTimeStamp());
      this.newsService.updateNews(this.newsUpdateForm.value);
      this.isLoading = false;
    } else {
      return null;
    }
  }

}
