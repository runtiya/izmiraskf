import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { AboutIASKFModel } from "../models/admin-aboutizmiraskf.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class AboutIASKFService {
  private aboutContent: AboutIASKFModel;
  private aboutContentSubject = new Subject<AboutIASKFModel>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getAboutContent() {
    try {
      this.http
        .get<{data: AboutIASKFModel}>(
          'http://localhost:3000/admin/izmiraskf/hakkimizda'
        )
        .subscribe({
          next: (data) => {
            this.aboutContent = data.data;
            this.aboutContentSubject.next(this.aboutContent);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }

  }

  getAboutContentListener() {
    return this.aboutContentSubject.asObservable();
  }

  updateAboutContent(aboutContent: AboutIASKFModel) {
    try {
      const formData = new FormData();
      formData.append('image', aboutContent.imageAttachment);
      formData.append('aboutContent', JSON.stringify(aboutContent));

      this.http
        .put<{ }>(
          'http://localhost:3000/admin/izmiraskf/hakkimizda', formData
        )
        .subscribe({
          next: (data) => {
            this.aboutContentSubject.next(aboutContent);
            this.globalFunctions.showSnackBar("server.success");
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

}
