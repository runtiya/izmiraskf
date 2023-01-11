import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";


import { StaffIzmirAskfModel } from "../../models/admin-staffizmiraskf.model";

@Injectable({providedIn: 'root'})
export class StaffIASKFService {
  private staffList: StaffIzmirAskfModel[] = [];
  private staffListUpdated = new Subject<StaffIzmirAskfModel[]>();


  constructor(private http: HttpClient) {}

  getStaff() {
    try {
      this.http
      .get<{error: boolean, message: string, staffList: any}>(
        'http://localhost:3000/admin/izmiraskf'
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
      .subscribe((orderedData) => {
        this.staffList = orderedData.staffList;
        this.staffListUpdated.next([...this.staffList]);
      });
    } catch (error) {
      console.log(error)
    }

  }

  getStaffListUpdateListener() {
    return this.staffListUpdated.asObservable();
  }

  createStaff(staffInfo: StaffIzmirAskfModel) {

    this.http
      .post<{error: boolean, message: string, staffId: number}>(
        'http://localhost:3000/admin/izmiraskf', staffInfo
      )
      .subscribe((data) => {
        if (!data.error) {
          console.log(data.message);
          console.log(data.staffId);
          staffInfo.id = data.staffId;
          this.staffList.push(staffInfo);
          this.staffListUpdated.next([...this.staffList]);
        } else {
          null;
        }
      })
  }


  updateStaff(staffInfo: StaffIzmirAskfModel) {

    this.http
      .put<{error: boolean, message: string}>(
        'http://localhost:3000/admin/izmiraskf/' + staffInfo.id, staffInfo
      )
      .subscribe((data) => {
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
      })
  }

  deleteStaff(staffId: number) {

    this.http
      .delete<{error: boolean, message: string}>(
        'http://localhost:3000/admin/izmiraskf/' + staffId
      )
      .subscribe((data) => {
        if (!data.error) {
          console.log(data.message);
          const filteredStaffList = this.staffList.filter(staffList => staffList.id !== staffId);
          this.staffList = filteredStaffList;
          this.staffListUpdated.next([...this.staffList]);
        } else {
          null;
        }
      })
  }


}
