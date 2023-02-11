import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";
import { TeamsModel } from "../../models/admin-teams.model";

@Injectable({providedIn: 'root'})
export class TeamsInGroupstagesService {
  private teamsingroupstagesList: TeamsInGroupstagesModel[] = [];
  private teamsingroupstagesListSub = new Subject<TeamsInGroupstagesModel[]>();
  private teamsList: TeamsModel[] = [];
  private teamsListSub = new Subject<TeamsModel[]>();

  constructor(private http: HttpClient) {}

  getTeamsInGroupstages(groupstagesId: number) {
    try {
      this.http
        .get<{error: boolean, message: string, teamsingroupstagesList: TeamsInGroupstagesModel[]}>(
          'http://localhost:3000/admin/grup-takim-eslesmeleri/' + groupstagesId
        )
        .subscribe((data) => {
          if (!data.error) {
            if (!!data.teamsingroupstagesList) {
              this.teamsingroupstagesList = data.teamsingroupstagesList;
              this.teamsingroupstagesListSub.next([...this.teamsingroupstagesList]);
            } else {
              this.teamsingroupstagesList = data.teamsingroupstagesList;
              this.teamsingroupstagesListSub.next([]);
            }
          } else {
            console.log(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  getTeamsInGroupstagesUpdateListener() {
    return this.teamsingroupstagesListSub.asObservable();
  }

  getTeams() {
    try {
      this.http
        .get<{error: boolean, message: string, teamsList: TeamsModel[]}>(
          'http://localhost:3000/admin/grup-takim-eslesmeleri'
        )
        .subscribe((data) => {
          if (!data.error) {
            this.teamsList = data.teamsList;
            this.teamsListSub.next([...this.teamsList]);
          } else {
            console.log(data.message);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  getTeamsUpdateListener() {
    return this.teamsListSub.asObservable();
  }

  createTeamsInGroupstages(teamsList: TeamsInGroupstagesModel[], groupstageSelectionId: number) {
    try {
      this.http
        .post<{error: boolean, message: string}>(
          'http://localhost:3000/admin/grup-takim-eslesmeleri/' + groupstageSelectionId, teamsList
        )
        .subscribe((data) => {
          if (!data.error) {
            if (!!teamsList) {
              this.teamsingroupstagesList = teamsList;
              this.teamsingroupstagesListSub.next([...this.teamsingroupstagesList]);
            } else {
              this.teamsingroupstagesList = teamsList;
              this.teamsingroupstagesListSub.next([]);
            }

          } else {
            console.log(data.message);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  updateTeamsInGroupstages(teamInfo: TeamsInGroupstagesModel) {
    try {
      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/grup-takim-eslesmeleri', teamInfo
        )
        .subscribe((data) => {
          if (!data.error) {
            this.teamsingroupstagesList.forEach((item, i) => {
              if (item.id == teamInfo.id) {
                this.teamsingroupstagesList[i]["isExpelled"] = teamInfo.isExpelled;
                this.teamsingroupstagesList[i]["isReceded"] = teamInfo.isReceded;
                this.teamsingroupstagesList[i]["weekofExpelledorReceded"] = teamInfo.weekofExpelledorReceded;
                this.teamsingroupstagesList[i]["explanation"] = teamInfo.explanation;
              }
              this.teamsingroupstagesListSub.next([...this.teamsingroupstagesList]);
            })
          } else {
            console.log(data.message);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }
}
