import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";


import { StaffIzmirAskfModel } from "../models/admin-staffizmiraskf.model";

@Injectable({providedIn: 'root'})
export class StaffIASKFService {
  private staffList: StaffIzmirAskfModel[] = [];
  private staffListUpdated = new Subject<StaffIzmirAskfModel[]>();


  constructor(private http: HttpClient) {}

  getStaff() {
    try {
      this.http
      .get<{error: boolean, message: string, staffList: any}>(
        'http://localhost:3000/admin/izmiraskf/yonetim-kurulu'
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

  createStaff(staffInfo: StaffIzmirAskfModel) {
    try {
      const formData = new FormData();
      formData.append('image', staffInfo.imageAttachment);
      formData.append('staffInfo', JSON.stringify(staffInfo));

      this.http
        .post<{error: boolean, message: string, staffId: number}>(
          'http://localhost:3000/admin/izmiraskf/yonetim-kurulu', formData
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              staffInfo.id = data.staffId;
              this.staffList.push(staffInfo);
              this.staffListUpdated.next([...this.staffList]);
            } else {
              null;
            }
          },
          error: (error) => {

          }
        });
    } catch (error) {

    }

  }

  updateStaff(staffInfo: StaffIzmirAskfModel) {
    try {
      const formData = new FormData();
      formData.append('image', staffInfo.imageAttachment);
      formData.append('staffInfo', JSON.stringify(staffInfo));

      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/izmiraskf/yonetim-kurulu/' + staffInfo.id, formData
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
      .delete<{error: boolean, message: string}>(
        'http://localhost:3000/admin/izmiraskf/yonetim-kurulu/' + staffId
      )
      .subscribe({
        next: (data) => {
          if (!data.error) {

            const filteredStaffList = this.staffList.filter(staffList => staffList.id !== staffId);
            this.staffList = filteredStaffList;
            this.staffListUpdated.next([...this.staffList]);
          } else {
            null;
          }
        },
        error: (error) => {

        }
      });
  }
}
