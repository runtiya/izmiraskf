import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { WeeklyMatchListModel } from "../models/application-weeklymatchlist.model";

import { globalFunctions } from "../../functions/global.function";


@Injectable({providedIn: 'root'})
export class WeeklyMatchListService {
  weeklyMatchList: WeeklyMatchListModel[] = [];
  private weeklyMatchListSub = new Subject<WeeklyMatchListModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getWeeklyMatchList() {
    this.http
      .get<{data: WeeklyMatchListModel[]}>(
        'http://localhost:3000/weekly-match-list/'
      )
      .subscribe({
        next: (data) => {
          this.weeklyMatchList = data.data;
          this.weeklyMatchListSub.next([...this.weeklyMatchList]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getWeeklyMatchListUpdateListener() {
    return this.weeklyMatchListSub.asObservable();
  }

}
