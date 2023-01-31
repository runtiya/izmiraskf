import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { GroupStagesModel } from "../../models/admin-groupstages.model";

@Injectable({providedIn: 'root'})
export class GroupStagesService {
  private groupstageList: GroupStagesModel[] = [];
  private groupstageListSub = new Subject<GroupStagesModel[]>();

  constructor(private http: HttpClient) {}

  getGroups(leagueId: number) {
    try {
      this.http
        .get<{error: boolean, message: string, groupstageList: GroupStagesModel[]}>(
          'http://localhost:3000/admin/gruplar/' + leagueId
        )
        .subscribe((data) => {
          if (!data.error) {
            console.log(data.groupstageList)
            this.groupstageList = data.groupstageList;
            this.groupstageListSub.next([...this.groupstageList]);
          } else {
            console.log(data.message);
          }
        });
    } catch (error) {
      console.log(error)
    }
  }

  getGroupStageListUpdateListener() {
    return this.groupstageListSub.asObservable();
  }

  createGroupStage(groupstageInfo: GroupStagesModel) {

  }

  updateGroupStage(groupstageInfo: GroupStagesModel) {

  }

  deleteGroupStage(groupstageId: number) {

  }
}
