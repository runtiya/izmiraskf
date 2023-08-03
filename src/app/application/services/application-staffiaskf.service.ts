import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";

import { StaffIzmirAskfModel } from "../models/application-staffizmiraskf.model";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class StaffIASKFService {
  private staffList: StaffIzmirAskfModel[] = [];
  private staffListUpdated = new Subject<StaffIzmirAskfModel[]>();


  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getStaff() {
    try {
      this.http
      .get<{data: any}>(
        'http://localhost:3000/izmiraskf/yonetim-kurulu'
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
