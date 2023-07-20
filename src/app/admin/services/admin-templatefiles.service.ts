import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { TemplateFilesModel } from "../models/admin-templatefiles.model";

@Injectable({providedIn: 'root'})
export class TemplateFilesService {
  private templateFilesList: TemplateFilesModel[] = [];
  private templateFilesListSub = new Subject<TemplateFilesModel[]>();

  constructor(private http: HttpClient) {}

  getTemplateFiles() {
    try {
      this.http
        .get<{error: boolean, message: string, templateFilesList: TemplateFilesModel[]}>(
          'http://localhost:3000/admin/template-files'
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.templateFilesList = data.templateFilesList;
              this.templateFilesListSub.next([...this.templateFilesList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getDocumentsListUpdateListener() {
    return this.templateFilesListSub.asObservable();
  }

  updateDocument(templateFileInfo: TemplateFilesModel) {
    try {
      const formData = new FormData();
      formData.append('file', templateFileInfo.fileAttachment);
      formData.append('category', 'TEMPLATEFILES');
      formData.append('templateFileInfo', JSON.stringify(templateFileInfo));

      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/template-files/' + templateFileInfo.id, formData
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              // Replace updated object with the old one
              this.templateFilesList.forEach((item, i) => {
                if (item.id == templateFileInfo.id) {
                  this.templateFilesList[i] = templateFileInfo;
                }
              });
              this.templateFilesListSub.next([...this.templateFilesList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

}
