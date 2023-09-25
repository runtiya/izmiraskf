import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { StaffITFFModel } from "../models/application-staffizmirtff.model";

import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class StaffITFFService {
  private staffList: StaffITFFModel[] = [];
  private staffListUpdated = new Subject<StaffITFFModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getStaff() {
    this.http
      .get<{ data: StaffITFFModel[] }>(
        environment.serverUrl + "tffiltemsilciligi/staff"
      )
      .subscribe({
        next: (data) => {
          this.staffList = data.data;
          this.staffListUpdated.next([...this.staffList]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getStaffListUpdateListener() {
    return this.staffListUpdated.asObservable();
  }

}
