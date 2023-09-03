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
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getLeagueListUpdateListener() {
    return this.leagueListSub.asObservable();
  }

  createLeague(leagueInfo: LeaguesModel) {
    this.http
      .post<{ data: LeaguesModel }>(
        'http://localhost:3000/admin/ligler', leagueInfo
      )
      .subscribe({
        next: (data) => {
          this.leagueList.push(data.data);
          this.leagueListSub.next([...this.leagueList]);
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateLeague(leagueInfo: LeaguesModel) {
    this.http
      .put<{ data: LeaguesModel }>(
        'http://localhost:3000/admin/ligler/' + leagueInfo.id, leagueInfo
      )
      .subscribe({
        next: (data) => {
          // Replace updated object with the old one
          this.leagueList.forEach((item, i) => {
            if (item.id == leagueInfo.id) {
              this.leagueList[i] = data.data;
            }
          });
          this.leagueListSub.next([...this.leagueList]);
          this.globalFunctions.showSnackBar("system.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  deleteLeague(leagueId: number) {
    this.http
      .delete<{ }>(
        'http://localhost:3000/admin/ligler/' + leagueId
      )
      .subscribe({
        next: (data) => {
          const filteredLeagueList = this.leagueList.filter(league => league.id !== leagueId);
          this.leagueList = filteredLeagueList;
          this.leagueListSub.next([...this.leagueList]);
          this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }
}
