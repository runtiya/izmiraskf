import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DisciplinaryBoardDecisionModel } from "../models/admin-disciplinaryboarddecisions.model";
import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class DisciplinaryBoardDecisionsService {
  private disciplinaryBoardDecisionList: DisciplinaryBoardDecisionModel[] = [];
  private disciplinaryBoardDecisionListSub = new Subject<DisciplinaryBoardDecisionModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getDisciplinaryBoardDecisions(disciplinaryBoardFileId: number) {
    this.http
      .get<{ data: DisciplinaryBoardDecisionModel[] }>(
        environment.serverUrl + "admin/disciplinary-board-decisions/" + disciplinaryBoardFileId
      )
      .subscribe({
        next: (data) => {
          this.disciplinaryBoardDecisionList = data.data;
          !!this.disciplinaryBoardDecisionList ? this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]) : this.disciplinaryBoardDecisionListSub.next([]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getDisciplinaryBoardDecisionsUpdateListener() {
    return this.disciplinaryBoardDecisionListSub.asObservable();
  }

  createDisciplinaryBoardDecision(disciplinaryBoardDecisionInfo: DisciplinaryBoardDecisionModel) {
    const requestData = disciplinaryBoardDecisionInfo;
    this.http
      .post<{ data: DisciplinaryBoardDecisionModel }>(
        environment.serverUrl + "admin/disciplinary-board-decisions", requestData
      )
      .subscribe({
        next: (responseData) => {
          this.disciplinaryBoardDecisionList.push(responseData.data);
          this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]);
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateDisciplinaryBoardDecision(disciplinaryBoardDecisionInfo: DisciplinaryBoardDecisionModel) {
    const requestData = disciplinaryBoardDecisionInfo;
    this.http
      .put<{ data: DisciplinaryBoardDecisionModel }>(
        environment.serverUrl + "admin/disciplinary-board-decisions/" + requestData.id, requestData
      )
      .subscribe({
        next: (responseData) => {
          this.disciplinaryBoardDecisionList.forEach((item, i) => {
            if (item.id == requestData.id) {
              this.disciplinaryBoardDecisionList[i] = responseData.data;
            }
          });
          this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]);
          this.globalFunctions.showSnackBar("server.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  deleteDisciplinaryBoardDecision(disciplinaryBoardDecisionId: number) {
    this.http
      .delete<{ }>(
        environment.serverUrl + "admin/disciplinary-board-decisions/" + disciplinaryBoardDecisionId
      )
      .subscribe({
        next: (data) => {
          const filteredDisciplinaryBoardDecisionList = this.disciplinaryBoardDecisionList.filter(decision => decision.id !== disciplinaryBoardDecisionId);
          this.disciplinaryBoardDecisionList = filteredDisciplinaryBoardDecisionList;
          this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]);
          this.globalFunctions.showSnackBar("server.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  clearDisciplinaryBoardDecisions(disciplinaryBoardFileId: number) {
    this.http
      .delete<{ }>(
        environment.serverUrl + "admin/disciplinary-board-decisions/temizle/" + disciplinaryBoardFileId
      )
      .subscribe({
        next: (data) => {
          this.disciplinaryBoardDecisionList = [];
          this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]);
          this.globalFunctions.showSnackBar("server.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }
}
