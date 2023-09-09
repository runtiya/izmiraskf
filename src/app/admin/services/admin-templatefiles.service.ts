import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { TemplateFilesModel } from "../models/admin-templatefiles.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class TemplateFilesService {
  private templateFilesList: TemplateFilesModel[] = [];
  private templateFilesListSub = new Subject<TemplateFilesModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getTemplateFiles() {
    try {
      this.http
        .get<{data: TemplateFilesModel[]}>(
          'http://localhost:3000/admin/template-files'
        )
        .subscribe({
          next: (data) => {
            this.templateFilesList = data.data;
            this.templateFilesListSub.next([...this.templateFilesList]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar(error);
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getDocumentsListUpdateListener() {
    return this.templateFilesListSub.asObservable();
  }

  updateDocument(templateFileInfo: TemplateFilesModel) {
    const formData = new FormData();
    formData.append('file', templateFileInfo.fileAttachment);
    formData.append('category', 'TEMPLATEFILES');
    formData.append('requstData', JSON.stringify(templateFileInfo));

    this.http
      .put<{ data: TemplateFilesModel }>(
        'http://localhost:3000/admin/template-files/' + templateFileInfo.id, formData
      )
      .subscribe({
        next: (responseData) => {
          // Replace updated object with the old one
          this.templateFilesList.forEach((item, i) => {
            if (item.id == templateFileInfo.id) {
              this.templateFilesList[i] = responseData.data;
            }
          });
          this.templateFilesListSub.next([...this.templateFilesList]);
          this.globalFunctions.showSnackBar("system.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

}
