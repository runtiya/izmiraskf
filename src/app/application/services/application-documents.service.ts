import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DocumentsModel } from "../models/application-documents.model";

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
        environment.serverUrl + "documents/" + category
      )
      .subscribe({
        next: (data) => {
          this.documentsList = data.data;
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
}
