import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { AboutIASKFModel } from "../models/application-aboutizmiraskf.model";

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
    this.http
      .get<{data: AboutIASKFModel}>(
        'http://localhost:3000/izmiraskf/hakkimizda'
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
}
