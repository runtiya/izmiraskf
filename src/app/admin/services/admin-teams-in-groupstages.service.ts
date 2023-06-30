import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsInGroupstagesModel } from "../models/admin-teams-in-groupstages.model";
import { TeamsModel } from "../models/admin-teams.model";

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
        .get<{error: boolean, message: string, teamsingroupstagesList: TeamsInGroupstagesModel[]}>(
          'http://localhost:3000/admin/grup-takim-eslesmeleri/' + groupstageId
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


  createTeamsInGroupstages(teamsInGroupstagesList: TeamsInGroupstagesModel[], groupstageSelectionId: number) {
    try {
      this.http
        .post<{error: boolean, message: string, teamsList: TeamsInGroupstagesModel[]}>(
          'http://localhost:3000/admin/grup-takim-eslesmeleri/' + groupstageSelectionId, teamsInGroupstagesList
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.teamsingroupstagesList = teamsInGroupstagesList;
              !!this.teamsingroupstagesList ? this.teamsingroupstagesListSub.next([...this.teamsingroupstagesList]) : this.teamsingroupstagesListSub.next([]);
              this.globalFunctions.showSnackBar.next("İşlem Tamamlandı!");
            } else {
              this.globalFunctions.showSnackBar.next("Dikkat! İşlem Tamamlanamadı!");
            }
          },
          error: (error) => {
            this.globalFunctions.showSnackBar.next("HATA! İşlem Tamamlanamadı!");
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar.next("HATA! İşlem Tamamlanamadı!");
    }
  }

  updateTeamsInGroupstages(teamInfo: TeamsInGroupstagesModel) {
    try {
      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/grup-takim-eslesmeleri', teamInfo
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.teamsingroupstagesList.forEach((item, i) => {
                if (item.id == teamInfo.id) {
                  this.teamsingroupstagesList[i]["isExpelled"] = teamInfo.isExpelled;
                  this.teamsingroupstagesList[i]["isReceded"] = teamInfo.isReceded;
                  this.teamsingroupstagesList[i]["weekofExpelledorReceded"] = teamInfo.weekofExpelledorReceded;
                  this.teamsingroupstagesList[i]["explanation"] = teamInfo.explanation;
                }
                this.teamsingroupstagesListSub.next([...this.teamsingroupstagesList]);
              })
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }
}
