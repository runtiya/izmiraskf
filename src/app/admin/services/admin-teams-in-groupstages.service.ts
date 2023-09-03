import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsInGroupstagesModel } from "../models/admin-teams-in-groupstages.model";
import { TeamsModel } from "../models/admin-teams.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class TeamsInGroupstagesService {
  private teamsingroupstagesList: TeamsInGroupstagesModel[] = [];
  private teamsingroupstagesListSub = new Subject<TeamsInGroupstagesModel[]>();
  private teamsList: TeamsModel[] = [];
  private teamsListSub = new Subject<TeamsModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getTeamsInGroupstages(groupstageId: number) {
    this.http
      .get<{data: TeamsInGroupstagesModel[]}>(
        'http://localhost:3000/admin/grup-takim-eslesmeleri/' + groupstageId
      )
      .subscribe({
        next: (data) => {
          this.teamsingroupstagesList = data.data;
          !!this.teamsingroupstagesList ? this.teamsingroupstagesListSub.next([...this.teamsingroupstagesList]) : this.teamsingroupstagesListSub.next([]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getTeamsInGroupstagesUpdateListener() {
    return this.teamsingroupstagesListSub.asObservable();
  }


  createTeamsInGroupstages(teamsInGroupstagesList: TeamsInGroupstagesModel[], groupstageSelectionId: number) {
    this.http
      .post<{data: TeamsInGroupstagesModel[]}>(
        'http://localhost:3000/admin/grup-takim-eslesmeleri/' + groupstageSelectionId, teamsInGroupstagesList
      )
      .subscribe({
        next: (data) => {
          this.teamsingroupstagesList = teamsInGroupstagesList;
          !!this.teamsingroupstagesList ? this.teamsingroupstagesListSub.next([...this.teamsingroupstagesList]) : this.teamsingroupstagesListSub.next([]);
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateTeamsInGroupstages(teamInfo: TeamsInGroupstagesModel) {
    this.http
      .put<{ data: TeamsInGroupstagesModel }>(
        'http://localhost:3000/admin/grup-takim-eslesmeleri', teamInfo
      )
      .subscribe({
        next: (data) => {
          this.teamsingroupstagesList.forEach((item, i) => {
            if (item.id == teamInfo.id) {
              this.teamsingroupstagesList[i]["isExpelled"] = data.data.isExpelled;
              this.teamsingroupstagesList[i]["isReceded"] = data.data.isReceded;
              this.teamsingroupstagesList[i]["weekofExpelledorReceded"] = data.data.weekofExpelledorReceded;
              this.teamsingroupstagesList[i]["explanation"] = data.data.explanation;
            }
            this.teamsingroupstagesListSub.next([...this.teamsingroupstagesList]);
            this.globalFunctions.showSnackBar("system.success.update");
          });
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }
}
