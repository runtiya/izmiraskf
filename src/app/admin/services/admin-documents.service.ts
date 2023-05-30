import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DocumentsModel } from "../models/admin-documents.model";

@Injectable({providedIn: 'root'})
export class DocumentsService {
  private documentsList: DocumentsModel[] = [];
  private documentsListSub = new Subject<DocumentsModel[]>();

  constructor(private http: HttpClient) {}

  getDocuments(documentType: string) {
    try {
      this.http
        .get<{error: boolean, message: string, documents: DocumentsModel[]}>(
          'http://localhost:3000/admin/documents/' + documentType
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.documentsList = data.documents;
              this.documentsListSub.next([...this.documentsList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getDocumentsListSubListener() {
    return this.documentsListSub.asObservable();
  }

  createDocument(documentInfo: DocumentsModel) {
    try {
      this.http
        .post<{error: boolean, message: string, documentId: number}>(
          'http://localhost:3000/admin/documents', documentInfo
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              documentInfo.id = data.documentId;
              this.documentsList.push(documentInfo);
              this.documentsListSub.next([...this.documentsList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  updateDocument(documentInfo: DocumentsModel) {
    try {
      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/documents/' + documentInfo.id, documentInfo
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              // Replace updated object with the old one
              this.documentsList.forEach((item, i) => {
                if (item.id == documentInfo.id) {
                  this.documentsList[i] = documentInfo;
                }
              });
              this.documentsListSub.next([...this.documentsList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  deleteDocument(documentId: number) {
    try {
      this.http
        .delete<{error: boolean, message: string}>(
          'http://localhost:3000/admin/documents/' + documentId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              const filteredDocumentsList = this.documentsList.filter(document => document.id !== documentId);
              this.documentsList = filteredDocumentsList;
              this.documentsListSub.next([...this.documentsList]);
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }
}
