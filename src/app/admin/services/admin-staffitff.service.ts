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
          'http://localhost:3000/admin/izmirtffiltemsilciligi-personel'
        )
        /*
        .pipe(
          map(data => {
            return {
              staffList: data.staffList.map(staffList => {
                return {
                  id: staffList.id,
                  title: staffList.title,
                  name: staffList.name,
                  phone: staffList.phone,
                  email: staffList.email,
                  profileImage: staffList.profileImage,
                  isVisible: staffList.isVisible,
                  order: staffList.order
                }
              })
            }
          })
        )
        */
        .subscribe({
          next: (orderedData) => {
            this.staffList = orderedData.staffList;
            this.staffListUpdated.next([...this.staffList]);
          },
          error: (error) => {

          }
        });
    } catch (error) {
      console.log(error);
    }

  }

  getStaffListUpdateListener() {
    return this.staffListUpdated.asObservable();
  }

  createStaff(staffInfo: StaffITFFModel) {
    this.http
      .post<{ error: boolean, message: string, staffId: number }>(
        'http://localhost:3000/admin/izmirtffiltemsilciligi-personel', staffInfo
      )
      .subscribe({
        next: (data) => {
          if (!data.error) {
            console.log(data.message);
            console.log(data.staffId);
            staffInfo.id = data.staffId;
            this.staffList.push(staffInfo);
            this.staffListUpdated.next([...this.staffList]);
          } else {
            console.log(data.message);
          }
        },
        error: (error) => {

        }
      });
  }


  updateStaff(staffInfo: StaffITFFModel) {
    this.http
      .put<{ error: boolean, message: string }>(
        'http://localhost:3000/admin/izmirtffiltemsilciligi-personel/' + staffInfo.id, staffInfo
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
  }

  deleteStaff(staffId: number) {
    this.http
      .delete<{ error: boolean, message: string }>(
        'http://localhost:3000/admin/izmirtffiltemsilciligi-personel/' + staffId
      )
      .subscribe({
        next: (data) => {
          if (!data.error) {
            console.log(data.message);
            const filteredStaffList = this.staffList.filter(staff => staff.id !== staffId);
            this.staffList = filteredStaffList;
            this.staffListUpdated.next([...this.staffList]);
          } else {
            console.log(data.message);
          }
        },
        error: (error) => {

        }
      });
  }
}
