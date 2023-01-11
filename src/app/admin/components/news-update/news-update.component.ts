import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, public newsService: NewsService) {

  }


  ngOnInit() {
    this.newsUpdateForm = new FormGroup({
      id: new FormControl(this.data.id, {validators: []}),
      title: new FormControl(this.data.title, {validators: [Validators.required, Validators.maxLength(200)]}),
      content: new FormControl(this.data.content, {validators: [Validators.required, Validators.maxLength(2000)]}),
      newsImage: new FormControl(this.data.newsImage, {validators: [], asyncValidators: [imageUploadValidator]}),
      isOnline: new FormControl(this.data.isOnline, {validators: [Validators.required]})
    });

    console.log(this.data);
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
      this.newsService.updateNews(this.newsUpdateForm.value);
      this.isLoading = false;

    } else {
      return null;
    }
  }

}
