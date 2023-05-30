import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { StaffITFFModel } from "../../models/application-staffizmirtff.model";
import { StaffITFFService } from "../../services/application-staffitff.service";

import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon-list";

@Component({
  selector: 'app-application-staffizmirtff-list',
  templateUrl: './staff-izmirtff-list.component.html',
  styleUrls: ['../../../app.component.css', './staff-izmirtff-list.component.css']
})
export class ApplicationStaffIzmirTFF implements OnInit, OnDestroy {
  headerTitle = "İZMİR TFF İL TEMSİLCİLİĞİ YÖNETİM KURULU";
  isLoading = false;
  staffizmirtffList: StaffITFFModel[] = [];
  private staffizmirtffListSub: Subscription;

  fontAwesomeIconList = fontAwesomeIconList;

  constructor(
    public staffService: StaffITFFService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.staffService.getStaff();
    this.staffizmirtffListSub = this.staffService.getStaffListUpdateListener()
      .subscribe((data: StaffITFFModel[]) => {
        this.staffizmirtffList = data;
        console.log(data)
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.staffizmirtffListSub.unsubscribe();
  }
}
