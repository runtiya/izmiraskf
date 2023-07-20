import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { StaffIzmirAskfModel } from "../../models/admin-staffizmiraskf.model";
import { StaffIASKFService } from "../../services/admin-staffiaskf.service";
import { AdminCreateStaffIzmirAskfModal } from "../staff-izmiraskf-create/staff-izmiraskf-create.component";

import { globalFunctions } from "../../../functions/global.function";
import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon.list";

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

  fontAwesomeIconList = fontAwesomeIconList;

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
      .subscribe((data: StaffIzmirAskfModel[]) => {
        this.staffizmiraskfList = data;
      });
    this.isLoading = false;
  }

  onDelete(id: number) {
    this.staffService.deleteStaff(id);
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

  ngOnDestroy(): void {
    this.staffizmiraskfListSub.unsubscribe();
  }
}

