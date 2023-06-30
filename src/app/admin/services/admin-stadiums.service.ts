import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { StadiumsModel } from "../models/admin-stadiums.model";

@Injectable({providedIn: 'root'})
export class StadiumsService {
  private stadiumList: StadiumsModel[] = [];
  private stadiumListSub = new Subject<StadiumsModel[]>();

  constructor(private http: HttpClient) {}

  getStadiums() {
    try {
      this.http
        .get<{error: boolean, message: string, stadiums: StadiumsModel[]}>(
          'http://localhost:3000/admin/sahalar'
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.stadiumList = data.stadiums;
              this.stadiumListSub.next([...this.stadiumList]);
            } else {

            }
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
        .post<{error: boolean, message: string, stadiumId: number}>(
          'http://localhost:3000/admin/sahalar', formData
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              stadiumInfo.id = data.stadiumId;
              this.stadiumList.push(stadiumInfo);
              this.stadiumListSub.next([...this.stadiumList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  updateStadium(stadiumInfo: StadiumsModel) {
    try {
      const formData = new FormData();
      formData.append('image', stadiumInfo.imageAttachment);
      formData.append('stadiumInfo', JSON.stringify(stadiumInfo));

      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/sahalar/' + stadiumInfo.id, formData
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              // Replace updated object with the old one
              let index = this.stadiumList.findIndex(s => s.id == stadiumInfo.id);
              this.stadiumList[index] = stadiumInfo;
              this.stadiumListSub.next([...this.stadiumList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  deleteStadium(stadiumId: number) {
    try {
      this.http
        .delete<{error: boolean, message: string}>(
          'http://localhost:3000/admin/sahalar/' + stadiumId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {

              const filteredStadiumList = this.stadiumList.filter(stadium => stadium.id !== stadiumId);
              this.stadiumList = filteredStadiumList;
              this.stadiumListSub.next([...this.stadiumList]);
            }
            else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }


}
