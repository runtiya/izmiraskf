import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { SeasonsModel } from "../models/admin-seasons.model";
import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class SeasonsService {
  private seasonsList: SeasonsModel[] = [];
  private seasonsListSub = new Subject<SeasonsModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getSeasons() {
    try {
      this.http
        .get<{seasonList: SeasonsModel[]}>(
          'http://localhost:3000/admin/sezonlar'
        )
        .subscribe({
          next: (data) => {
            this.seasonsList = data.seasonList;
            this.seasonsListSub.next([...this.seasonsList]);
          },
          error: (error) => {

          }
        });

    } catch (error) {

    }
  }

  getSeasonsListUpdateListener() {
    return this.seasonsListSub.asObservable();
  }

  createSeason(seasonInfo: SeasonsModel) {
    try {
      this.http
        .post<{seasonId: number}>(
          'http://localhost:3000/admin/sezonlar', seasonInfo
        )
        .subscribe({
          next: (data) => {
            seasonInfo.id = data.seasonId;
            this.seasonsList.push(seasonInfo);
            this.seasonsListSub.next([...this.seasonsList]);
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

  updateSeason(seasonInfo: SeasonsModel) {
    try {
      this.http
        .put<{ }>(
          'http://localhost:3000/admin/sezonlar/' + seasonInfo.id, seasonInfo
        )
        .subscribe({
          next: (data) => {
            // Replace updated object with the old one
            this.seasonsList.forEach((item, i) => {
              if (item.id == seasonInfo.id) {
                this.seasonsList[i] = seasonInfo;
              }
            });
            this.seasonsListSub.next([...this.seasonsList]);
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

  deleteSeason(seasonId: number) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/sezonlar/' + seasonId
        )
        .subscribe({
          next: (data) => {
            const filteredSeasonsList = this.seasonsList.filter(season => season.id !== seasonId);
            this.seasonsList = filteredSeasonsList;
            this.seasonsListSub.next([...this.seasonsList]);
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
