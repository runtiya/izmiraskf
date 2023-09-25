import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DisciplinaryBoardFileModel } from "../models/admin-disciplinaryboardfiles.model";
import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class DisciplinaryBoardFilesService {

  private disciplinaryBoardFileList: DisciplinaryBoardFileModel[] = [];
  private disciplinaryBoardFileListSub = new Subject<DisciplinaryBoardFileModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getDisciplinaryBoardFiles(seasonId: number, caseType: string) {
    this.http
      .get<{ data: DisciplinaryBoardFileModel[] }>(
        environment.serverUrl + "admin/disciplinary-board-files/" + seasonId + '/' + caseType
      )
      .subscribe({
        next: (data) => {
          this.disciplinaryBoardFileList = data.data;
          this.disciplinaryBoardFileList.length > 0 ? this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]) : this.disciplinaryBoardFileListSub.next([]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getDisciplinaryBoardFilesUpdateListener() {
    return this.disciplinaryBoardFileListSub.asObservable();
  }

  createDisciplinaryBoardFile(disciplinaryBoardFileInfo: DisciplinaryBoardFileModel) {
    const requestData = disciplinaryBoardFileInfo;
    this.http
      .post<{ data: DisciplinaryBoardFileModel }>(
        environment.serverUrl + "admin/disciplinary-board-files", requestData
      )
      .subscribe({
        next: (responseData) => {
          this.disciplinaryBoardFileList.push(responseData.data);
          this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]);
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateDisciplinaryBoardFile(disciplinaryBoardFileInfo: DisciplinaryBoardFileModel) {
    const requestData = disciplinaryBoardFileInfo;
    this.http
      .put<{ data: DisciplinaryBoardFileModel }>(
        environment.serverUrl + "admin/disciplinary-board-files/" + disciplinaryBoardFileInfo.id, requestData
      )
      .subscribe({
        next: (responseData) => {
          this.disciplinaryBoardFileList.forEach((item, i) => {
            if (item.id == requestData.id) {
              this.disciplinaryBoardFileList[i] = responseData.data;
            }
          });
          this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]);
          this.globalFunctions.showSnackBar("system.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  deleteDisciplinaryBoardFile(disciplinaryBoardFileId: number) {
    this.http
      .delete<{ }>(
        environment.serverUrl + "admin/disciplinary-board-files/" + disciplinaryBoardFileId
      )
      .subscribe({
        next: (data) => {
          const filteredDisciplinaryBoardFileList = this.disciplinaryBoardFileList.filter(file => file.id !== disciplinaryBoardFileId);
          this.disciplinaryBoardFileList = filteredDisciplinaryBoardFileList;
          this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]);
          this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }
}
