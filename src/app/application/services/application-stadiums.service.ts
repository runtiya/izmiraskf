import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { StadiumsModel } from "../models/application-stadiums.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class StadiumsService {
  private stadiumList: StadiumsModel[] = [];
  private stadiumListSub = new Subject<StadiumsModel[]>();

  private stadium: StadiumsModel;
  private stadiumSub = new Subject<StadiumsModel>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getStadiums() {
    try {
      this.http
        .get<{stadiums: StadiumsModel[]}>(
          'http://localhost:3000/sahalar'
        )
        .subscribe({
          next: (data) => {
            this.stadiumList = data.stadiums;
            this.stadiumListSub.next([...this.stadiumList]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getStadiumListUpdateListener() {
    return this.stadiumListSub.asObservable();
  }

  getStadiumById(_id: number) {
    try {
      this.http
        .get<{ message:string, stadium: StadiumsModel}>(
          'http://localhost:3000/sahalar/' + _id
        )
        .subscribe({
          next: (data) => {
            this.stadium = data.stadium;
            this.stadiumSub.next(this.stadium);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getStadiumByIdUpdateListener() {
    return this.stadiumSub.asObservable();
  }
}
