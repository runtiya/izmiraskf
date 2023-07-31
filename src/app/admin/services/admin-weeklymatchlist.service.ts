import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Subscription } from "rxjs";

import { WeeklyMatchListModel } from "../models/admin-weeklymatchlist.model";
import { WeeklyMatchProgramModel } from "../models/admin-weeklymatchprogram.model";

import { FixtureService } from "./admin-fixtures.service";
import { FixtureModel } from "../models/admin-fixture.model";
import { FixtureSearchModel } from "../models/admin-fixture-search-index.model";


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

  getWeeklyMatchList(weeklyMatchProgramId: number) {
    try {
      this.http
        .get<{weeklyMatchList: WeeklyMatchListModel[]}>(
          'http://localhost:3000/admin/weekly-match-list/' + weeklyMatchProgramId
        )
        .subscribe({
          next: (data) => {
            this.weeklyMatchList = data.weeklyMatchList;
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


  createWeeklyMatchList(weeklyMatchListInfo: WeeklyMatchListModel[]) {
    try {
      this.http
        .post<{ }>(
          'http://localhost:3000/admin/weekly-match-list/create', weeklyMatchListInfo
        )
        .subscribe({
          next: (data) => {
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

  buildWeeklyMatchList(weeklyMatchProgramInfo: WeeklyMatchProgramModel, fixtureSearchIndex: FixtureSearchModel) {
    try {
      var _weeklyMatchList: WeeklyMatchListModel[] = [];
      this.fixtureService.getFixtureBySearchIndex(fixtureSearchIndex);
      this.fixtureListSub = this.fixtureService.getFixtureUpdateListener()
        .subscribe({
          next: (data: FixtureModel[]) => {
            this.fixtureList = data.sort((a, b) => a.orderNo - b.orderNo);

            for (let i = 0; i < this.fixtureList.length; i++) {
              const fixture = this.fixtureList[i];
              let _match: WeeklyMatchListModel = <WeeklyMatchListModel>{};

              _match.createdAt = this.globalFunctions.getTimeStamp();
              _match.createdBy = null;
              _match.updatedAt = null;
              _match.updatedBy = null;
              _match.weeklyMatchProgramId = weeklyMatchProgramInfo.id;
              _match.matchId = fixture.id;
              _match.matchNo = fixture.matchNo;
              _match.isInList = true;

              _weeklyMatchList.push(_match);
            }
            this.createWeeklyMatchList(_weeklyMatchList);
            this.fixtureListSub.unsubscribe();

          },
          error: (error) => {

          }

        });

    } catch (error) {

    }

  }

  updateMatchList(weeklyMatchInfo: WeeklyMatchListModel) {
    try {
      this.http
        .put<{ }>(
          'http://localhost:3000/admin/weekly-match-list/' + weeklyMatchInfo.id, weeklyMatchInfo
        )
        .subscribe({
          next: (data) => {
            this.weeklyMatchList.forEach((item, i) => {
              if (item.id == weeklyMatchInfo.id) {
                this.weeklyMatchList[i] = weeklyMatchInfo;
              }
            });
            this.weeklyMatchListSub.next([...this.weeklyMatchList]);
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

  clearMatchList(weeklyMatchProgramId: number, fixtureSearchIndex: FixtureSearchModel) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/weekly-match-list/clear/' + weeklyMatchProgramId
        )
        .subscribe({
          next: (data) => {
            this.weeklyMatchList = [];
              this.weeklyMatchListSub.next([]);
              this.fixtureService.getFixtureBySearchIndex(fixtureSearchIndex);
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

  deleteMatchFromList(weeklyMatchListId: number) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/weekly-match-list/delete/' + weeklyMatchListId
        )
        .subscribe({
          next: (data) => {
            const filteredWeeklyMatchList = this.weeklyMatchList.filter(wml => wml.id !== weeklyMatchListId);
            this.weeklyMatchList = filteredWeeklyMatchList;
            this.weeklyMatchListSub.next([...this.weeklyMatchList]);
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
