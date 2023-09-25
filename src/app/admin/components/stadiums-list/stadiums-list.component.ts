import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";

import { StadiumsModel } from "../../models/admin-stadiums.model";
import { StadiumsService } from "../../services/admin-stadiums.service";
import { AdminStadiumsCreateModal } from "../stadiums-create/stadiums-create.component";

import { cityList } from "../../../assets/lists/city-tr.list";
import { townList } from "../../../assets/lists/town-izmir.list";
import { floorTypeList } from "../../../assets/lists/floor-type.list";

import { globalFunctions } from "../../../functions/global.function";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-admin-stadiums-list',
  templateUrl: './stadiums-list.component.html',
  styleUrls: ['../../../app.component.css', './stadiums-list.component.css']
})
export class AdminStadiumsList implements OnInit, OnDestroy {
  toolbarTitle = "SAHALAR";
  isLoading: boolean = false;
  stadiumsList: StadiumsModel[] = [];
  stadiumsCount: number = 0;
  paginationPageSizeOptions: Array<number> = this.globalFunctions.getPaginationPageSizeOptions();
  paginationPageSize: number = this.paginationPageSizeOptions[1];
  paginationCurrentPage: number = 1;
  private stadiumListSub: Subscription;

  cityListArray = cityList;
  townListArray = townList;
  floorTypeListArray = floorTypeList;

  constructor(
    private stadiumService: StadiumsService,
    private dialog: MatDialog,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.stadiumService.getStadiums(this.paginationPageSize, this.paginationCurrentPage);
    this.stadiumListSub = this.stadiumService.getStadiumListUpdateListener()
      .subscribe({
        next: (data: {stadiumsList: StadiumsModel[], stadiumsCount: number}) => {
          this.stadiumsList = data.stadiumsList.sort((a, b) => a.stadiumName.localeCompare(b.stadiumName)).filter((t, index) => index < 20);
          this.stadiumsCount = data.stadiumsCount;
          this.isLoading = false;
        }
      });
  }

  onCreate() {
    const dialogRef = this.dialog.open(AdminStadiumsCreateModal, {
      data: {
        pageMode: "create"
      }
    });
  }

  onEdit(stadiumInfo: StadiumsModel) {
    const dialogRef = this.dialog.open(AdminStadiumsCreateModal, {
      data: {
        pageMode: "edit",
        stadiumInfo: stadiumInfo
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
            this.stadiumService.deleteStadium(id);
          }
        }
      });
  }

  onChangePaginationPage(paginationData: PageEvent) {
    this.stadiumService.getStadiums(paginationData.pageSize, paginationData.pageIndex + 1);
  }

  onCityList(city: string) {
    if (city == null || city == undefined) {
      return null
    }
    else {
      let cityObj = this.cityListArray.find(e => e.name === city);
      return cityObj.value;
    }
  }

  onTownList(town: string) {
    if (town == null || town == undefined) {
      return null
    }
    else {
      let townObj = this.townListArray.find(e => e.name === town);
      return townObj.value;
    }
  }

  onFloorTypeList(floorType: string) {
    if (floorType == null || floorType == undefined) {
      return null
    }
    else {
      let floorTypeObj = this.floorTypeListArray.find(e => e.name === floorType);
      return floorTypeObj.value;
    }
  }

  ngOnDestroy() {
    this.stadiumListSub.unsubscribe();
  }
}
