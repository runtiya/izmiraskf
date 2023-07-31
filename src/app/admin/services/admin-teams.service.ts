import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsModel } from "../models/admin-teams.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private teamList: TeamsModel[] = [];
  private teamListSub = new Subject<TeamsModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getTeams() {
    try {
      this.http
        .get<{ teamList: TeamsModel[] }>(
          'http://localhost:3000/admin/takimlar'
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

  getTeamById(teamId: number) {

  }

  getTeamListUpdateListener() {
    return this.teamListSub.asObservable();
  }

  createTeam(teamInfo: TeamsModel) {
    try {
      const formData = new FormData();
      formData.append('image', teamInfo.imageAttachment);
      formData.append('teamInfo', JSON.stringify(teamInfo));

      this.http
        .post<{ teamId: number }>(
          'http://localhost:3000/admin/takimlar', formData
        )
        .subscribe({
          next: (data) => {
            teamInfo.id = data.teamId;
            this.teamList.push(teamInfo);
            this.teamListSub.next([...this.teamList]);
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
            this.teamList.forEach((item, i) => {
              if (item.id == teamInfo.id) {
                this.teamList[i] = teamInfo;
              }
            });
            this.teamListSub.next([...this.teamList]);
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
            const filteredTeamList = this.teamList.filter(team => team.id !== teamId);
            this.teamList = filteredTeamList;
            this.teamListSub.next([...this.teamList]);
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
