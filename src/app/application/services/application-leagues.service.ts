import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { LeaguesModel } from "../models/application-leagues.model";

@Injectable({providedIn: 'root'})
export class LeaguesService {
  private leagueList: LeaguesModel[] = [];
  private leagueListSub = new Subject<LeaguesModel[]>();

  constructor(private http: HttpClient) {}

  getLeagues(seasonId: number) {
    try {
      this.http
        .get<{error: boolean, message: string, leagueList: LeaguesModel[]}>(
          'http://localhost:3000/ligler/' + seasonId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.leagueList = data.leagueList;
              this.leagueListSub.next([...this.leagueList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getLeagueListUpdateListener() {
    return this.leagueListSub.asObservable();
  }
}
