import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { SeasonsModel } from "../models/application-seasons.model";

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
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.seasonsList = data.seasonList;
              this.seasonsListSub.next([...this.seasonsList]);
            } else {

            }
          },
          error: (error) => {

          }
        });

    } catch (error) {

    }
  }

  getSeasonsListSubListener() {
    return this.seasonsListSub.asObservable();
  }
}
