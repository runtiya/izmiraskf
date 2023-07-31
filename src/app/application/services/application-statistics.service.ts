import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class StatisticsService {
  private goalByLeagueList: any[] = [];
  private goalByLeagueListSub = new Subject<any[]>();


  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getGoalByLeague() {
    try {
      this.http
        .get<{goalByLeagueList: any[]}>(
          'http://localhost:3000/statistics/goal-by-league'
        )
        .subscribe({
          next: (data) => {
            this.goalByLeagueList = data.goalByLeagueList;
            this.goalByLeagueListSub.next([...this.goalByLeagueList]);
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
