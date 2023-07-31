import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";

import { GroupStagesModel } from "../models/application-groupstages.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class GroupStagesService {
  private groupstageList: GroupStagesModel[] = [];
  private groupstageListSub = new Subject<GroupStagesModel[]>();
  private weekSequence: Array<number>[] = [];
  private weekSequenceSub = new Subject<Array<number>[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getGroupstages(leagueId: number) {
    try {
      this.http
        .get<{groupstageList: GroupStagesModel[]}>(
          'http://localhost:3000/gruplar/' + leagueId
        )
        .subscribe({
          next: (data) => {
            this.groupstageList = data.groupstageList;
            this.groupstageListSub.next([...this.groupstageList]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getGroupStageListUpdateListener() {
    return this.groupstageListSub.asObservable();
  }

  getGroupWeeks(groupstageId: number) {
    try {
      this.http
        .get<{weekSequence: Array<number>[]}>(
          'http://localhost:3000/gruplar/hafta-siralamasi/' + groupstageId
        )
        .subscribe({
          next: (data) => {
            this.weekSequence = data.weekSequence;
            this.weekSequenceSub.next([...this.weekSequence]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getGroupWeeksUpdateListener() {
    return this.weekSequenceSub.asObservable();
  }

  getPlayedLastMatchWeek(_groupstageId: number): Observable<any> {
    return this.http.get<{currentWeek: number}>(
      'http://localhost:3000/gruplar/son-musabaka-haftasi/' + _groupstageId
      );
  }
}
