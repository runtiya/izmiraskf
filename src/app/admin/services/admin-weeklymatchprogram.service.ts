import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { WeeklyMatchProgramModel } from "../models/admin-weeklymatchprogram.model";

import { WeeklyMatchListService } from "./admin-weeklymatchlist.service";

import { fixtureFunctions } from "../functions/fixture.function";
import { FixtureSearchModel } from "../models/admin-fixture-search-index.model";

@Injectable({providedIn: 'root'})
export class WeeklyMatchProgramService {
  private weeklyMatchProgramList: WeeklyMatchProgramModel[] = [];
  private weeklyMatchProgramListSub = new Subject<WeeklyMatchProgramModel[]>();

  constructor(
    private http: HttpClient,
    private weeklyMatchListService: WeeklyMatchListService,
    private fixtureFunctions: fixtureFunctions
  ) {}

  getWeeklyMatchProgram(seasonId: number) {
    try {
      this.http
        .get<{error: boolean, message: string, weeklyMatchProgramList: WeeklyMatchProgramModel[]}>(
          'http://localhost:3000/admin/weekly-match-program/' + seasonId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.weeklyMatchProgramList = data.weeklyMatchProgramList;
              this.weeklyMatchProgramListSub.next([...this.weeklyMatchProgramList]);
            } else {
            }
          },
          error: (error) => {
          }
        });
    } catch (error) {

    }
  }

  getDocumentsListUpdateListener() {
    return this.weeklyMatchProgramListSub.asObservable();
  }

  createWeeklyMatchProgram(weeklyMatchProgramInfo: WeeklyMatchProgramModel) {
    try {
      this.http
        .post<{ error: boolean, message: string, weeklyMatchProgramId: number}>(
          'http://localhost:3000/admin/weekly-match-program', weeklyMatchProgramInfo
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              weeklyMatchProgramInfo.id = data.weeklyMatchProgramId;
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
            } else {

            }
          },
          error: (error) => {
          }
        });
    } catch (error) {

    }
  }

  updateWeeklyMatchProgram(weeklyMatchProgramInfo: WeeklyMatchProgramModel) {
    try {
      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/weekly-match-program/' + weeklyMatchProgramInfo.seasonId + '/' + weeklyMatchProgramInfo.id, weeklyMatchProgramInfo
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              // Replace updated object with the old one
              this.weeklyMatchProgramList.forEach((item, i) => {
                if (item.id == weeklyMatchProgramInfo.id) {
                  this.weeklyMatchProgramList[i] = weeklyMatchProgramInfo;
                }
              });
              this.weeklyMatchProgramListSub.next([...this.weeklyMatchProgramList]);
            } else {

            }
          },
          error: (error) => {
          }
        });
    } catch (error) {

    }
  }

  deleteWeeklyMatchProgram(seasonId: number, weeklyMatchProgramId: number) {
    try {
      this.http
        .delete<{ error: boolean, message: string }>(
          'http://localhost:3000/admin/weekly-match-program/' + seasonId + '/' + weeklyMatchProgramId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              const filteredWeeklyMatchProgramList = this.weeklyMatchProgramList.filter(p => p.id !== weeklyMatchProgramId);
              this.weeklyMatchProgramList = filteredWeeklyMatchProgramList;
              this.weeklyMatchProgramListSub.next([...this.weeklyMatchProgramList]);
            }
            else {
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

}
