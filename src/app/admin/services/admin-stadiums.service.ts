import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { StadiumsModel } from "../models/admin-stadiums.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class StadiumsService {
  private stadiumsList: StadiumsModel[] = [];
  private stadiumsCount: number = 0;
  private stadiumsListSub = new Subject<{stadiumsList: StadiumsModel[], stadiumsCount: number}>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getStadiums(paginationPageSize?: number, paginationCurrentPage?: number) {
    this.http
      .get<{data: {stadiumsList: StadiumsModel[], stadiumsCount: number}}>(
        `http://localhost:3000/admin/sahalar?paginationPageSize=${paginationPageSize}&paginationCurrentPage=${paginationCurrentPage}`
      )
      .subscribe({
        next: (data) => {
          this.stadiumsList = data.data.stadiumsList;
          this.stadiumsCount = data.data.stadiumsCount;
          this.stadiumsListSub.next(data.data);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getStadiumListUpdateListener() {
    return this.stadiumsListSub.asObservable();
  }

  createStadium(stadiumInfo: StadiumsModel) {
    const formData = new FormData();
    formData.append('image', stadiumInfo.imageAttachment);
    formData.append('requestData', JSON.stringify(stadiumInfo));

    this.http
      .post<{data: StadiumsModel}>(
        'http://localhost:3000/admin/sahalar', formData
      )
      .subscribe({
        next: (responseData) => {
          stadiumInfo = responseData.data;
          this.stadiumsList.push(stadiumInfo);
          this.stadiumsCount++;
          this.stadiumsListSub.next({stadiumsList: this.stadiumsList, stadiumsCount: this.stadiumsCount});
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateStadium(stadiumInfo: StadiumsModel) {
    const formData = new FormData();
    formData.append('image', stadiumInfo.imageAttachment);
    formData.append('requestData', JSON.stringify(stadiumInfo));

    this.http
      .put<{data: StadiumsModel }>(
        'http://localhost:3000/admin/sahalar/' + stadiumInfo.id, formData
      )
      .subscribe({
        next: (responseData) => {
          // Replace updated object with the old one
          let index = this.stadiumsList.findIndex(s => s.id == stadiumInfo.id);
          this.stadiumsList[index] = responseData.data;
          this.stadiumsListSub.next({stadiumsList: this.stadiumsList, stadiumsCount: this.stadiumsCount});
          this.globalFunctions.showSnackBar("system.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  deleteStadium(stadiumId: number) {
    this.http
      .delete<{ }>(
        'http://localhost:3000/admin/sahalar/' + stadiumId
      )
      .subscribe({
        next: (data) => {
          const filteredStadiumList = this.stadiumsList.filter(stadium => stadium.id !== stadiumId);
          this.stadiumsList = filteredStadiumList;
          this.stadiumsCount--;
          this.stadiumsListSub.next({stadiumsList: this.stadiumsList, stadiumsCount: this.stadiumsCount});
          this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }


}
