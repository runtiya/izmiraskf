import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";


import { DisciplinaryBoardFileModel } from "../models/application-disciplinaryboardfiles.model";

@Injectable({ providedIn: 'root' })
export class DisciplinaryBoardFilesService {

  private disciplinaryBoardFileList: DisciplinaryBoardFileModel[] = [];
  private disciplinaryBoardFileListSub = new Subject<DisciplinaryBoardFileModel[]>();

  constructor(private http: HttpClient) {

  }

  getDisciplinaryBoardFiles(seasonId: number, caseType: string) {
    try {
      this.http
        .get<{ error: boolean, message: string, disciplinaryBoardFileList: DisciplinaryBoardFileModel[] }>(
          'http://localhost:3000/disiplin-kurulu-dosyalari/' + seasonId + '/' + caseType
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.disciplinaryBoardFileList = data.disciplinaryBoardFileList;
              !!this.disciplinaryBoardFileList ? this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]) : this.disciplinaryBoardFileListSub.next([]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getDisciplinaryBoardFilesUpdateListener() {
    return this.disciplinaryBoardFileListSub.asObservable();
  }
}
