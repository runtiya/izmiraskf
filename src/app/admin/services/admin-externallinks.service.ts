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
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getExternalLinksUpdateListener() {
    return this.extLinksListSub.asObservable();
  }

  createLink(linkInfo: ExternalLinksModel) {
    const formData = new FormData();
    formData.append('image', linkInfo.imageAttachment);
    formData.append('requestData', JSON.stringify(linkInfo));

    this.http
      .post<{ data: ExternalLinksModel }>(
        'http://localhost:3000/admin/disbaglantilar', formData
      )
      .subscribe({
        next: (responseData) => {
          this.extLinksList.push(responseData.data);
          this.extLinksListSub.next([...this.extLinksList]);
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateLink(linkInfo: ExternalLinksModel) {
    const formData = new FormData();
    formData.append('image', linkInfo.imageAttachment);
    formData.append('requestData', JSON.stringify(linkInfo));

    this.http
      .put<{ data: ExternalLinksModel }>(
        'http://localhost:3000/admin/disbaglantilar/' + linkInfo.id, formData
      )
      .subscribe({
        next: (responseData) => {
          // Replace updated object with the old one
          this.extLinksList.forEach((item, i) => {
            if (item.id == linkInfo.id) {
              this.extLinksList[i] = responseData.data;
            }
          });
          this.extLinksListSub.next([...this.extLinksList]);
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  deleteLink(linkId: number) {
    this.http
      .delete<{ }>(
        'http://localhost:3000/admin/disbaglantilar/' + linkId
      )
      .subscribe({
        next: (data) => {
          const filteredLinksList = this.extLinksList.filter(link => link.id !== linkId);
          this.extLinksList = filteredLinksList;
          this.extLinksListSub.next([...this.extLinksList]);
          this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }
}
