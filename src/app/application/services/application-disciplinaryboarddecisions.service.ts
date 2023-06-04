import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DisciplinaryBoardDecisionModel } from "../models/application-disciplinaryboarddecisions.model";

@Injectable({ providedIn: 'root' })
export class DisciplinaryBoardDecisionsService {

  private disciplinaryBoardDecisionList: DisciplinaryBoardDecisionModel[] = [];
  private disciplinaryBoardDecisionListSub = new Subject<DisciplinaryBoardDecisionModel[]>();


  constructor(private http: HttpClient) {

  }

  getDisciplinaryBoardDecisions(disciplinaryBoardFileId: number) {
    try {
      this.http
        .get<{ error: boolean, message: string, disciplinaryBoardDecisionList: DisciplinaryBoardDecisionModel[] }>(
          'http://localhost:3000/admin/disiplin-kurulu-kararlari/' + disciplinaryBoardFileId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.disciplinaryBoardDecisionList = data.disciplinaryBoardDecisionList;
              !!this.disciplinaryBoardDecisionList ? this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]) : this.disciplinaryBoardDecisionListSub.next([]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getDisciplinaryBoardDecisionsUpdateListener() {
    return this.disciplinaryBoardDecisionListSub.asObservable();
  }
}
