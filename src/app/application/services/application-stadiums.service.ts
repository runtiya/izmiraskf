import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { StadiumsModel } from "../models/application-stadiums.model";

@Injectable({providedIn: 'root'})
export class StadiumsService {
  private stadiumList: StadiumsModel[] = [];
  private stadiumListSub = new Subject<StadiumsModel[]>();

  private stadium: StadiumsModel;
  private stadiumSub = new Subject<StadiumsModel>();

  constructor(private http: HttpClient) {}

  getStadiums() {
    try {
      this.http
        .get<{error: boolean, message: string, stadiums: StadiumsModel[]}>(
          'http://localhost:3000/sahalar'
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
        })
    } catch (error) {

    }
  }

  getStadiumListUpdateListener() {
    return this.stadiumListSub.asObservable();
  }

  getStadiumById(_id: number) {
    try {
      this.http
        .get<{error: boolean, message:string, stadium: StadiumsModel}>(
          'http://localhost:3000/sahalar/' + _id
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.stadium = data.stadium;
              this.stadiumSub.next(this.stadium);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }
  }

  getStadiumByIdUpdateListener() {
    return this.stadiumSub.asObservable();
  }
}
