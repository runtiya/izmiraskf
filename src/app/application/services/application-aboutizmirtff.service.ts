import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { AboutITFFModel } from "../models/application-aboutizmirtff.model";

@Injectable({providedIn: 'root'})
export class AboutITFFService {
  private aboutContent: AboutITFFModel;
  private aboutContentSubject = new Subject<AboutITFFModel>();

  constructor(
    private http: HttpClient
  ) {}

  getAboutContent() {
    this.http
      .get<{error: boolean, message: string, aboutContent: AboutITFFModel}>(
        'http://localhost:3000/tffiltemsilciligi/hakkimizda'
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
