import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Subscription } from "rxjs";

import { WeeklyMatchListModel } from "../models/admin-weeklymatchlist.model";
import { WeeklyMatchProgramModel } from "../models/admin-weeklymatchprogram.model";

import { FixtureService } from "./admin-fixtures.service";
import { FixtureModel } from "../models/admin-fixture.model";
import { FixtureSearchModel } from "../models/admin-fixture-search-index.model";

import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

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
    this.http
      .get<{data: WeeklyMatchListModel[]}>(
        environment.serverUrl + "admin/weekly-match-list/" + weeklyMatchProgramId
      )
      .subscribe({
        next: (data) => {
          this.weeklyMatchList = data.data;
          this.weeklyMatchListSub.next([...this.weeklyMatchList]);
        },
        error: (error) => {
          this.weeklyMatchListSub.next(<WeeklyMatchListModel[]>{});
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getWeeklyMatchListUpdateListener() {
    return this.weeklyMatchListSub.asObservable();
  }


  createWeeklyMatchList(weeklyMatchListInfo: WeeklyMatchListModel[]) {
    const requestData = weeklyMatchListInfo;
    this.http
      .post<{ }>(
        environment.serverUrl + "admin/weekly-match-list/create", requestData
      )
      .subscribe({
        next: (responseData) => {
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  buildWeeklyMatchList(weeklyMatchProgramInfo: WeeklyMatchProgramModel, fixtureSearchIndex: FixtureSearchModel) {
    var _weeklyMatchList: WeeklyMatchListModel[] = [];
    this.fixtureService.getFixtureBySearchIndex(fixtureSearchIndex);
    this.fixtureListSub = this.fixtureService.getFixtureUpdateListener()
      .subscribe({
        next: (data: FixtureModel[]) => {
          this.fixtureList = data.sort((a, b) => a.orderNo - b.orderNo);

          for (let i = 0; i < this.fixtureList.length; i++) {
            const fixture = this.fixtureList[i];
            let _match: WeeklyMatchListModel = <WeeklyMatchListModel>{};

            _match.createdAt = null;
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
  }

  updateMatchList(weeklyMatchInfo: WeeklyMatchListModel) {
    const requestData = weeklyMatchInfo;

    this.http
      .put<{ data: WeeklyMatchListModel }>(
        environment.serverUrl + "admin/weekly-match-list/" + requestData.id, requestData
      )
      .subscribe({
        next: (responseData) => {
          this.weeklyMatchList.forEach((item, i) => {
            if (item.id == requestData.id) {
              this.weeklyMatchList[i] = responseData.data;
            }
          });
          this.weeklyMatchListSub.next([...this.weeklyMatchList]);
          this.globalFunctions.showSnackBar("system.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  clearMatchList(weeklyMatchProgramId: number, fixtureSearchIndex: FixtureSearchModel) {
    this.http
      .delete<{ }>(
        environment.serverUrl + "admin/weekly-match-list/clear/" + weeklyMatchProgramId
      )
      .subscribe({
        next: (data) => {
          this.weeklyMatchList = [];
            this.weeklyMatchListSub.next([]);
            this.fixtureService.getFixtureBySearchIndex(fixtureSearchIndex);
            this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  deleteMatchFromList(weeklyMatchListId: number) {
    this.http
      .delete<{ }>(
        environment.serverUrl + "admin/weekly-match-list/delete/" + weeklyMatchListId
      )
      .subscribe({
        next: (data) => {
          const filteredWeeklyMatchList = this.weeklyMatchList.filter(wml => wml.id !== weeklyMatchListId);
          this.weeklyMatchList = filteredWeeklyMatchList;
          this.weeklyMatchListSub.next([...this.weeklyMatchList]);
          this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

}
