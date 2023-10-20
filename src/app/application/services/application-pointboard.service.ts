import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";

import { PointBoardModel } from "../models/application-pointboard.model";

import { GroupStagesService } from "../services/application-groupstages.service";

import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

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
            this.pointBoardListSub.next(<PointBoardModel[]>{});
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
            this.pointBoardListSub.next(<PointBoardModel[]>{});
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
      environment.serverUrl + "point-board/" + _groupstageId + "/" + _matchWeek
      );
  }
}
