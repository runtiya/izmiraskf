import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { WeeklyMatchProgramModel } from "../models/admin-weeklymatchprogram.model";

import { WeeklyMatchListService } from "./admin-weeklymatchlist.service";

import { fixtureFunctions } from "../functions/fixture.function";
import { FixtureSearchModel } from "../models/admin-fixture-search-index.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class WeeklyMatchProgramService {
  private weeklyMatchProgramList: WeeklyMatchProgramModel[] = [];
  private weeklyMatchProgramListSub = new Subject<WeeklyMatchProgramModel[]>();

  constructor(
    private http: HttpClient,
    private weeklyMatchListService: WeeklyMatchListService,
    private fixtureFunctions: fixtureFunctions,
    private globalFunctions: globalFunctions
  ) {}

  getWeeklyMatchProgram(seasonId: number) {
    this.http
      .get<{data: WeeklyMatchProgramModel[]}>(
        'http://localhost:3000/admin/weekly-match-program/' + seasonId
      )
      .subscribe({
        next: (data) => {
          this.weeklyMatchProgramList = data.data;
          this.weeklyMatchProgramListSub.next([...this.weeklyMatchProgramList]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getDocumentsListUpdateListener() {
    return this.weeklyMatchProgramListSub.asObservable();
  }

  createWeeklyMatchProgram(weeklyMatchProgramInfo: WeeklyMatchProgramModel) {
    const requestData = weeklyMatchProgramInfo;

    this.http
      .post<{ data: WeeklyMatchProgramModel }>(
        'http://localhost:3000/admin/weekly-match-program', requestData
      )
      .subscribe({
        next: (responseData) => {
          this.weeklyMatchProgramList.push(responseData.data);
          this.weeklyMatchProgramListSub.next([...this.weeklyMatchProgramList]);
          this.globalFunctions.showSnackBar("system.success.create");
          let fixtureSearchIndex: FixtureSearchModel = this.fixtureFunctions.setFixtureSearchModel(
            requestData.seasonId,
            null, null, null, null, null, null, null, null, null,
            requestData.beginDate,
            requestData.endDate,
            null
          );
          this.weeklyMatchListService.buildWeeklyMatchList(requestData, fixtureSearchIndex);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateWeeklyMatchProgram(weeklyMatchProgramInfo: WeeklyMatchProgramModel) {
    const requestData = weeklyMatchProgramInfo;
    this.http
      .put<{ data: WeeklyMatchProgramModel }>(
        'http://localhost:3000/admin/weekly-match-program/' + requestData.seasonId + '/' + requestData.id, requestData
      )
      .subscribe({
        next: (responseData) => {
          // Replace updated object with the old one
          this.weeklyMatchProgramList.forEach((item, i) => {
            if (item.id == requestData.id) {
              this.weeklyMatchProgramList[i] = responseData.data;
            }
          });
          this.weeklyMatchProgramListSub.next([...this.weeklyMatchProgramList]);
          this.globalFunctions.showSnackBar("system.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  deleteWeeklyMatchProgram(seasonId: number, weeklyMatchProgramId: number) {
    this.http
      .delete<{ }>(
        'http://localhost:3000/admin/weekly-match-program/' + seasonId + '/' + weeklyMatchProgramId
      )
      .subscribe({
        next: (data) => {
          const filteredWeeklyMatchProgramList = this.weeklyMatchProgramList.filter(p => p.id !== weeklyMatchProgramId);
          this.weeklyMatchProgramList = filteredWeeklyMatchProgramList;
          this.weeklyMatchProgramListSub.next([...this.weeklyMatchProgramList]);
          this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }
}
