import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { WeeklyMatchProgramModel } from "../models/application-weeklymatchprogram.model";

import { fixtureFunctions } from "../functions/fixture.function";

@Injectable({providedIn: 'root'})
export class WeeklyMatchProgramService {
  private weeklyMatchProgramList: WeeklyMatchProgramModel[] = [];
  private weeklyMatchProgramListSub = new Subject<WeeklyMatchProgramModel[]>();

  constructor(
    private http: HttpClient,
    private fixtureFunctions: fixtureFunctions
  ) {}

  getWeeklyMatchProgram(seasonId: number) {
    try {
      this.http
        .get<{error: boolean, message: string, weeklyMatchProgramList: WeeklyMatchProgramModel[]}>(
          'http://localhost:3000/weekly-match-program/' + seasonId
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


}
