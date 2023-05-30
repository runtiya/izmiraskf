import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";


import { StaffITFFModel } from "../models/application-staffizmirtff.model";

@Injectable({ providedIn: 'root' })
export class StaffITFFService {
  private staffList: StaffITFFModel[] = [];
  private staffListUpdated = new Subject<StaffITFFModel[]>();


  constructor(private http: HttpClient) { }

  getStaff() {
    try {
      this.http
        .get<{ error: boolean, message: string, staffList: StaffITFFModel[] }>(
          'http://localhost:3000/tffiltemsilciligi/yonetim-kurulu'
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
