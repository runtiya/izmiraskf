import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { concatMap, map } from "rxjs/operators";

import { PointBoardModel } from "../models/application-pointboard.model";

import { GroupStagesService } from "../services/application-groupstages.service";

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
    if (_matchWeek == null) {
      this.groupstageService.getPlayedLastMatchWeek(_groupstageId)
        .subscribe({
          next: (data) => {
            _matchWeek = data.data;
            this.getCurrentPointBoard(_groupstageId, _matchWeek)
              .subscribe((data) => {
                this.pointBoardList = data.data;
                this.pointBoardListSub.next([...this.pointBoardList]);
              });
          },
          error: (error) => {
            this.globalFunctions.showSnackBar(error);
          }
        });
    } else {
      this.getCurrentPointBoard(_groupstageId, _matchWeek)
        .subscribe({
          next: (data) => {
            this.pointBoardList = data.data;
            this.pointBoardListSub.next([...this.pointBoardList]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar(error);
          }
        });
    }
  }

  getPointBoardUpdateListener() {
    return this.pointBoardListSub.asObservable();
  }

  getCurrentPointBoard(_groupstageId: number, _matchWeek: number): Observable<any> {
    return this.http.get<{data: PointBoardModel[]}>(
      'http://localhost:3000/puan-tablosu/' + _groupstageId + '/' + _matchWeek
      );
  }
}
