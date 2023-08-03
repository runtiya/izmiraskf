import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Subscription } from "rxjs";

import { WeeklyMatchListModel } from "../models/application-weeklymatchlist.model";
import { WeeklyMatchProgramModel } from "../models/application-weeklymatchprogram.model";

import { FixtureService } from "./application-fixtures.service";
import { FixtureModel } from "../models/application-fixture.model";
import { FixtureSearchModel } from "../models/application-fixture-search-index.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class WeeklyMatchListService {
  weeklyMatchList: WeeklyMatchListModel[] = [];
  private weeklyMatchListSub = new Subject<WeeklyMatchListModel[]>();
  fixtureList: FixtureModel[] = [];
  private fixtureListSub: Subscription;

  constructor(
    private http: HttpClient,
    private fixtureService: FixtureService,
    private globalFunctions: globalFunctions
  ) {}

  getWeeklyMatchList(seasonId: number) {
    try {
      this.http
        .get<{data: WeeklyMatchListModel[]}>(
          'http://localhost:3000/weekly-match-list/' + seasonId
        )
        .subscribe({
          next: (data) => {
            this.weeklyMatchList = data.data;
            this.weeklyMatchListSub.next([...this.weeklyMatchList]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getWeeklyMatchListUpdateListener() {
    return this.weeklyMatchListSub.asObservable();
  }

}
