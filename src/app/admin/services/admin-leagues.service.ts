import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { LeaguesModel } from "../models/admin-leagues.model";

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
    try {
      this.http
        .get<{data: LeaguesModel[]}>(
          'http://localhost:3000/admin/ligler/' + seasonId
        )
        .subscribe({
          next: (data) => {
            this.leagueList = data.data;
            this.leagueListSub.next([...this.leagueList]);
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

  createLeague(leagueInfo: LeaguesModel) {
    try {
      this.http
        .post<{data: number}>(
          'http://localhost:3000/admin/ligler', leagueInfo
        )
        .subscribe({
          next: (data) => {
            leagueInfo.id = data.data;
            this.leagueList.push(leagueInfo);
            this.leagueListSub.next([...this.leagueList]);
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

  updateLeague(leagueInfo: LeaguesModel) {
    try {
      this.http
        .put<{ }>(
          'http://localhost:3000/admin/ligler/' + leagueInfo.id, leagueInfo
        )
        .subscribe({
          next: (data) => {
            // Replace updated object with the old one
            this.leagueList.forEach((item, i) => {
              if (item.id == leagueInfo.id) {
                this.leagueList[i] = leagueInfo;
              }
            });
            this.leagueListSub.next([...this.leagueList]);
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

  deleteLeague(leagueId: number) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/ligler/' + leagueId
        )
        .subscribe({
          next: (data) => {
            const filteredLeagueList = this.leagueList.filter(league => league.id !== leagueId);
            this.leagueList = filteredLeagueList;
            this.leagueListSub.next([...this.leagueList]);
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
