import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { StaffITFFModel } from "../../models/admin-staffizmirtff.model";
import { StaffITFFService } from "../../services/admin/admin-staffitff.service";
import { CreateAdminStaffIzmirTFFModal } from "../staff-izmirtff-create/staff-izmirtff-create.component";

@Component({
  selector: 'app-admin-staffizmirtff',
  templateUrl: './staff-izmirtff-list.component.html',
  styleUrls: ['../../../app.component.css', './staff-izmirtff-list.component.css']
})
export class AdminStaffIzmirTFF implements OnInit, OnDestroy {
  headerTitle = "İZMİR TFF İL TEMSİLCİLİĞİ YÖNETİM KURULU";
  isLoading = false;
  staffizmirtffList: StaffITFFModel[] = [];
  private staffizmirtffListSub: Subscription;

  constructor(public staffService: StaffITFFService, public dialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = true;
    this.staffService.getStaff();
    this.staffizmirtffListSub = this.staffService.getStaffListUpdateListener()
      .subscribe((data: StaffITFFModel[]) => {
        this.staffizmirtffList = data.sort((a, b) => { return a.orderNo - b.orderNo});
        this.isLoading = false;
      });
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.staffService.deleteStaff(id);
    this.isLoading = false;
  }

  onCreate() {
    const dialogRef = this.dialog.open(CreateAdminStaffIzmirTFFModal, {
      data: {
        mode: 'create'
      }
    });
  }

  onEdit(staffInfo: StaffITFFModel) {
    console.log(staffInfo)
    const dialogRef = this.dialog.open(CreateAdminStaffIzmirTFFModal, {
      data: {
        mode: 'edit',
        staffInfo: staffInfo
      }
    });
  }

  ngOnDestroy(): void {
    this.staffizmirtffListSub.unsubscribe();
  }
}

