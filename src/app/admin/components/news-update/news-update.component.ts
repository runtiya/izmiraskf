import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";
import { DatePipe } from "@angular/common";

import { NewsModel } from "../../models/admin-news.model";
import { NewsService } from "../../services/admin/admin-news.service";
import { imageUploadValidator } from "../../validators/image-upload.validator";



@Component({
  selector: 'app-admin-news-update-modal',
  templateUrl: './news-update.component.html',
  styleUrls: ['../../../app.component.css','./news-update.component.css']
})
export class NewsUpdateModal {

  isLoading = false;
  newsUpdateForm: FormGroup;
  imagePreview: string;
  newsInfo = this.data.news;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data, 
    public newsService: NewsService,
    private _datePipe: DatePipe
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
      content: new FormControl(this.newsInfo.content, {validators: [Validators.required, Validators.maxLength(2000)]}),
      newsImage: new FormControl(this.newsInfo.newsImage, {validators: [], asyncValidators: [imageUploadValidator]}),
      isOnline: new FormControl(this.newsInfo.isOnline, {validators: [Validators.required]})
    });

  }

  onFilePicked(event: Event) {
    try {

      const file = (event.target as HTMLInputElement).files[0];
      this.newsUpdateForm.patchValue({newsImage: file});
      this.newsUpdateForm.get('newsImage').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    } catch (error) {

    }

  }

  onDelete(id: number) {
    this.isLoading = true;
    this.newsService.deleteNews(id);
    this.isLoading = false;

  }


  onUpdateNews() {

    if (this.newsUpdateForm.valid) {

      this.isLoading = true;
      let updatedAt = this._datePipe.transform((new Date), 'yyyy-MM-ddTHH:mm');
      this.newsUpdateForm.get('updatedAt').setValue(updatedAt);
      this.newsService.updateNews(this.newsUpdateForm.value);
      this.isLoading = false;

    } else {
      return null;
    }
  }

}
