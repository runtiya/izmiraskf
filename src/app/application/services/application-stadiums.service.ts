import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { StadiumsModel } from "../models/application-stadiums.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class StadiumsService {
  private stadiumsList: StadiumsModel[] = [];
  private stadiumsListSub = new Subject<{stadiumsList: StadiumsModel[], stadiumsCount: number }>();

  private stadium: StadiumsModel;
  private stadiumSub = new Subject<StadiumsModel>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getStadiums(paginationPageSize: number, paginationCurrentPage: number) {
    try {
      this.http
        .get<{data: {stadiumsList: StadiumsModel[], stadiumsCount: number }}>(
          `http://localhost:3000/sahalar?paginationPageSize=${paginationPageSize}&paginationCurrentPage=${paginationCurrentPage}`
        )
        .subscribe({
          next: (data) => {
            this.stadiumsList = data.data.stadiumsList;
            this.stadiumsListSub.next(data.data);
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
    return this.stadiumsListSub.asObservable();
  }

  getStadiumById(_id: number) {
    try {
      this.http
        .get<{ data: StadiumsModel}>(
          'http://localhost:3000/sahalar/' + _id
        )
        .subscribe({
          next: (data) => {
            this.stadium = data.data;
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
