import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";


import { StatisticsModel } from "../models/global-statistics.model";

import { globalFunctions } from "../functions/global.function";


@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private teamsCountByTown: StatisticsModel[] = [];
  private teamsCountByTownSub = new Subject<StatisticsModel[]>();

  private stadiumsCountByTown: StatisticsModel[] = [];
  private stadiumsCountByTownSub = new Subject<StatisticsModel[]>();

  private stadiumsCountByFloorType: StatisticsModel[] = [];
  private stadiumsCountByFloorTypeSub = new Subject<StatisticsModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getTeamsCountByTown() {
    try {
      this.http
        .get<{ data: StatisticsModel[] }>(
          'http://localhost:3000/statistics/teams-count-by-town'
        )
        .subscribe({
          next: (data) => {
            this.teamsCountByTown = data.data;
            this.teamsCountByTownSub.next([...this.teamsCountByTown]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getTeamsCountByTownUpdateListener() {
    return this.teamsCountByTownSub.asObservable();
  }

  getStadiumsCountByTown() {
    try {
      this.http
        .get<{ data: StatisticsModel[] }>(
          'http://localhost:3000/statistics/stadiums-count-by-town'
        )
        .subscribe({
          next: (data) => {
            this.stadiumsCountByTown = data.data;
            this.stadiumsCountByTownSub.next([...this.stadiumsCountByTown]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getStadiumsCountByTownUpdateListener() {
    return this.stadiumsCountByTownSub.asObservable();
  }

  getStadiumsCountByFloorType() {
    try {
      this.http
        .get<{ data: StatisticsModel[] }>(
          'http://localhost:3000/statistics/stadiums-count-by-floortype'
        )
        .subscribe({
          next: (data) => {
            this.stadiumsCountByFloorType = data.data;
            this.stadiumsCountByFloorTypeSub.next([...this.stadiumsCountByFloorType]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getStadiumsCountByFloorTypeUpdateListener() {
    return this.stadiumsCountByFloorTypeSub.asObservable();
  }


}
