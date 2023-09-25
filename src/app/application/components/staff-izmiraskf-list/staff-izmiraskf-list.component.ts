import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { StaffIzmirAskfModel } from "../../models/application-staffizmiraskf.model";
import { StaffIASKFService } from "../../services/application-staffiaskf.service";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-application-staffizmiraskf-list',
  templateUrl: './staff-izmiraskf-list.component.html',
  styleUrls: ['../../../app.component.css', './staff-izmiraskf-list.component.css']
})
export class ApplicationStaffIzmirAskf implements OnInit, OnDestroy {
  toolbarTitle = "İZMİR ASKF YÖNETİM KURULU";
  isLoading: boolean = false;
  staffizmiraskfList: StaffIzmirAskfModel[] = [];
  private staffizmiraskfListSub: Subscription;

  constructor(
    public staffService: StaffIASKFService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.staffService.getStaff();
    this.staffizmiraskfListSub = this.staffService.getStaffListUpdateListener()
      .subscribe((data: StaffIzmirAskfModel[]) => {
        this.staffizmiraskfList = data;
        this.isLoading = false;
      });
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  ngOnDestroy(): void {
    this.staffizmiraskfListSub.unsubscribe();
  }
}
