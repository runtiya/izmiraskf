import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { AboutITFFModel } from "../models/application-aboutizmirtff.model";

import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

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
      .get<{data: AboutITFFModel}>(
        environment.serverUrl + "tffiltemsilciligi/about-us"
      )
      .subscribe({
        next: (data) => {
          this.aboutContent = data.data;
          this.aboutContentSubject.next(this.aboutContent);
        },
        error: (error) => {
          this.aboutContentSubject.next(<AboutITFFModel>{});
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getAboutContentListener() {
    return this.aboutContentSubject.asObservable();
  }
}
