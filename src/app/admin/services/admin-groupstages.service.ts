import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";

import { GroupStagesModel } from "../models/admin-groupstages.model";

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
    this.http
      .get<{data: GroupStagesModel[]}>(
        'http://localhost:3000/admin/groupstages/' + leagueId
      )
      .subscribe({
        next: (data) => {
          this.groupstageList = data.data;
          this.groupstageListSub.next([...this.groupstageList]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getGroupStageListUpdateListener() {
    return this.groupstageListSub.asObservable();
  }

  getGroupWeeks(groupstageId: number) {
    this.http
      .get<{data: Array<number>[]}>(
        'http://localhost:3000/admin/groupstages/hafta-siralamasi/' + groupstageId
      )
      .subscribe({
        next: (data) => {
          this.weekSequence = data.data;
          this.weekSequenceSub.next([...this.weekSequence]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getGroupWeeksUpdateListener() {
    return this.weekSequenceSub.asObservable();
  }

  getPlayedLastMatchWeek(_groupstageId: number): Observable<any> {
    return this.http.get<{ data: number }>(
      'http://localhost:3000/admin/groupstages/son-musabaka-haftasi/' + _groupstageId
      );
  }

  createGroupStage(groupstageInfo: GroupStagesModel) {
    const requestData = groupstageInfo;

    this.http
      .post<{data: GroupStagesModel}>(
        'http://localhost:3000/admin/groupstages', requestData
      )
      .subscribe({
        next: (responseData) => {
          this.groupstageList.push(responseData.data);
          this.groupstageListSub.next([...this.groupstageList]);
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateGroupStage(groupstageInfo: GroupStagesModel) {
    const requestData = groupstageInfo;
    this.http
      .put<{ data: GroupStagesModel }>(
        'http://localhost:3000/admin/groupstages/' + requestData.id, requestData
      )
      .subscribe({
        next: (responseData) => {
          // Replace updated object with the old one
          this.groupstageList.forEach((item, i) => {
            if (item.id == requestData.id) {
              this.groupstageList[i] = responseData.data;
            }
          });
          this.groupstageListSub.next([...this.groupstageList]);
          this.globalFunctions.showSnackBar("system.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar('server.error');
        }
      });
  }

  deleteGroupStage(groupstageId: number) {
    this.http
      .delete<{ }>(
        'http://localhost:3000/admin/groupstages/' + groupstageId
      )
      .subscribe({
        next: (data) => {
          const filteredGroupstageList = this.groupstageList.filter(group => group.id !== groupstageId);
          this.groupstageList = filteredGroupstageList;
          this.groupstageListSub.next([...this.groupstageList]);
          this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }
}
