import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DisciplinaryBoardFileModel } from "../models/application-disciplinaryboardfiles.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({ providedIn: 'root' })
export class DisciplinaryBoardFilesService {

  private disciplinaryBoardFileList: DisciplinaryBoardFileModel[] = [];
  private disciplinaryBoardFileListSub = new Subject<DisciplinaryBoardFileModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getDisciplinaryBoardFiles(seasonId: number, caseType: string) {
    try {
      this.http
        .get<{ data: DisciplinaryBoardFileModel[] }>(
          'http://localhost:3000/disiplin-kurulu-dosyalari/' + seasonId + '/' + caseType
        )
        .subscribe({
          next: (data) => {
            this.disciplinaryBoardFileList = data.data;
            !!this.disciplinaryBoardFileList ? this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]) : this.disciplinaryBoardFileListSub.next([]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getDisciplinaryBoardFilesUpdateListener() {
    return this.disciplinaryBoardFileListSub.asObservable();
  }
}
