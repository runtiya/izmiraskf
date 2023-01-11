import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsModel } from "../../models/admin-teams.model";

@Injectable({providedIn: 'root'})
export class TeamsService {
  private teamList: TeamsModel[] = [];
  private teamListSub = new Subject<TeamsModel[]>();

  constructor(private http: HttpClient) {}

  getTeams() {
    try {
      this.http
        .get<{error: boolean, message: string, teams: TeamsModel[]}>(
          'http://localhost:3000/admin/takimlar'
        )
        .subscribe((data) => {
          if (!data.error) {
            this.teamList = data.teams;
            this.teamListSub.next([...this.teamList]);
          } else {
            console.log(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  getTeamById(teamId: number) {

  }

  getTeamListSubListener() {
    return this.teamListSub.asObservable();
  }

  createTeam(teamInfo: TeamsModel) {
    try {
      this.http
        .post<{error: boolean, message: string, teamId: number}>(
          'http://localhost:3000/admin/takimlar', teamInfo
        )
        .subscribe((data) => {
          if (!data.error) {
            console.log(data.message);
            console.log(data.teamId);
            teamInfo.id = data.teamId;
            this.teamList.push(teamInfo);
            this.teamListSub.next([...this.teamList]);
          } else {
            console.log(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  updateTeam(teamInfo: TeamsModel) {
    try {
      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/takimlar/' + teamInfo.id, teamInfo
        )
        .subscribe((data) => {
          if (!data.error) {
            // Replace updated object with the old one
            this.teamList.forEach((item, i) => {
              if (item.id == teamInfo.id) {
                this.teamList[i] = teamInfo;
              }
            });
            this.teamListSub.next([...this.teamList]);
          } else {
            console.log(data.message);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  deleteTeam(teamId: number) {
    try {
      this.http
        .delete<{error: boolean, message: string}>(
          'http://localhost:3000/admin/takimlar/' + teamId
        )
        .subscribe((data) => {
          if (!data.error) {
            console.log(data.message);
            const filteredTeamList = this.teamList.filter(team => team.id !== teamId);
            this.teamList = filteredTeamList;
            this.teamListSub.next([...this.teamList]);
          }
          else {
            console.log(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }


}
