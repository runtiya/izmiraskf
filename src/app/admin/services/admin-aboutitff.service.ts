import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { AboutITFFModel } from "../models/admin-aboutizmirtff.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class AboutITFFService {
  private aboutContent: AboutITFFModel;
  private aboutContentSubject = new Subject<AboutITFFModel>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getAboutContent() {
    this.http
      .get<{ data: AboutITFFModel }>(
        'http://localhost:3000/admin/tffiltemsilciligi/hakkimizda'
      )
      .subscribe({
        next: (data) => {
          this.aboutContent = data.data;
          this.aboutContentSubject.next(this.aboutContent);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });

  }

  getAboutContentListener() {
    return this.aboutContentSubject.asObservable();
  }

  updateAboutContent(aboutContent: AboutITFFModel) {
    const formData = new FormData();
    formData.append('image', aboutContent.imageAttachment);
    formData.append('requestData', JSON.stringify(aboutContent));

    this.http
      .put<{ data: AboutITFFModel }>(
        'http://localhost:3000/admin/tffiltemsilciligi/hakkimizda', formData
      )
      .subscribe({
        next: (responseData) => {
          this.aboutContentSubject.next(responseData.data);
          this.globalFunctions.showSnackBar("system.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });

  }

}
