import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsModel } from "../models/admin-teams.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private teamsList: TeamsModel[] = [];
  private teamsCount: number = 0;
  private teamsListSub = new Subject<{teamsList: TeamsModel[], teamsCount: number}>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getTeams(paginationPageSize?: number, paginationCurrentPage?: number) {
    try {
      this.http
        .get<{ data: {teamsList: TeamsModel[], teamsCount: number} }>(
          `http://localhost:3000/admin/takimlar?paginationPageSize=${paginationPageSize}&paginationCurrentPage=${paginationCurrentPage}`
        )
        .subscribe({
          next: (data) => {
            this.teamsList = data.data.teamsList;
            this.teamsCount = data.data.teamsCount;
            this.teamsListSub.next(data.data);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getTeamById(teamId: number) {

  }

  getTeamsListUpdateListener() {
    return this.teamsListSub.asObservable();
  }

  createTeam(teamInfo: TeamsModel) {
    try {
      const formData = new FormData();
      formData.append('image', teamInfo.imageAttachment);
      formData.append('teamInfo', JSON.stringify(teamInfo));

      this.http
        .post<{ data: number }>(
          'http://localhost:3000/admin/takimlar', formData
        )
        .subscribe({
          next: (data) => {
            teamInfo.id = data.data;
            this.teamsList.push(teamInfo);
            this.teamsCount++;
            this.teamsListSub.next({teamsList: this.teamsList, teamsCount: this.teamsCount});
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

  updateTeam(teamInfo: TeamsModel) {
    try {
      const formData = new FormData();
      formData.append('image', teamInfo.imageAttachment);
      formData.append('teamInfo', JSON.stringify(teamInfo));

      this.http
        .put<{ }>(
          'http://localhost:3000/admin/takimlar/' + teamInfo.id, formData,
        )
        .subscribe({
          next: (data) => {
            // Replace updated object with the old one
            this.teamsList.forEach((item, i) => {
              if (item.id == teamInfo.id) {
                this.teamsList[i] = teamInfo;
              }
            });
            this.teamsListSub.next({teamsList: this.teamsList, teamsCount: this.teamsCount});
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

  deleteTeam(teamId: number) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/takimlar/' + teamId
        )
        .subscribe({
          next: (data) => {
            const filteredteamsList = this.teamsList.filter(team => team.id !== teamId);
            this.teamsList = filteredteamsList;
            this.teamsCount--;
            this.teamsListSub.next({teamsList: this.teamsList, teamsCount: this.teamsCount});
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
