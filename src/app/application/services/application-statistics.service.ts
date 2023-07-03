import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { StadiumsModel } from "../models/application-stadiums.model";

@Injectable({providedIn: 'root'})
export class StatisticsService {
  private goalByLeagueList: any[] = [];
  private goalByLeagueListSub = new Subject<any[]>();


  constructor(private http: HttpClient) {}

  getGoalByLeague() {
    try {
      this.http
        .get<{error: boolean, message: string, goalByLeagueList: any[]}>(
          'http://localhost:3000/statistics/goal-by-league'
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.goalByLeagueList = data.goalByLeagueList;
              this.goalByLeagueListSub.next([...this.goalByLeagueList]);
            } else {

            }
          },
          error: (error) => {
          }
        });

    } catch (error) {

    }
  }

  getGoalByLeagueListUpdateListener() {
    return this.goalByLeagueListSub.asObservable();
  }

}
