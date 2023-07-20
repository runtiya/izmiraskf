import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { ExternalLinksModel } from "../models/application-externallinks.model";

@Injectable({providedIn: 'root'})
export class ExternalLinksService {
  private extLinksList: ExternalLinksModel[] = [];
  private extLinksListSub = new Subject<ExternalLinksModel[]>();
  private extRelatedLinksListSub = new Subject<ExternalLinksModel[]>();

  constructor(private http: HttpClient) {}

  getLinks(_linkType: string) {
    try {
      this.http
        .get<{error: boolean, message: string, externalLinks: ExternalLinksModel[]}>(
          'http://localhost:3000/disbaglantilar/' + _linkType
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.extLinksList = data.externalLinks;
              if (_linkType == 'SOCIALMEDIA') {
                this.extLinksListSub.next([...this.extLinksList]);
              } else if(_linkType == 'RELATEDLINK') {
                this.extRelatedLinksListSub.next([...this.extLinksList]);
              }

            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getExternalLinksUpdateListener() {
    return this.extLinksListSub.asObservable();
  }

  getExternalRelatedLinksUpdateListener() {
    return this.extRelatedLinksListSub.asObservable();
  }
}
