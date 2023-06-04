import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { StadiumsModel } from "../models/application-stadiums.model";

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
}
