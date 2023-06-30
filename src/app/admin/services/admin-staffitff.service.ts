import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";


import { StaffITFFModel } from "../models/admin-staffizmirtff.model";

@Injectable({ providedIn: 'root' })
export class StaffITFFService {
  private staffList: StaffITFFModel[] = [];
  private staffListUpdated = new Subject<StaffITFFModel[]>();


  constructor(private http: HttpClient) { }

  getStaff() {
    try {
      this.http
        .get<{ error: boolean, message: string, staffList: StaffITFFModel[] }>(
          'http://localhost:3000/admin/tffiltemsilciligi/yonetim-kurulu'
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

  createStaff(staffInfo: StaffITFFModel) {
    try {
      const formData = new FormData();
      formData.append('image', staffInfo.imageAttachment);
      formData.append('staffInfo', JSON.stringify(staffInfo));

      this.http
        .post<{ error: boolean, message: string, staffId: number }>(
          'http://localhost:3000/admin/tffiltemsilciligi/yonetim-kurulu', formData
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              staffInfo.id = data.staffId;
              this.staffList.push(staffInfo);
              this.staffListUpdated.next([...this.staffList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }

  }


  updateStaff(staffInfo: StaffITFFModel) {
    try {
      const formData = new FormData();
      formData.append('image', staffInfo.imageAttachment);
      formData.append('staffInfo', JSON.stringify(staffInfo));

      this.http
        .put<{ error: boolean, message: string }>(
          'http://localhost:3000/admin/tffiltemsilciligi/yonetim-kurulu/' + staffInfo.id, formData
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              // Replace updated object with the old one
              this.staffList.forEach((item, i) => {
                if (item.id == staffInfo.id) {
                  this.staffList[i] = staffInfo;
                }
              });

              this.staffListUpdated.next([...this.staffList]);
            }
            else {
              null;
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }

  }

  deleteStaff(staffId: number) {
    this.http
      .delete<{ error: boolean, message: string }>(
        'http://localhost:3000/admin/tffiltemsilciligi/yonetim-kurulu/' + staffId
      )
      .subscribe({
        next: (data) => {
          if (!data.error) {

            const filteredStaffList = this.staffList.filter(staff => staff.id !== staffId);
            this.staffList = filteredStaffList;
            this.staffListUpdated.next([...this.staffList]);
          } else {

          }
        },
        error: (error) => {

        }
      });
  }
}
