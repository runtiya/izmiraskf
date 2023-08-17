import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DisciplinaryBoardDecisionModel } from "../models/application-disciplinaryboarddecisions.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({ providedIn: 'root' })
export class DisciplinaryBoardDecisionsService {

  private disciplinaryBoardDecisionList: DisciplinaryBoardDecisionModel[] = [];
  private disciplinaryBoardDecisionListSub = new Subject<DisciplinaryBoardDecisionModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getDisciplinaryBoardDecisions(disciplinaryBoardFileId: number) {
    try {
      this.http
        .get<{ data: DisciplinaryBoardDecisionModel[] }>(
          'http://localhost:3000/disiplin-kurulu-kararlari/' + disciplinaryBoardFileId
        )
        .subscribe({
          next: (data) => {
            this.disciplinaryBoardDecisionList = data.data;
            this.disciplinaryBoardDecisionList.length > 0 ? this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]) : this.disciplinaryBoardDecisionListSub.next([]);
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
}
