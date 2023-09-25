import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { StaffIzmirAskfModel } from "../../models/admin-staffizmiraskf.model";
import { StaffIASKFService } from "../../services/admin-staffiaskf.service";
import { AdminCreateStaffIzmirAskfModal } from "../staff-izmiraskf-create/staff-izmiraskf-create.component";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-admin-staffizmiraskf-list',
  templateUrl: './staff-izmiraskf-list.component.html',
  styleUrls: ['../../../app.component.css', './staff-izmiraskf-list.component.css']
})
export class AdminStaffIzmirAskf implements OnInit, OnDestroy {
  toolbarTitle = "İZMİR AMATÖR SPOR KULÜPLERİ FEDERASYONU YÖNETİM KURULU";
  isLoading: boolean = false;
  staffizmiraskfList: StaffIzmirAskfModel[] = [];
  private staffizmiraskfListSub: Subscription;

  constructor(
    public staffService: StaffIASKFService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.staffService.getStaff();
    this.staffizmiraskfListSub = this.staffService.getStaffListUpdateListener()
      .subscribe({
        next: (data: StaffIzmirAskfModel[]) => {
          this.staffizmiraskfList = data;
          this.isLoading = false;
        }
      });
  }

  onCreate() {
    const dialogRef = this.dialog.open(AdminCreateStaffIzmirAskfModal, {
      data: {
        mode: 'create'
      }
    });
  }

  onEdit(staffInfo: StaffIzmirAskfModel) {
    const dialogRef = this.dialog.open(AdminCreateStaffIzmirAskfModal, {
      data: {
        mode: 'edit',
        staffInfo: staffInfo
      }
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

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  ngOnDestroy(): void {
    this.staffizmiraskfListSub.unsubscribe();
  }
}

