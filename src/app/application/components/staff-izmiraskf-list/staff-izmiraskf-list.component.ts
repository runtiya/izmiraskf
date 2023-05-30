import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { StaffIzmirAskfModel } from "../../models/application-staffizmiraskf.model";
import { StaffIASKFService } from "../../services/application-staffiaskf.service";

import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon-list";

@Component({
  selector: 'app-application-staffizmiraskf-list',
  templateUrl: './staff-izmiraskf-list.component.html',
  styleUrls: ['../../../app.component.css', './staff-izmiraskf-list.component.css']
})
export class ApplicationStaffIzmirAskf implements OnInit, OnDestroy {
  headerTitle = "İZMİR AMATÖR SPOR KULÜPLERİ FEDERASYONU YÖNETİM KURULU";
  isLoading = false;
  staffizmiraskfList: StaffIzmirAskfModel[] = [];
  private staffizmiraskfListSub: Subscription;

  fontAwesomeIconList = fontAwesomeIconList;

  constructor(
    public staffService: StaffIASKFService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.staffService.getStaff();
    this.staffizmiraskfListSub = this.staffService.getStaffListUpdateListener()
      .subscribe((data: StaffIzmirAskfModel[]) => {
        this.staffizmiraskfList = data;
        console.log(data)
      });
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.staffizmiraskfListSub.unsubscribe();
  }
}
