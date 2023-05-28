import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { LeaguesModel } from "../models/admin-leagues.model";

@Injectable({providedIn: 'root'})
export class LeaguesService {
  private leagueList: LeaguesModel[] = [];
  private leagueListSub = new Subject<LeaguesModel[]>();

  constructor(private http: HttpClient) {}

  getLeagues(seasonId: number) {
    try {
      this.http
        .get<{error: boolean, message: string, leagueList: LeaguesModel[]}>(
          'http://localhost:3000/admin/ligler/' + seasonId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.leagueList = data.leagueList;
              this.leagueListSub.next([...this.leagueList]);
            } else {
              console.log(data.message);
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  getLeagueListUpdateListener() {
    return this.leagueListSub.asObservable();
  }

  createLeague(leagueInfo: LeaguesModel) {
    try {
      this.http
        .post<{error: boolean, message: string, leagueId: number}>(
          'http://localhost:3000/admin/ligler', leagueInfo
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              leagueInfo.id = data.leagueId;
              this.leagueList.push(leagueInfo);
              this.leagueListSub.next([...this.leagueList]);
            } else {
              console.log(data.message);
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  updateLeague(leagueInfo: LeaguesModel) {
    try {
      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/ligler/' + leagueInfo.id, leagueInfo
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              // Replace updated object with the old one
              this.leagueList.forEach((item, i) => {
                if (item.id == leagueInfo.id) {
                  this.leagueList[i] = leagueInfo;
                }
              });

              this.leagueListSub.next([...this.leagueList]);
            } else {
              console.log(data.message);
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  deleteLeague(leagueId: number) {
    try {
      this.http
        .delete<{error: boolean, message: string}>(
          'http://localhost:3000/admin/ligler/' + leagueId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              const filteredLeagueList = this.leagueList.filter(league => league.id !== leagueId);
              this.leagueList = filteredLeagueList;
              this.leagueListSub.next([...this.leagueList]);
            }
            else {
              console.log(data.message);
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}
