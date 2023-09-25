import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { WeeklyMatchProgramModel } from "../models/application-weeklymatchprogram.model";

import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class WeeklyMatchProgramService {
  private weeklyMatchProgramList: WeeklyMatchProgramModel[] = [];
  private weeklyMatchProgramListSub = new Subject<WeeklyMatchProgramModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions,
  ) {}

  getWeeklyMatchProgram() {
    this.http
      .get<{data: WeeklyMatchProgramModel[]}>(
        environment.serverUrl + "weekly-match-program/"
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


}
