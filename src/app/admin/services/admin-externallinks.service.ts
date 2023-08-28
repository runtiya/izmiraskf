import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { ExternalLinksModel } from "../models/admin-externallinks.model";
import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class ExternalLinksService {
  private extLinksList: ExternalLinksModel[] = [];
  private extLinksListSub = new Subject<ExternalLinksModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getLinks() {
    try {
      this.http
        .get<{data: ExternalLinksModel[]}>(
          'http://localhost:3000/admin/disbaglantilar'
        )
        .subscribe({
          next: (data) => {
            this.extLinksList = data.data;
            this.extLinksListSub.next([...this.extLinksList]);
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

  createLink(linkInfo: ExternalLinksModel) {
    try {
      const formData = new FormData();
      formData.append('image', linkInfo.imageAttachment);
      formData.append('linkInfo', JSON.stringify(linkInfo));

      this.http
        .post<{ data: ExternalLinksModel }>(
          'http://localhost:3000/admin/disbaglantilar', formData
        )
        .subscribe({
          next: (data) => {
            linkInfo = data.data;
            this.extLinksList.push(linkInfo);
            this.extLinksListSub.next([...this.extLinksList]);
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

  updateLink(linkInfo: ExternalLinksModel) {
    try {
      const formData = new FormData();
      formData.append('image', linkInfo.imageAttachment);
      formData.append('linkInfo', JSON.stringify(linkInfo));

      this.http
        .put<{ data: ExternalLinksModel }>(
          'http://localhost:3000/admin/disbaglantilar/' + linkInfo.id, formData
        )
        .subscribe({
          next: (data) => {
            // Replace updated object with the old one
            this.extLinksList.forEach((item, i) => {
              if (item.id == linkInfo.id) {
                this.extLinksList[i] = data.data;
              }
            });
            this.extLinksListSub.next([...this.extLinksList]);
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

  deleteLink(linkId: number) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/disbaglantilar/' + linkId
        )
        .subscribe({
          next: (data) => {
            const filteredLinksList = this.extLinksList.filter(link => link.id !== linkId);
            this.extLinksList = filteredLinksList;
            this.extLinksListSub.next([...this.extLinksList]);
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
