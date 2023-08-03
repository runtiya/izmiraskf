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
    try {
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
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getDocumentsListUpdateListener() {
    return this.weeklyMatchProgramListSub.asObservable();
  }

  createWeeklyMatchProgram(weeklyMatchProgramInfo: WeeklyMatchProgramModel) {
    try {
      this.http
        .post<{ data: number}>(
          'http://localhost:3000/admin/weekly-match-program', weeklyMatchProgramInfo
        )
        .subscribe({
          next: (data) => {
            weeklyMatchProgramInfo.id = data.data;
            this.weeklyMatchProgramList.push(weeklyMatchProgramInfo);
            this.weeklyMatchProgramListSub.next([...this.weeklyMatchProgramList]);

            let fixtureSearchIndex: FixtureSearchModel = this.fixtureFunctions.setFixtureSearchModel(
              weeklyMatchProgramInfo.seasonId,
              null, null, null, null, null, null, null, null, null,
              weeklyMatchProgramInfo.beginDate,
              weeklyMatchProgramInfo.endDate,
              null
            );
            this.weeklyMatchListService.buildWeeklyMatchList(weeklyMatchProgramInfo, fixtureSearchIndex);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  updateWeeklyMatchProgram(weeklyMatchProgramInfo: WeeklyMatchProgramModel) {
    try {
      this.http
        .put<{ }>(
          'http://localhost:3000/admin/weekly-match-program/' + weeklyMatchProgramInfo.seasonId + '/' + weeklyMatchProgramInfo.id, weeklyMatchProgramInfo
        )
        .subscribe({
          next: (data) => {
            // Replace updated object with the old one
            this.weeklyMatchProgramList.forEach((item, i) => {
              if (item.id == weeklyMatchProgramInfo.id) {
                this.weeklyMatchProgramList[i] = weeklyMatchProgramInfo;
              }
            });
            this.weeklyMatchProgramListSub.next([...this.weeklyMatchProgramList]);
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

  deleteWeeklyMatchProgram(seasonId: number, weeklyMatchProgramId: number) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/weekly-match-program/' + seasonId + '/' + weeklyMatchProgramId
        )
        .subscribe({
          next: (data) => {
            const filteredWeeklyMatchProgramList = this.weeklyMatchProgramList.filter(p => p.id !== weeklyMatchProgramId);
            this.weeklyMatchProgramList = filteredWeeklyMatchProgramList;
            this.weeklyMatchProgramListSub.next([...this.weeklyMatchProgramList]);
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
