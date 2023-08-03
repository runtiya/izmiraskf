import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";

import { StaffITFFModel } from "../models/application-staffizmirtff.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({ providedIn: 'root' })
export class StaffITFFService {
  private staffList: StaffITFFModel[] = [];
  private staffListUpdated = new Subject<StaffITFFModel[]>();


  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getStaff() {
    try {
      this.http
        .get<{ data: StaffITFFModel[] }>(
          'http://localhost:3000/tffiltemsilciligi/yonetim-kurulu'
        )
        .subscribe({
          next: (data) => {
            this.staffList = data.data;
            this.staffListUpdated.next([...this.staffList]);
          },
          error: (error) => {
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }

  }

  getStaffListUpdateListener() {
    return this.staffListUpdated.asObservable();
  }

}
