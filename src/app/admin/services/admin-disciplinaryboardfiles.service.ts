import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";


import { DisciplinaryBoardFileModel } from "../models/admin-disciplinaryboardfiles.model";

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
          'http://localhost:3000/admin/disiplin-kurulu-dosyalari/' + seasonId + '/' + caseType
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.disciplinaryBoardFileList = data.disciplinaryBoardFileList;
              this.disciplinaryBoardFileList.length > 0 ? this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]) : this.disciplinaryBoardFileListSub.next([]);
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

  createDisciplinaryBoardFile(disciplinaryBoardFileInfo: DisciplinaryBoardFileModel) {
    try {
      this.http
        .post<{ error: boolean, message: string, disciplinaryBoardFileId: number }>(
          'http://localhost:3000/admin/disiplin-kurulu-dosyalari', disciplinaryBoardFileInfo
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              disciplinaryBoardFileInfo.id = data.disciplinaryBoardFileId;
              this.disciplinaryBoardFileList.push(disciplinaryBoardFileInfo);
              this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  updateDisciplinaryBoardFile(disciplinaryBoardFileInfo: DisciplinaryBoardFileModel) {
    try {
      this.http
        .put<{ error: boolean, message: string }>(
          'http://localhost:3000/admin/disiplin-kurulu-dosyalari/' + disciplinaryBoardFileInfo.id, disciplinaryBoardFileInfo
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.disciplinaryBoardFileList.forEach((item, i) => {
                if (item.id == disciplinaryBoardFileInfo.id) {
                  this.disciplinaryBoardFileList[i] = disciplinaryBoardFileInfo;
                }
              });
              this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  deleteDisciplinaryBoardFile(disciplinaryBoardFileId: number) {
    try {
      this.http
        .delete<{ error: boolean, message: string }>(
          'http://localhost:3000/admin/disiplin-kurulu-dosyalari/' + disciplinaryBoardFileId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              const filteredDisciplinaryBoardFileList = this.disciplinaryBoardFileList.filter(file => file.id !== disciplinaryBoardFileId);
              this.disciplinaryBoardFileList = filteredDisciplinaryBoardFileList;
              this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]);
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
