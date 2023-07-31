import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsInGroupstagesModel } from "../models/application-teams-in-groupstages.model";
import { TeamsModel } from "../models/application-teams.model";

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
    try {
      this.http
        .get<{teamsingroupstagesList: TeamsInGroupstagesModel[]}>(
          'http://localhost:3000/grup-takim-eslesmeleri/' + groupstageId
        )
        .subscribe({
          next: (data) => {
            this.teamsingroupstagesList = data.teamsingroupstagesList;
            !!this.teamsingroupstagesList ? this.teamsingroupstagesListSub.next([...this.teamsingroupstagesList]) : this.teamsingroupstagesListSub.next([]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getTeamsInGroupstagesUpdateListener() {
    return this.teamsingroupstagesListSub.asObservable();
  }

  getTeams() {
    try {
      this.http
        .get<{teamsList: TeamsModel[]}>(
          'http://localhost:3000/grup-takim-eslesmeleri'
        )
        .subscribe({
          next: (data) => {
            this.teamsList = data.teamsList;
            this.teamsListSub.next([...this.teamsList]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getTeamsUpdateListener() {
    return this.teamsListSub.asObservable();
  }
}
