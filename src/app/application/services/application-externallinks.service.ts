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
  private extAdvertisementListSub = new Subject<ExternalLinksModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getLinks(_linkType: string) {
    this.http
      .get<{data: ExternalLinksModel[]}>(
        'http://localhost:3000/external-links/' + _linkType
      )
      .subscribe({
        next: (data) => {
          this.extLinksList = data.data;
          if (_linkType === 'SOCIALMEDIA') {
            this.extLinksListSub.next([...this.extLinksList]);
          } else if (_linkType === 'RELATEDLINK') {
            this.extRelatedLinksListSub.next([...this.extLinksList]);
          } else if (_linkType === 'ADVERTISEMENT') {
            this.extAdvertisementListSub.next([...this.extLinksList]);
          }

        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getExternalLinksUpdateListener() {
    return this.extLinksListSub.asObservable();
  }

  getExternalRelatedLinksUpdateListener() {
    return this.extRelatedLinksListSub.asObservable();
  }

  getExternalAdvertisementUpdateListener() {
    return this.extAdvertisementListSub.asObservable();
  }
}
