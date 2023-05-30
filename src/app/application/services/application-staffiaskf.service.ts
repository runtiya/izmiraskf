import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";


import { StaffIzmirAskfModel } from "../models/application-staffizmiraskf.model";

@Injectable({providedIn: 'root'})
export class StaffIASKFService {
  private staffList: StaffIzmirAskfModel[] = [];
  private staffListUpdated = new Subject<StaffIzmirAskfModel[]>();


  constructor(private http: HttpClient) {}

  getStaff() {
    try {
      this.http
      .get<{error: boolean, message: string, staffList: any}>(
        'http://localhost:3000/izmiraskf/yonetim-kurulu'
      )
      .subscribe({
        next: (data) => {
          if (!data.error) {
            this.staffList = data.staffList;
            this.staffListUpdated.next([...this.staffList]);
          } else {
            this.staffList = [];
            this.staffListUpdated.next([]);
          }

        },
        error: (error) => {

        }
      });
    } catch (error) {

    }

  }

  getStaffListUpdateListener() {
    return this.staffListUpdated.asObservable();
  }

}
