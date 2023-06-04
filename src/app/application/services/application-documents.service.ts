import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DocumentsModel } from "../models/application-documents.model";

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
}
