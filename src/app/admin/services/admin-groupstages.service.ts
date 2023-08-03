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
    try {
      this.http
        .get<{data: GroupStagesModel[]}>(
          'http://localhost:3000/admin/gruplar/' + leagueId
        )
        .subscribe({
          next: (data) => {
            this.groupstageList = data.data;
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
        .get<{data: Array<number>[]}>(
          'http://localhost:3000/admin/gruplar/hafta-siralamasi/' + groupstageId
        )
        .subscribe({
          next: (data) => {
            this.weekSequence = data.data;
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
    return this.http.get<{data: number}>(
      'http://localhost:3000/admin/gruplar/son-musabaka-haftasi/' + _groupstageId
      );
  }

  createGroupStage(groupstageInfo: GroupStagesModel) {
    try {
      this.http
        .post<{data: number}>(
          'http://localhost:3000/admin/gruplar', groupstageInfo
        )
        .subscribe({
          next: (data) => {
            groupstageInfo.id = data.data;
            this.groupstageList.push(groupstageInfo);
            this.groupstageListSub.next([...this.groupstageList]);
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

  updateGroupStage(groupstageInfo: GroupStagesModel) {
    try {
      this.http
        .put<{ }>(
          'http://localhost:3000/admin/gruplar/' + groupstageInfo.id, groupstageInfo
        )
        .subscribe({
          next: (data) => {
            // Replace updated object with the old one
            this.groupstageList.forEach((item, i) => {
              if (item.id == groupstageInfo.id) {
                this.groupstageList[i] = groupstageInfo;
              }
            });
            this.groupstageListSub.next([...this.groupstageList]);
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

  deleteGroupStage(groupstageId: number) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/gruplar/' + groupstageId
        )
        .subscribe({
          next: (data) => {
            const filteredGroupstageList = this.groupstageList.filter(group => group.id !== groupstageId);
            this.groupstageList = filteredGroupstageList;
            this.groupstageListSub.next([...this.groupstageList]);
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
