import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { SeasonsModel } from "../models/application-seasons.model";

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
          'http://localhost:3000/sezonlar'
        )
        .subscribe({
          next: (data) => {
            this.seasonsList = data.seasonList;
            this.seasonsListSub.next([...this.seasonsList]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });

    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getSeasonsListUpdateListener() {
    return this.seasonsListSub.asObservable();
  }
}
