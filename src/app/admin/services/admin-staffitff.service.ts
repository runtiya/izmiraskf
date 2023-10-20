import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { StaffITFFModel } from "../models/admin-staffizmirtff.model";

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
        environment.serverUrl + "admin/tffiltemsilciligi/staff"
      )
      .subscribe({
        next: (data) => {
          this.staffList = data.data;
          this.staffListUpdated.next([...this.staffList]);
        },
        error: (error) => {
          this.staffListUpdated.next(<StaffITFFModel[]>{});
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getStaffListUpdateListener() {
    return this.staffListUpdated.asObservable();
  }

  createStaff(staffInfo: StaffITFFModel) {
    const formData = new FormData();
    formData.append('image', staffInfo.imageAttachment);
    formData.append('requestData', JSON.stringify(staffInfo));

    this.http
      .post<{ data: StaffITFFModel }>(
        environment.serverUrl + "admin/tffiltemsilciligi/staff", formData
      )
      .subscribe({
        next: (responseData) => {
          this.staffList.push(responseData.data);
          this.staffListUpdated.next([...this.staffList]);
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateStaff(staffInfo: StaffITFFModel) {
    const formData = new FormData();
    formData.append('image', staffInfo.imageAttachment);
    formData.append('requestData', JSON.stringify(staffInfo));

    this.http
      .put<{ data: StaffITFFModel }>(
        environment.serverUrl + "admin/tffiltemsilciligi/staff/" + staffInfo.id, formData
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
          this.globalFunctions.showSnackBar("system.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  deleteStaff(staffId: number) {
    this.http
      .delete<{ }>(
        environment.serverUrl + "admin/tffiltemsilciligi/staff/" + staffId
      )
      .subscribe({
        next: (data) => {
          const filteredStaffList = this.staffList.filter(staff => staff.id !== staffId);
          this.staffList = filteredStaffList;
          this.staffListUpdated.next([...this.staffList]);
          this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }
}
