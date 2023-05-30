import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { concatMap, map } from "rxjs/operators";

import { PointBoardModel } from "../models/admin-pointboard.model";

import { GroupStagesService } from "../services/admin-groupstages.service";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class PointBoardService {
  private pointBoardList: PointBoardModel[] = [];
  private pointBoardListSub = new Subject<PointBoardModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions,
    private groupstageService: GroupStagesService
  ) {}

  getPointBoard(_groupstageId: number, _matchWeek: number) {
    try {
      this.globalFunctions.showSpinner.next(true);
      if (_matchWeek == null) {
        this.groupstageService.getPlayedLastMatchWeek(_groupstageId)
          .subscribe({
            next: (data) => {
              if (!data.error) {
                _matchWeek = data.matchWeek;
                this.getCurrentPointBoard(_groupstageId, _matchWeek)
                  .subscribe((data) => {
                    if (!data.error) {
                      this.pointBoardList = data.pointBoard;
                      this.pointBoardListSub.next([...this.pointBoardList]);
                      this.globalFunctions.showSpinner.next(false);
                    } else {
                      this.globalFunctions.showSpinner.next(false);
                      this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
                    }
                  });
              } else {
                throw data.error;
              }
            },
            error: (error) => {

            }
          });
      } else {
        this.getCurrentPointBoard(_groupstageId, _matchWeek)
          .subscribe({
            next: (data) => {
              if (!data.error) {
                this.pointBoardList = data.pointBoard;
                this.pointBoardListSub.next([...this.pointBoardList]);
                this.globalFunctions.showSpinner.next(false);
              } else {
                this.globalFunctions.showSpinner.next(false);
                this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
              }
            },
            error: (error) => {

            }
          });
      }
    } catch (error) {

      this.globalFunctions.showSpinner.next(false);
      this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
    }
  }

  getPointBoardUpdateListener() {
    return this.pointBoardListSub.asObservable();
  }

  getCurrentPointBoard(_groupstageId: number, _matchWeek: number): Observable<any> {
    return this.http.get<{error: boolean, message: string, pointBoard: PointBoardModel[]}>(
      'http://localhost:3000/admin/puan-durumu/' + _groupstageId + '/' + _matchWeek
      );
  }
}
