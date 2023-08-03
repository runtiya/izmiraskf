import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { StadiumsModel } from "../models/admin-stadiums.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class StadiumsService {
  private stadiumList: StadiumsModel[] = [];
  private stadiumListSub = new Subject<StadiumsModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getStadiums() {
    try {
      this.http
        .get<{data: StadiumsModel[]}>(
          'http://localhost:3000/admin/sahalar'
        )
        .subscribe({
          next: (data) => {
            this.stadiumList = data.data;
            this.stadiumListSub.next([...this.stadiumList]);
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getStadiumListUpdateListener() {
    return this.stadiumListSub.asObservable();
  }

  createStadium(stadiumInfo: StadiumsModel) {
    try {
      const formData = new FormData();
      formData.append('image', stadiumInfo.imageAttachment);
      formData.append('stadiumInfo', JSON.stringify(stadiumInfo));

      this.http
        .post<{data: number}>(
          'http://localhost:3000/admin/sahalar', formData
        )
        .subscribe({
          next: (data) => {
            stadiumInfo.id = data.data;
            this.stadiumList.push(stadiumInfo);
            this.stadiumListSub.next([...this.stadiumList]);
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

  updateStadium(stadiumInfo: StadiumsModel) {
    try {
      const formData = new FormData();
      formData.append('image', stadiumInfo.imageAttachment);
      formData.append('stadiumInfo', JSON.stringify(stadiumInfo));

      this.http
        .put<{ }>(
          'http://localhost:3000/admin/sahalar/' + stadiumInfo.id, formData
        )
        .subscribe({
          next: (data) => {
            // Replace updated object with the old one
            let index = this.stadiumList.findIndex(s => s.id == stadiumInfo.id);
            this.stadiumList[index] = stadiumInfo;
            this.stadiumListSub.next([...this.stadiumList]);
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

  deleteStadium(stadiumId: number) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/sahalar/' + stadiumId
        )
        .subscribe({
          next: (data) => {
            const filteredStadiumList = this.stadiumList.filter(stadium => stadium.id !== stadiumId);
            this.stadiumList = filteredStadiumList;
            this.stadiumListSub.next([...this.stadiumList]);
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
