import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { StaffITFFModel } from "../../models/application-staffizmirtff.model";
import { StaffITFFService } from "../../services/application-staffitff.service";

import { globalFunctions } from "../../../functions/global.function";

import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon.list";

@Component({
  selector: 'app-application-staffizmirtff-list',
  templateUrl: './staff-izmirtff-list.component.html',
  styleUrls: ['../../../app.component.css', './staff-izmirtff-list.component.css']
})
export class ApplicationStaffIzmirTFF implements OnInit, OnDestroy {
  toolbarTitle = "İZMİR TFF İL TEMSİLCİLİĞİ";
  isLoading: boolean = false;
  staffizmirtffList: StaffITFFModel[] = [];
  private staffizmirtffListSub: Subscription;

  fontAwesomeIconList = fontAwesomeIconList;

  constructor(
    public staffService: StaffITFFService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.staffService.getStaff();
    this.staffizmirtffListSub = this.staffService.getStaffListUpdateListener()
      .subscribe((data: StaffITFFModel[]) => {
        this.staffizmirtffList = data;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.staffizmirtffListSub.unsubscribe();
  }
}
