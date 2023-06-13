import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsInGroupstagesModel } from "../models/application-teams-in-groupstages.model";
import { TeamsModel } from "../models/application-teams.model";

@Injectable({providedIn: 'root'})
export class TeamsInGroupstagesService {
  private teamsingroupstagesList: TeamsInGroupstagesModel[] = [];
  private teamsingroupstagesListSub = new Subject<TeamsInGroupstagesModel[]>();
  private teamsList: TeamsModel[] = [];
  private teamsListSub = new Subject<TeamsModel[]>();

  constructor(private http: HttpClient) {}

  getTeamsInGroupstages(groupstageId: number) {
    try {
      this.http
        .get<{error: boolean, message: string, teamsingroupstagesList: TeamsInGroupstagesModel[]}>(
          'http://localhost:3000/grup-takim-eslesmeleri/' + groupstageId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.teamsingroupstagesList = data.teamsingroupstagesList;
              !!this.teamsingroupstagesList ? this.teamsingroupstagesListSub.next([...this.teamsingroupstagesList]) : this.teamsingroupstagesListSub.next([]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getTeamsInGroupstagesUpdateListener() {
    return this.teamsingroupstagesListSub.asObservable();
  }

  getTeams() {
    try {
      this.http
        .get<{error: boolean, message: string, teamsList: TeamsModel[]}>(
          'http://localhost:3000/grup-takim-eslesmeleri'
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.teamsList = data.teamsList;
              this.teamsListSub.next([...this.teamsList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getTeamsUpdateListener() {
    return this.teamsListSub.asObservable();
  }
}
