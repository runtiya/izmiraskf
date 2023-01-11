import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { ExternalLinksModel } from "../../models/admin-externallinks.model";

@Injectable({providedIn: 'root'})
export class ExternalLinksService {
  private extLinksList: ExternalLinksModel[] = [];
  private extLinksListSub = new Subject<ExternalLinksModel[]>();

  constructor(private http: HttpClient) {}

  getLinks() {
    try {
      this.http
        .get<{error: boolean, message: string, externalLinks: ExternalLinksModel[]}>(
          'http://localhost:3000/admin/disbaglantilar'
        )
        .subscribe((data) => {
          if (!data.error) {
            this.extLinksList = data.externalLinks;
            this.extLinksListSub.next([...this.extLinksList]);
          } else {
            console.log(data.message);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  getExternalLinksSubListener() {
    return this.extLinksListSub.asObservable();
  }

  createLink(linkInfo: ExternalLinksModel) {
    try {
      this.http
        .post<{error: boolean, message: string, linkId: number}>(
          'http://localhost:3000/admin/disbaglantilar', linkInfo
        )
        .subscribe((data) => {
          if (!data.error) {
            console.log(data.message);
            console.log(data.linkId);
            linkInfo.id = data.linkId;
            this.extLinksList.push(linkInfo);
            this.extLinksListSub.next([...this.extLinksList]);
          } else {
            console.log(data.message);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  updateLink(linkInfo: ExternalLinksModel) {
    try {
      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/disbaglantilar/' + linkInfo.id, linkInfo
        )
        .subscribe((data) => {
          if (!data.error) {
            // Replace updated object with the old one
            this.extLinksList.forEach((item, i) => {
              if (item.id == linkInfo.id) {
                this.extLinksList[i] = linkInfo;
              }
            });
            this.extLinksListSub.next([...this.extLinksList]);
          } else {
            console.log(data.message);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  deleteLink(linkId: number) {
    try {
      this.http
        .delete<{error: boolean, message: string}>(
          'http://localhost:3000/admin/disbaglantilar/' + linkId
        )
        .subscribe((data) => {
          if (!data.error) {
            console.log(data.message);
            const filteredLinksList = this.extLinksList.filter(link => link.id !== linkId);
            this.extLinksList = filteredLinksList;
            this.extLinksListSub.next([...this.extLinksList]);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }
}
