import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE }  from "@angular/material/core";

import { NewsModel } from "../../models/admin-news.model";
import { NewsService } from "../../services/admin/admin-news.service";
import { imageUploadValidator } from "../../validators/image-upload.validator";



@Component({
  selector: 'app-admin-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['../../../app.component.css', './news-create.component.css']
})
export class NewsCreateComponent {
  headerTitle = "HABER OLUŞTUR";
  isLoading = false;
  newsCreateForm: FormGroup;
  imagePreview: string;

  constructor(private dateAdapter: DateAdapter<Date>, public newsService: NewsService) {
    this.dateAdapter.setLocale('en-GB'); // dd/MM/yyyy
  }

  ngOnInit() {

    this.newsCreateForm = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.maxLength(200)]}),
      content: new FormControl(null, {validators: [Validators.required, Validators.maxLength(2000)]}),
      newsImage: new FormControl(null, {validators: [], asyncValidators: [imageUploadValidator]}),
      isOnline: new FormControl(true, {validators: [Validators.required]})
    });
    console.log(this.newsCreateForm.get('newsImage').valid);
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
      console.log(error);
    }

  }

  onClearNewsForm() {
    this.newsCreateForm.reset();
    this.imagePreview = null;
  }

  onAddNews() {

    if (this.newsCreateForm.valid) {
      /*
      const news: NewsModel = {
        id: 0,
        title: this.newsCreateForm.value.title,
        content: this.newsCreateForm.value.content,
        newsImage: this.newsCreateForm.value.newsImage,
        isOnline: this.newsCreateForm.value.isOnline
      };
      */

      this.isLoading = true;
      this.newsService.addNews(this.newsCreateForm.value);
      this.isLoading = false;

      this.onClearNewsForm();

    }
    else return;
  }

}
