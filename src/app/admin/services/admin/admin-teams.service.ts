import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsModel } from "../../models/admin-teams.model";

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private teamList: TeamsModel[] = [];
  private teamListSub = new Subject<TeamsModel[]>();

  constructor(private http: HttpClient) { }

  /*
  getTeams() {
    try {
      this.http
        .get<{error: boolean, message: string, teamList: TeamsModel[]}>(
          'http://localhost:3000/admin/takimlar'
        )
        .subscribe((data) => {
          if (!data.error) {
            this.teamList = data.teamList;
            this.teamListSub.next([...this.teamList]);
          } else {
            console.log(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  */

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
              console.log(data.message);
            }
          },
          error: (error) => {
            console.log(error)
            this.teamList = [];
            this.teamListSub.next([]);
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
        .post<{ error: boolean, message: string, teamId: number }>(
          'http://localhost:3000/admin/takimlar', teamInfo
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              teamInfo.id = data.teamId;
              this.teamList.push(teamInfo);
              this.teamListSub.next([...this.teamList]);
            } else {
              console.log(data.message);
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  updateTeam(teamInfo: TeamsModel) {
    /*
    const postData = new FormData();
    const _teamInfo: {key: string, value: any}[] = [];

    for (const key in teamInfo) {
      if (teamInfo.hasOwnProperty(key)) {
        const value = teamInfo[key];
        _teamInfo.push({key, value});
      }
    }

    _teamInfo.forEach(element => {
      postData.append(element.key, JSON.stringify(element.value));

    });

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    */

    try {
      this.http
        .put<{ error: boolean, message: string }>(
          'http://localhost:3000/admin/takimlar/' + teamInfo.id, teamInfo,
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
              console.log(data.message);
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {
      console.log(error);
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
              console.log(data.message);
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}
