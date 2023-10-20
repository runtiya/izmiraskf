import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { AboutIASKFModel } from "../models/admin-aboutizmiraskf.model";

import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

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
      .get<{ data: AboutIASKFModel }>(
        environment.serverUrl + "admin/izmiraskf/about-us"
      )
      .subscribe({
        next: (data) => {
          this.aboutContent = data.data;
          this.aboutContentSubject.next(this.aboutContent);
        },
        error: (error) => {
          this.aboutContentSubject.next(<AboutIASKFModel>{});
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getAboutContentListener() {
    return this.aboutContentSubject.asObservable();
  }

  updateAboutContent(aboutContent: AboutIASKFModel) {
    const formData = new FormData();
    formData.append('image', aboutContent.imageAttachment);
    formData.append('requestData', JSON.stringify(aboutContent));

    this.http
      .put<{ data: AboutIASKFModel }>(
        environment.serverUrl + "admin/izmiraskf/about-us", formData
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
