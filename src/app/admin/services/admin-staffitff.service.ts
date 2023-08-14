import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";

import { StaffITFFModel } from "../models/admin-staffizmirtff.model";

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
          'http://localhost:3000/admin/tffiltemsilciligi/tffiltemsilciligi'
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

  createStaff(staffInfo: StaffITFFModel) {
    try {
      const formData = new FormData();
      formData.append('image', staffInfo.imageAttachment);
      formData.append('staffInfo', JSON.stringify(staffInfo));

      this.http
        .post<{ data: number }>(
          'http://localhost:3000/admin/tffiltemsilciligi/tffiltemsilciligi', formData
        )
        .subscribe({
          next: (data) => {
            staffInfo.id = data.data;
            this.staffList.push(staffInfo);
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

  updateStaff(staffInfo: StaffITFFModel) {
    try {
      const formData = new FormData();
      formData.append('image', staffInfo.imageAttachment);
      formData.append('staffInfo', JSON.stringify(staffInfo));

      this.http
        .put<{ }>(
          'http://localhost:3000/admin/tffiltemsilciligi/tffiltemsilciligi/' + staffInfo.id, formData
        )
        .subscribe({
          next: (data) => {
            // Replace updated object with the old one
            this.staffList.forEach((item, i) => {
              if (item.id == staffInfo.id) {
                this.staffList[i] = staffInfo;
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
          'http://localhost:3000/admin/tffiltemsilciligi/tffiltemsilciligi/' + staffId
        )
        .subscribe({
          next: (data) => {
            const filteredStaffList = this.staffList.filter(staff => staff.id !== staffId);
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
