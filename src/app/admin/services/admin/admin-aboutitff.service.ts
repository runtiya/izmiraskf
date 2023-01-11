import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { AboutITFFModel } from "../../models/admin-izmirtff.model";

@Injectable({providedIn: 'root'})
export class AboutITFFService {
  private aboutContent: AboutITFFModel;
  private aboutContentSubject = new Subject<AboutITFFModel>();

  constructor(private http: HttpClient) {}

  getAboutContent() {
    this.http
      .get<{error: boolean, message: string, aboutContent: AboutITFFModel}>(
        'http://localhost:3000/admin/izmirtffiltemsilciligi'
      )
      .subscribe((data) => {
        if (!data.error) {
          this.aboutContent = data.aboutContent;
          this.aboutContentSubject.next(this.aboutContent);
        }
        else {
          console.log('error: ' + data.error)
        }

      })
  }

  getAboutContentListener() {
    return this.aboutContentSubject.asObservable();
  }

  updateAboutContent(aboutContent: AboutITFFModel) {

    this.http
      .put<{error: boolean, message: string}>(
        'http://localhost:3000/admin/izmirtffiltemsilciligi', aboutContent
      )
      .subscribe((data) => {
        if (!data.error) {
          console.log(data.message);
          // Add Angular Component Snackbar OR Bootstrap Toasts
          this.aboutContentSubject.next(aboutContent);
        }
        else {
          null;

        }
      })
  }

}
