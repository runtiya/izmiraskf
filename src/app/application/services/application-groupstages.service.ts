import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";

import { GroupStagesModel } from "../models/application-groupstages.model";



@Injectable({providedIn: 'root'})
export class GroupStagesService {
  private groupstageList: GroupStagesModel[] = [];
  private groupstageListSub = new Subject<GroupStagesModel[]>();
  private weekSequence: Array<number>[] = [];
  private weekSequenceSub = new Subject<Array<number>[]>();

  constructor(private http: HttpClient) {}

  getGroupstages(leagueId: number) {
    try {
      this.http
        .get<{error: boolean, message: string, groupstageList: GroupStagesModel[]}>(
          'http://localhost:3000/admin/gruplar/' + leagueId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.groupstageList = data.groupstageList;
              this.groupstageListSub.next([...this.groupstageList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getGroupStageListUpdateListener() {
    return this.groupstageListSub.asObservable();
  }

  getGroupWeeks(groupstageId: number) {
    try {
      this.http
        .get<{error: boolean, message: string, weekSequence: Array<number>[]}>(
          'http://localhost:3000/admin/gruplar/hafta-siralamasi/' + groupstageId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.weekSequence = data.weekSequence;
              this.weekSequenceSub.next([...this.weekSequence]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getGroupWeeksUpdateListener() {
    return this.weekSequenceSub.asObservable();
  }

  getPlayedLastMatchWeek(_groupstageId: number): Observable<any> {
    return this.http.get<{error: boolean, message: string, currentWeek: number}>(
      'http://localhost:3000/admin/gruplar/son-musabaka-haftasi/' + _groupstageId
      );
  }
}
