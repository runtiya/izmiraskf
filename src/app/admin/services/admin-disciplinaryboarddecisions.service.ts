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
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getDisciplinaryBoardDecisionsUpdateListener() {
    return this.disciplinaryBoardDecisionListSub.asObservable();
  }


  createDisciplinaryBoardDecision(disciplinaryBoardDecisionInfo: DisciplinaryBoardDecisionModel) {
    this.http
      .post<{ data: DisciplinaryBoardDecisionModel }>(
        'http://localhost:3000/admin/disiplin-kurulu-kararlari', disciplinaryBoardDecisionInfo
      )
      .subscribe({
        next: (data) => {
          this.disciplinaryBoardDecisionList.push(data.data);
          this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]);
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }


  updateDisciplinaryBoardDecision(disciplinaryBoardDecisionInfo: DisciplinaryBoardDecisionModel) {
    this.http
      .put<{ data: DisciplinaryBoardDecisionModel }>(
        'http://localhost:3000/admin/disiplin-kurulu-kararlari/' + disciplinaryBoardDecisionInfo.id, disciplinaryBoardDecisionInfo
      )
      .subscribe({
        next: (data) => {
          this.disciplinaryBoardDecisionList.forEach((item, i) => {
            if (item.id == disciplinaryBoardDecisionInfo.id) {
              this.disciplinaryBoardDecisionList[i] = data.data;
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
        'http://localhost:3000/admin/disiplin-kurulu-kararlari/' + disciplinaryBoardDecisionId
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
        'http://localhost:3000/admin/disiplin-kurulu-kararlari/temizle/' + disciplinaryBoardFileId
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
