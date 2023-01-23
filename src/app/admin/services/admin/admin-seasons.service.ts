import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { SeasonsModel } from "../../models/admin-seasons.model";

@Injectable({providedIn: 'root'})
export class SeasonsService {
  private seasonsList: SeasonsModel[] = [];
  private seasonsListSub = new Subject<SeasonsModel[]>();

  constructor(private http: HttpClient) {}

  getSeasons() {
    try {
      this.http
        .get<{error: boolean, message: string, seasonList: SeasonsModel[]}>(
          'http://localhost:3000/admin/sezonlar'
        )
        .subscribe((data) => {
          if (!data.error) {
            this.seasonsList = data.seasonList;
            this.seasonsListSub.next([...this.seasonsList]);
          } else {
            console.log(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  getSeasonsListSubListener() {
    return this.seasonsListSub.asObservable();
  }

  createSeason(seasonInfo: SeasonsModel) {
    try {
      this.http
        .post<{error: boolean, message: string, seasonId: number}>(
          'http://localhost:3000/admin/sezonlar', seasonInfo
        )
        .subscribe((data) => {
          if (!data.error) {
            seasonInfo.id = data.seasonId;
            this.seasonsList.push(seasonInfo);
            this.seasonsListSub.next([...this.seasonsList]);
          } else {
            console.log(data.message);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  updateSeason(seasonInfo: SeasonsModel) {
    try {
      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/sezonlar/' + seasonInfo.id, seasonInfo
        )
        .subscribe((data) => {
          if (!data.error) {
            // Replace updated object with the old one
            this.seasonsList.forEach((item, i) => {
              if (item.id == seasonInfo.id) {
                this.seasonsList[i] = seasonInfo;
                console.log(item)
              }
            });
            this.seasonsListSub.next([...this.seasonsList]);
          } else {
            console.log(data.message);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  deleteSeason(seasonId: number) {
    try {
      this.http
        .delete<{error: boolean, message: string}>(
          'http://localhost:3000/admin/sezonlar/' + seasonId
        )
        .subscribe((data) => {
          if (!data.error) {
            const filteredSeasonsList = this.seasonsList.filter(season => season.id !== seasonId);
            this.seasonsList = filteredSeasonsList;
            this.seasonsListSub.next([...this.seasonsList]);
          } else {
            console.log(data.message);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }
}
