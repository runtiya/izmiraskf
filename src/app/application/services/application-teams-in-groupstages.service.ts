import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsInGroupstagesModel } from "../models/application-teams-in-groupstages.model";
import { TeamsModel } from "../models/application-teams.model";

import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

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
        environment.serverUrl + "teams-in-groupstages/" + groupstageId
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

  getTeams() {
    this.http
      .get<{data: TeamsModel[]}>(
        environment.serverUrl + "teams-in-groupstages"
      )
      .subscribe({
        next: (data) => {
          this.teamsList = data.data;
          this.teamsListSub.next([...this.teamsList]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getTeamsUpdateListener() {
    return this.teamsListSub.asObservable();
  }
}
