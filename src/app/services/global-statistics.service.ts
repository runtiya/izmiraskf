import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";

import { globalFunctions } from "../functions/global.function";


@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private teamsCountByTown: any[] = [];
  private teamsCountByTownSub = new Subject<any[]>();

  private stadiumsCountByTown: any[] = [];
  private stadiumsCountByTownSub = new Subject<any[]>();

  private stadiumsCountByFloorType: any[] = [];
  private stadiumsCountByFloorTypeSub = new Subject<any[]>();

  private matchStatusCountByLeague: any[] = [];
  private matchStatusCountByLeagueSub = new Subject<any[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getTeamsCountByTown() {
    this.http
      .get<{ data: any[] }>(
        'http://localhost:3000/statistics/teams-count-by-town'
      )
      .subscribe({
        next: (data) => {
          this.teamsCountByTown = data.data;
          this.teamsCountByTownSub.next([...this.teamsCountByTown]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getTeamsCountByTownUpdateListener() {
    return this.teamsCountByTownSub.asObservable();
  }

  getStadiumsCountByTown() {
    this.http
      .get<{ data: any[] }>(
        'http://localhost:3000/statistics/stadiums-count-by-town'
      )
      .subscribe({
        next: (data) => {
          this.stadiumsCountByTown = data.data;
          this.stadiumsCountByTownSub.next([...this.stadiumsCountByTown]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getStadiumsCountByTownUpdateListener() {
    return this.stadiumsCountByTownSub.asObservable();
  }

  getStadiumsCountByFloorType() {
    this.http
      .get<{ data: any[] }>(
        'http://localhost:3000/statistics/stadiums-count-by-floortype'
      )
      .subscribe({
        next: (data) => {
          this.stadiumsCountByFloorType = data.data;
          this.stadiumsCountByFloorTypeSub.next([...this.stadiumsCountByFloorType]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getStadiumsCountByFloorTypeUpdateListener() {
    return this.stadiumsCountByFloorTypeSub.asObservable();
  }

  getMatchStatusCountByLeague(seasonId: number) {
    this.http
      .get<{ data: any[] }>(
        `http://localhost:3000/statistics/matchstatus-count-by-league?seasonid=${seasonId}`
      )
      .subscribe({
        next: (data) => {
          this.matchStatusCountByLeague = data.data;
          this.matchStatusCountByLeagueSub.next([...this.matchStatusCountByLeague]);
        },
        error: (error) => {

        }
      });
  }

  getMatchStatusCountByLeagueUpdateListener() {
    return this.matchStatusCountByLeagueSub.asObservable();
  }


}
