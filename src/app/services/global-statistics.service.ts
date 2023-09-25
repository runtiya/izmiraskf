import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";

import { globalFunctions } from "../functions/global.function";


@Injectable({ providedIn: 'root' })
export class GlobalStatisticsService {
  private teamsCountByTown: any[] = [];
  private teamsCountByTownSub = new Subject<any[]>();

  private stadiumsCountByTown: any[] = [];
  private stadiumsCountByTownSub = new Subject<any[]>();

  private stadiumsCountByFloorType: any[] = [];
  private stadiumsCountByFloorTypeSub = new Subject<any[]>();

  private matchStatusCountByLeague: any[] = [];
  private matchStatusCountByLeagueSub = new Subject<any[]>();

  private seasonSummaryList: any[] = [];
  private seasonSummaryListSub = new Subject<any[]>();

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
        next: (responseData) => {
          this.teamsCountByTown = responseData.data;
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
        next: (responseData) => {
          this.stadiumsCountByTown = responseData.data;
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
        next: (responseData) => {
          this.stadiumsCountByFloorType = responseData.data;
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
        next: (responseData) => {
          this.matchStatusCountByLeague = responseData.data;
          this.matchStatusCountByLeagueSub.next([...this.matchStatusCountByLeague]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getMatchStatusCountByLeagueUpdateListener() {
    return this.matchStatusCountByLeagueSub.asObservable();
  }

  getSeasonSummaryList(seasonId: number) {
    this.http
      .get<{ data: any[] }>(
        `http://localhost:3000/statistics/season-summary-list?seasonid=${seasonId}`
      )
      .subscribe({
        next: (responseData) => {
          this.seasonSummaryList = responseData.data;
          this.seasonSummaryListSub.next([...this.seasonSummaryList]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getSeasonSummaryListUpdateListener() {
    return this.seasonSummaryListSub.asObservable();
  }
}
