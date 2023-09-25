import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { StaffITFFModel } from "../../models/admin-staffizmirtff.model";
import { StaffITFFService } from "../../services/admin-staffitff.service";
import { AdminCreateStaffIzmirTFFModal } from "../staff-izmirtff-create/staff-izmirtff-create.component";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

import { globalFunctions } from "../../../functions/global.function";

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
    const dialogRef = this.dialog.open(AdminConfirmationDialogModal, {
      data: {
        title: 'İŞLEMİ ONAYLIYOR MUSUNUZ?',
        message: 'Bu işlem verilerinizi kalıcı olarak silecektir, işleminizi onaylıyor musunuz?'
      }
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.staffService.deleteStaff(id);
          }
        }
      });
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

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  ngOnDestroy(): void {
    this.staffizmirtffListSub.unsubscribe();
  }
}

