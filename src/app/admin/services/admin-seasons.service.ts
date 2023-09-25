import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { SeasonsModel } from "../models/admin-seasons.model";
import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class SeasonsService {
  private seasonsList: SeasonsModel[] = [];
  private seasonsListSub = new Subject<SeasonsModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getSeasons() {
    this.http
      .get<{data: SeasonsModel[]}>(
        environment.serverUrl + "admin/seasons"
      )
      .subscribe({
        next: (data) => {
          this.seasonsList = data.data;
          this.seasonsListSub.next([...this.seasonsList]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getSeasonsListUpdateListener() {
    return this.seasonsListSub.asObservable();
  }

  createSeason(seasonInfo: SeasonsModel) {
    const requestData = seasonInfo;
    this.http
      .post<{data: SeasonsModel}>(
        environment.serverUrl + "admin/seasons", requestData
      )
      .subscribe({
        next: (responseData) => {
          this.seasonsList.push(responseData.data);
          this.seasonsListSub.next([...this.seasonsList]);
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateSeason(seasonInfo: SeasonsModel) {
    const requestData = seasonInfo;
    this.http
      .put<{data: SeasonsModel}>(
        environment.serverUrl + "admin/seasons/" + requestData.id, requestData
      )
      .subscribe({
        next: (responseData) => {
          // Replace updated object with the old one
          this.seasonsList.forEach((item, i) => {
            if (item.id == requestData.id) {
              this.seasonsList[i] = responseData.data;
            }
          });
          this.seasonsListSub.next([...this.seasonsList]);
          this.globalFunctions.showSnackBar("system.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  deleteSeason(seasonId: number) {
    this.http
      .delete<{ }>(
        environment.serverUrl + "admin/seasons/" + seasonId
      )
      .subscribe({
        next: (data) => {
          const filteredSeasonsList = this.seasonsList.filter(season => season.id !== seasonId);
          this.seasonsList = filteredSeasonsList;
          this.seasonsListSub.next([...this.seasonsList]);
          this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }
}
