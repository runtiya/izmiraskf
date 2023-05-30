import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { AboutIASKFModel } from "../models/admin-aboutizmiraskf.model";

@Injectable({providedIn: 'root'})
export class AboutIASKFService {
  private aboutContent: AboutIASKFModel;
  private aboutContentSubject = new Subject<AboutIASKFModel>();

  constructor(private http: HttpClient) {}

  getAboutContent() {
    this.http
      .get<{error: boolean, message: string, aboutContent: AboutIASKFModel}>(
        'http://localhost:3000/admin/izmiraskf/hakkimizda'
      )
      .subscribe({
        next: (data) => {
          if (!data.error) {
            this.aboutContent = data.aboutContent;
            this.aboutContentSubject.next(this.aboutContent);
          }
          else {

          }
        },
        error: (error) => {

        }
      });
  }

  getAboutContentListener() {
    return this.aboutContentSubject.asObservable();
  }

  updateAboutContent(aboutContent: AboutIASKFModel) {

    this.http
      .put<{error: boolean, message: string}>(
        'http://localhost:3000/admin/izmiraskf/hakkimizda', aboutContent
      )
      .subscribe({
        next: (data) => {
          if (!data.error) {

            // Add Angular Component Snackbar OR Bootstrap Toasts
            this.aboutContentSubject.next(aboutContent);
          }
          else {
            null;

          }
        },
        error: (error) => {

        }
      });
  }

}
