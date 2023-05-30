import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { AboutIASKFModel } from "../models/application-aboutizmiraskf.model";

@Injectable({providedIn: 'root'})
export class AboutIASKFService {
  private aboutContent: AboutIASKFModel;
  private aboutContentSubject = new Subject<AboutIASKFModel>();

  constructor(
    private http: HttpClient
  ) {}

  getAboutContent() {
    this.http
      .get<{error: boolean, message: string, aboutContent: AboutIASKFModel}>(
        'http://localhost:3000/izmiraskf/hakkimizda'
      )
      .subscribe({
        next: (data) => {
          if (!data.error) {
            this.aboutContent = data.aboutContent;
            this.aboutContentSubject.next(this.aboutContent);
          } else {

          }
        },
        error: (error) => {

        }
      });
  }

  getAboutContentListener() {
    return this.aboutContentSubject.asObservable();
  }
}
