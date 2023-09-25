import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { LeaguesModel } from "../models/application-leagues.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class LeaguesService {
  private leagueList: LeaguesModel[] = [];
  private leagueListSub = new Subject<LeaguesModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getLeagues(seasonId: number) {
    this.http
      .get<{data: LeaguesModel[]}>(
        'http://localhost:3000/leagues/' + seasonId
      )
      .subscribe({
        next: (data) => {
          this.leagueList = data.data;
          this.leagueListSub.next([...this.leagueList]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getLeagueListUpdateListener() {
    return this.leagueListSub.asObservable();
  }
}
