import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { WeeklyMatchProgramModel } from "../models/application-weeklymatchprogram.model";

import { fixtureFunctions } from "../functions/fixture.function";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class WeeklyMatchProgramService {
  private weeklyMatchProgramList: WeeklyMatchProgramModel[] = [];
  private weeklyMatchProgramListSub = new Subject<WeeklyMatchProgramModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getWeeklyMatchProgram(seasonId: number) {
    try {
      this.http
        .get<{weeklyMatchProgramList: WeeklyMatchProgramModel[]}>(
          'http://localhost:3000/weekly-match-program/' + seasonId
        )
        .subscribe({
          next: (data) => {
            this.weeklyMatchProgramList = data.weeklyMatchProgramList;
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


}
