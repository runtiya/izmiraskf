import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { ExternalLinksModel } from "../models/admin-externallinks.model";

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
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.extLinksList = data.externalLinks;
              this.extLinksListSub.next([...this.extLinksList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getExternalLinksSubListener() {
    return this.extLinksListSub.asObservable();
  }

  createLink(linkInfo: ExternalLinksModel) {
    try {
      const formData = new FormData();
      formData.append('image', linkInfo.imageAttachment);
      formData.append('linkInfo', JSON.stringify(linkInfo));

      this.http
        .post<{error: boolean, message: string, linkId: number}>(
          'http://localhost:3000/admin/disbaglantilar', formData
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              linkInfo.id = data.linkId;
              this.extLinksList.push(linkInfo);
              this.extLinksListSub.next([...this.extLinksList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  updateLink(linkInfo: ExternalLinksModel) {
    try {
      const formData = new FormData();
      formData.append('image', linkInfo.imageAttachment);
      formData.append('linkInfo', JSON.stringify(linkInfo));

      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/disbaglantilar/' + linkInfo.id, formData
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              // Replace updated object with the old one
              this.extLinksList.forEach((item, i) => {
                if (item.id == linkInfo.id) {
                  this.extLinksList[i] = linkInfo;
                }
              });
              this.extLinksListSub.next([...this.extLinksList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  deleteLink(linkId: number) {
    try {
      this.http
        .delete<{error: boolean, message: string}>(
          'http://localhost:3000/admin/disbaglantilar/' + linkId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {

              const filteredLinksList = this.extLinksList.filter(link => link.id !== linkId);
              this.extLinksList = filteredLinksList;
              this.extLinksListSub.next([...this.extLinksList]);
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }
}
