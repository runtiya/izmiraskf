import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsModel } from "../models/application-teams.model";

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private teamList: TeamsModel[] = [];
  private teamListSub = new Subject<TeamsModel[]>();

  private team: TeamsModel;
  private teamSub = new Subject<TeamsModel>();

  constructor(private http: HttpClient) { }

  getTeams() {
    try {
      this.http
        .get<{ error: boolean, message: string, teamList: TeamsModel[] }>(
          'http://localhost:3000/takimlar'
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.teamList = data.teamList;
              this.teamListSub.next([...this.teamList]);
            } else {

            }
          },
          error: (error) => {

            this.teamList = [];
            this.teamListSub.next([]);
          }
        });
    } catch (error) {

    }
  }

  getTeamListUpdateListener() {
    return this.teamListSub.asObservable();
  }

  getTeamById(_id: number) {
    try {
      this.http
        .get<{error: boolean, message:string, team: TeamsModel}>(
          'http://localhost:3000/takimlar/' + _id
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.team = data.team;
              this.teamSub.next(this.team);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getTeamByIdUpdateListener() {
    return this.teamSub.asObservable();
  }

}
