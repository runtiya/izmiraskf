import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsModel } from "../models/application-teams.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private teamList: TeamsModel[] = [];
  private teamListSub = new Subject<TeamsModel[]>();

  private team: TeamsModel;
  private teamSub = new Subject<TeamsModel>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getTeams() {
    try {
      this.http
        .get<{ teamList: TeamsModel[] }>(
          'http://localhost:3000/takimlar'
        )
        .subscribe({
          next: (data) => {
            this.teamList = data.teamList;
            this.teamListSub.next([...this.teamList]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getTeamListUpdateListener() {
    return this.teamListSub.asObservable();
  }

  getTeamById(_id: number) {
    try {
      this.http
        .get<{ message:string, team: TeamsModel}>(
          'http://localhost:3000/takimlar/' + _id
        )
        .subscribe({
          next: (data) => {
            this.team = data.team;
            this.teamSub.next(this.team);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getTeamByIdUpdateListener() {
    return this.teamSub.asObservable();
  }

}
