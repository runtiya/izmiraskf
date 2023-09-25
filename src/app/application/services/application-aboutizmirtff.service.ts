import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { AboutITFFModel } from "../models/application-aboutizmirtff.model";

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
      .get<{data: AboutITFFModel}>(
        'http://localhost:3000/tffiltemsilciligi/about-us'
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
