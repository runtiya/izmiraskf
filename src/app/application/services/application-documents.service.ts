import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DocumentsModel } from "../models/application-documents.model";

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
        .get<{documentsList: DocumentsModel[]}>(
          'http://localhost:3000/dokumanlar/' + category
        )
        .subscribe({
          next: (data) => {
            this.documentsList = data.documentsList;
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
}
