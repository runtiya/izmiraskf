import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DisciplinaryBoardFileModel } from "../models/admin-disciplinaryboardfiles.model";
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
          'http://localhost:3000/admin/disiplin-kurulu-dosyalari/' + seasonId + '/' + caseType
        )
        .subscribe({
          next: (data) => {
            this.disciplinaryBoardFileList = data.data;
            this.disciplinaryBoardFileList.length > 0 ? this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]) : this.disciplinaryBoardFileListSub.next([]);
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

  createDisciplinaryBoardFile(disciplinaryBoardFileInfo: DisciplinaryBoardFileModel) {
    try {
      this.http
        .post<{ data: number }>(
          'http://localhost:3000/admin/disiplin-kurulu-dosyalari', disciplinaryBoardFileInfo
        )
        .subscribe({
          next: (data) => {
            disciplinaryBoardFileInfo.id = data.data;
            this.disciplinaryBoardFileList.push(disciplinaryBoardFileInfo);
            this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]);
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

  updateDisciplinaryBoardFile(disciplinaryBoardFileInfo: DisciplinaryBoardFileModel) {
    try {
      this.http
        .put<{ }>(
          'http://localhost:3000/admin/disiplin-kurulu-dosyalari/' + disciplinaryBoardFileInfo.id, disciplinaryBoardFileInfo
        )
        .subscribe({
          next: (data) => {
            this.disciplinaryBoardFileList.forEach((item, i) => {
              if (item.id == disciplinaryBoardFileInfo.id) {
                this.disciplinaryBoardFileList[i] = disciplinaryBoardFileInfo;
              }
            });
            this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]);
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

  deleteDisciplinaryBoardFile(disciplinaryBoardFileId: number) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/disiplin-kurulu-dosyalari/' + disciplinaryBoardFileId
        )
        .subscribe({
          next: (data) => {
            const filteredDisciplinaryBoardFileList = this.disciplinaryBoardFileList.filter(file => file.id !== disciplinaryBoardFileId);
            this.disciplinaryBoardFileList = filteredDisciplinaryBoardFileList;
            this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]);
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
