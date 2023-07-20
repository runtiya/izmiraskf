import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { StaffITFFModel } from "../../models/admin-staffizmirtff.model";
import { StaffITFFService } from "../../services/admin-staffitff.service";
import { AdminCreateStaffIzmirTFFModal } from "../staff-izmirtff-create/staff-izmirtff-create.component";

import { globalFunctions } from "../../../functions/global.function";

import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon.list";

@Component({
  selector: 'app-admin-staffizmirtff-list',
  templateUrl: './staff-izmirtff-list.component.html',
  styleUrls: ['../../../app.component.css', './staff-izmirtff-list.component.css']
})
export class AdminStaffIzmirTFF implements OnInit, OnDestroy {
  toolbarTitle = "İZMİR TFF İL TEMSİLCİLİĞİ YÖNETİM KURULU";
  isLoading: boolean = false;
  staffizmirtffList: StaffITFFModel[] = [];
  private staffizmirtffListSub: Subscription;

  fontAwesomeIconList = fontAwesomeIconList;

  constructor(
    public staffService: StaffITFFService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.staffService.getStaff();
    this.staffizmirtffListSub = this.staffService.getStaffListUpdateListener()
      .subscribe((data: StaffITFFModel[]) => {
        this.staffizmirtffList = data;
        this.isLoading = false;
      });
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.staffService.deleteStaff(id);
    this.isLoading = false;
  }

  onCreate() {
    const dialogRef = this.dialog.open(AdminCreateStaffIzmirTFFModal, {
      data: {
        mode: 'create'
      }
    });
  }

  onEdit(staffInfo: StaffITFFModel) {
    const dialogRef = this.dialog.open(AdminCreateStaffIzmirTFFModal, {
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

