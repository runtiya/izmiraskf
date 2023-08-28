import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";

import { StaffIzmirAskfModel } from "../models/admin-staffizmiraskf.model";

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
      .get<{data: StaffIzmirAskfModel[]}>(
        'http://localhost:3000/admin/izmiraskf/yonetim-kurulu'
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

  createStaff(staffInfo: StaffIzmirAskfModel) {
    try {
      const formData = new FormData();
      formData.append('image', staffInfo.imageAttachment);
      formData.append('staffInfo', JSON.stringify(staffInfo));

      this.http
        .post<{data: StaffIzmirAskfModel}>(
          'http://localhost:3000/admin/izmiraskf/yonetim-kurulu', formData
        )
        .subscribe({
          next: (data) => {
            staffInfo = data.data;
            this.staffList.push(staffInfo);
            this.staffListUpdated.next([...this.staffList]);
            this.globalFunctions.showSnackBar("server.success");
          },
          error: (error) => {
            console.log(error)
            this.globalFunctions.showSnackBar('server.error');
          }
        });
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }

  }

  updateStaff(staffInfo: StaffIzmirAskfModel) {
    try {
      const formData = new FormData();
      formData.append('image', staffInfo.imageAttachment);
      formData.append('staffInfo', JSON.stringify(staffInfo));

      this.http
        .put<{ data: StaffIzmirAskfModel }>(
          'http://localhost:3000/admin/izmiraskf/yonetim-kurulu/' + staffInfo.id, formData
        )
        .subscribe({
          next: (data) => {
            // Replace updated object with the old one
            this.staffList.forEach((item, i) => {
              if (item.id == staffInfo.id) {
                this.staffList[i] = data.data;
              }
            });
            this.staffListUpdated.next([...this.staffList]);
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

  deleteStaff(staffId: number) {
    try {
      this.http
        .delete<{ }>(
          'http://localhost:3000/admin/izmiraskf/yonetim-kurulu/' + staffId
        )
        .subscribe({
          next: (data) => {
            const filteredStaffList = this.staffList.filter(staffList => staffList.id !== staffId);
            this.staffList = filteredStaffList;
            this.staffListUpdated.next([...this.staffList]);
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
