import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { AboutITFFModel } from "../models/admin-aboutizmirtff.model";

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
      .get<{ data: AboutITFFModel }>(
        environment.serverUrl + "admin/tffiltemsilciligi/about-us"
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
        environment.serverUrl + "admin/tffiltemsilciligi/about-us", formData
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
