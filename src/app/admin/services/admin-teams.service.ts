import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsModel } from "../models/admin-teams.model";

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private teamList: TeamsModel[] = [];
  private teamListSub = new Subject<TeamsModel[]>();

  constructor(private http: HttpClient) { }

  getTeams() {
    try {
      this.http
        .get<{ error: boolean, message: string, teamList: TeamsModel[] }>(
          'http://localhost:3000/admin/takimlar'
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
        .post<{ error: boolean, message: string, teamId: number }>(
          'http://localhost:3000/admin/takimlar', formData
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              teamInfo.id = data.teamId;
              this.teamList.push(teamInfo);
              this.teamListSub.next([...this.teamList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  updateTeam(teamInfo: TeamsModel) {
    try {
      const formData = new FormData();
      formData.append('image', teamInfo.imageAttachment);
      formData.append('teamInfo', JSON.stringify(teamInfo));

      this.http
        .put<{ error: boolean, message: string }>(
          'http://localhost:3000/admin/takimlar/' + teamInfo.id, formData,
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              // Replace updated object with the old one
              this.teamList.forEach((item, i) => {
                if (item.id == teamInfo.id) {
                  this.teamList[i] = teamInfo;
                }
              });
              this.teamListSub.next([...this.teamList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  deleteTeam(teamId: number) {
    try {
      this.http
        .delete<{ error: boolean, message: string }>(
          'http://localhost:3000/admin/takimlar/' + teamId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              const filteredTeamList = this.teamList.filter(team => team.id !== teamId);
              this.teamList = filteredTeamList;
              this.teamListSub.next([...this.teamList]);
            }
            else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }
}
