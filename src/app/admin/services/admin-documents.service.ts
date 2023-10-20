import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DocumentsModel } from "../models/admin-documents.model";
import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class DocumentsService {
  private documentsList: DocumentsModel[] = [];
  private documentsListSub = new Subject<DocumentsModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getDocuments(category: string) {
    this.http
      .get<{data: DocumentsModel[]}>(
        environment.serverUrl + "admin/documents/" + category
      )
      .subscribe({
        next: (responseData) => {
          this.documentsList = responseData.data;
          this.documentsListSub.next([...this.documentsList]);
        },
        error: (error) => {
          this.documentsListSub.next(<DocumentsModel[]>{});
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getDocumentsListUpdateListener() {
    return this.documentsListSub.asObservable();
  }

  createDocument(documentInfo: DocumentsModel) {
    const formData = new FormData();
    formData.append('file', documentInfo.fileAttachment);
    formData.append('fileCategory', documentInfo.fileCategory);
    formData.append('requestData', JSON.stringify(documentInfo));

    this.http
      .post<{data: DocumentsModel}>(
        environment.serverUrl + "admin/documents/" + documentInfo.fileCategory, formData
      )
      .subscribe({
        next: (responseData) => {
          this.documentsList.push(responseData.data);
          this.documentsListSub.next([...this.documentsList]);
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateDocument(documentInfo: DocumentsModel) {
    const formData = new FormData();
    formData.append('file', documentInfo.fileAttachment);
    formData.append('category', documentInfo.fileCategory);
    formData.append('requestData', JSON.stringify(documentInfo));

    this.http
      .put<{ data: DocumentsModel }>(
        environment.serverUrl + "admin/documents/" + documentInfo.fileCategory + '/' + documentInfo.id, formData
      )
      .subscribe({
        next: (responseData) => {
          // Replace updated object with the old one
          this.documentsList.forEach((item, i) => {
            if (item.id == documentInfo.id) {
              this.documentsList[i] = responseData.data;
            }
          });

          this.documentsListSub.next([...this.documentsList]);
          this.globalFunctions.showSnackBar("system.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  deleteDocument(documentId: number) {
    this.http
      .delete<{ }>(
        environment.serverUrl + "admin/documents/" + documentId
      )
      .subscribe({
        next: (data) => {
          const filteredDocumentsList = this.documentsList.filter(document => document.id !== documentId);
          this.documentsList = filteredDocumentsList;
          this.documentsListSub.next([...this.documentsList]);
          this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }
}
