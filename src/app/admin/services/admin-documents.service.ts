import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DocumentsModel } from "../models/admin-documents.model";
import { globalFunctions } from "../../functions/global.function";

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
        'http://localhost:3000/admin/dokumanlar/' + category
      )
      .subscribe({
        next: (data) => {
          this.documentsList = data.data;
          this.documentsListSub.next([...this.documentsList]);
        },
        error: (error) => {
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
        'http://localhost:3000/admin/dokumanlar/' + documentInfo.fileCategory, formData
      )
      .subscribe({
        next: (responseData) => {
          this.documentsList.push(responseData.data);
          this.documentsListSub.next([...this.documentsList]);
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          console.log(error)
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
        'http://localhost:3000/admin/dokumanlar/' + documentInfo.fileCategory + '/' + documentInfo.id, formData
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
        'http://localhost:3000/admin/dokumanlar/' + documentId
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
