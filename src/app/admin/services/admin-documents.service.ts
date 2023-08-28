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
    try {
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
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getDocumentsListUpdateListener() {
    return this.documentsListSub.asObservable();
  }

  createDocument(documentInfo: DocumentsModel) {
    try {
      const formData = new FormData();
      formData.append('file', documentInfo.fileAttachment);
      formData.append('fileCategory', documentInfo.fileCategory);
      formData.append('documentInfo', JSON.stringify(documentInfo));

      this.http
        .post<{data: any}>(
          'http://localhost:3000/admin/dokumanlar/' + documentInfo.fileCategory, formData
        )
        .subscribe({
          next: (data) => {
            documentInfo.id = data.data.documentId;
            documentInfo.filePath = data.data.documentFilePath;
            this.documentsList.push(documentInfo);
            this.documentsListSub.next([...this.documentsList]);
            this.globalFunctions.showSnackBar("server.success");
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  updateDocument(documentInfo: DocumentsModel) {
    try {
      const formData = new FormData();
      formData.append('file', documentInfo.fileAttachment);
      formData.append('category', documentInfo.fileCategory);
      formData.append('documentInfo', JSON.stringify(documentInfo));

      this.http
        .put<{ data: any }>(
          'http://localhost:3000/admin/dokumanlar/' + documentInfo.fileCategory + '/' + documentInfo.id, formData
        )
        .subscribe({
          next: (data) => {
            documentInfo.filePath = data.data.documentFilePath;
            // Replace updated object with the old one
            this.documentsList.forEach((item, i) => {
              if (item.id == documentInfo.id) {
                this.documentsList[i] = documentInfo;
              }
            });

            this.documentsListSub.next([...this.documentsList]);
            this.globalFunctions.showSnackBar("server.success");
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  deleteDocument(documentId: number) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/dokumanlar/' + documentId
        )
        .subscribe({
          next: (data) => {
            const filteredDocumentsList = this.documentsList.filter(document => document.id !== documentId);
            this.documentsList = filteredDocumentsList;
            this.documentsListSub.next([...this.documentsList]);
            this.globalFunctions.showSnackBar("server.success");
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }
}
