import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsModel } from "../models/application-teams.model";

import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private teamList: TeamsModel[] = [];
  private teamListSub = new Subject<{teamsList: TeamsModel[], teamsCount: number}>();

  private team: TeamsModel;
  private teamSub = new Subject<TeamsModel>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getTeams(paginationPageSize: number, paginationCurrentPage: number) {
    this.http
      .get<{ data: {teamsList: TeamsModel[], teamsCount: number} }>(
        environment.serverUrl + `teams?paginationPageSize=${paginationPageSize}&paginationCurrentPage=${paginationCurrentPage}`
      )
      .subscribe({
        next: (data) => {
          this.teamList = data.data.teamsList;
          this.teamListSub.next(data.data);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getTeamsListUpdateListener() {
    return this.teamListSub.asObservable();
  }

  getTeamById(_id: number) {
    this.http
      .get<{ data: TeamsModel}>(
        environment.serverUrl + "teams/" + _id
      )
      .subscribe({
        next: (data) => {
          this.team = data.data;
          this.teamSub.next(this.team);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getTeamByIdUpdateListener() {
    return this.teamSub.asObservable();
  }

}
