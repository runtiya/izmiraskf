import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DisciplinaryBoardDecisionModel } from "../models/admin-disciplinaryboarddecisions.model";
import { globalFunctions } from "../../functions/global.function";
@Injectable({ providedIn: 'root' })
export class DisciplinaryBoardDecisionsService {

  private disciplinaryBoardDecisionList: DisciplinaryBoardDecisionModel[] = [];
  private disciplinaryBoardDecisionListSub = new Subject<DisciplinaryBoardDecisionModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {

  }

  getDisciplinaryBoardDecisions(disciplinaryBoardFileId: number) {
    try {
      this.http
        .get<{ data: DisciplinaryBoardDecisionModel[] }>(
          'http://localhost:3000/admin/disiplin-kurulu-kararlari/' + disciplinaryBoardFileId
        )
        .subscribe({
          next: (data) => {
            this.disciplinaryBoardDecisionList = data.data;
            !!this.disciplinaryBoardDecisionList ? this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]) : this.disciplinaryBoardDecisionListSub.next([]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getDisciplinaryBoardDecisionsUpdateListener() {
    return this.disciplinaryBoardDecisionListSub.asObservable();
  }


  createDisciplinaryBoardDecision(disciplinaryBoardDecisionInfo: DisciplinaryBoardDecisionModel) {
    try {
      this.http
        .post<{ data: number }>(
          'http://localhost:3000/admin/disiplin-kurulu-kararlari', disciplinaryBoardDecisionInfo
        )
        .subscribe({
          next: (data) => {
            disciplinaryBoardDecisionInfo.id = data.data;
            this.disciplinaryBoardDecisionList.push(disciplinaryBoardDecisionInfo);
            this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]);
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


  updateDisciplinaryBoardDecision(disciplinaryBoardDecisionInfo: DisciplinaryBoardDecisionModel) {
    try {
      this.http
        .put<{ }>(
          'http://localhost:3000/admin/disiplin-kurulu-kararlari/' + disciplinaryBoardDecisionInfo.id, disciplinaryBoardDecisionInfo
        )
        .subscribe({
          next: (data) => {
            this.disciplinaryBoardDecisionList.forEach((item, i) => {
              if (item.id == disciplinaryBoardDecisionInfo.id) {
                this.disciplinaryBoardDecisionList[i] = disciplinaryBoardDecisionInfo;
              }
            });
            this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]);
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

  deleteDisciplinaryBoardDecision(disciplinaryBoardDecisionId: number) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/disiplin-kurulu-kararlari/' + disciplinaryBoardDecisionId
        )
        .subscribe({
          next: (data) => {
            const filteredDisciplinaryBoardDecisionList = this.disciplinaryBoardDecisionList.filter(decision => decision.id !== disciplinaryBoardDecisionId);
            this.disciplinaryBoardDecisionList = filteredDisciplinaryBoardDecisionList;
            this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]);
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

  clearDisciplinaryBoardDecisions(disciplinaryBoardFileId: number) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/disiplin-kurulu-kararlari/temizle/' + disciplinaryBoardFileId
        )
        .subscribe({
          next: (data) => {
            this.disciplinaryBoardDecisionList = [];
            this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]);
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
