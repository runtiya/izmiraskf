import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { ExternalLinksModel } from "../models/application-externallinks.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class ExternalLinksService {
  private extLinksList: ExternalLinksModel[] = [];
  private extLinksListSub = new Subject<ExternalLinksModel[]>();
  private extRelatedLinksListSub = new Subject<ExternalLinksModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getLinks(_linkType: string) {
    try {
      this.http
        .get<{externalLinks: ExternalLinksModel[]}>(
          'http://localhost:3000/disbaglantilar/' + _linkType
        )
        .subscribe({
          next: (data) => {
            this.extLinksList = data.externalLinks;
              if (_linkType == 'SOCIALMEDIA') {
                this.extLinksListSub.next([...this.extLinksList]);
              } else if(_linkType == 'RELATEDLINK') {
                this.extRelatedLinksListSub.next([...this.extLinksList]);
              }
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getExternalLinksUpdateListener() {
    return this.extLinksListSub.asObservable();
  }

  getExternalRelatedLinksUpdateListener() {
    return this.extRelatedLinksListSub.asObservable();
  }
}
