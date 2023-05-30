import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { StadiumsModel } from "../../models/admin-stadiums.model";
import { StadiumsService } from "../../services/admin-stadiums.service";
import { AdminStadiumsCreateModal } from "../stadiums-create/stadiums-create.component";
import { StaffITFFModel } from "../../models/admin-staffizmirtff.model";

import { cityList } from "../../../assets/lists/city-list-tr";
import { townList } from "../../../assets/lists/town-list-izmir";
import { floorTypeList } from "../../../assets/lists/floor-type-list";



@Component({
  selector: 'app-admin-stadiums-list',
  templateUrl: './stadiums-list.component.html',
  styleUrls: ['../../../app.component.css', './stadiums-list.component.css']
})
export class AdminStadiumsListComponent implements OnInit, OnDestroy {
  title = 'SAHALAR';
  isLoading = false;
  stadiumsList: StadiumsModel[] = [];
  private stadiumListSub: Subscription;

  cityListArray = cityList;
  townListArray = townList;
  floorTypeListArray = floorTypeList;

  constructor(public stadiumService: StadiumsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = true;
    this.stadiumService.getStadiums();
    this.stadiumListSub = this.stadiumService.getStadiumListUpdateListener()
      .subscribe((data: StadiumsModel[]) => {
        this.stadiumsList = data.sort((a, b) => a.stadiumName.localeCompare(b.stadiumName));
        this.isLoading = false;

      });
  }

  onCreate() {
    const dialogRef = this.dialog.open(AdminStadiumsCreateModal, {
      data: {
        pageMode: "create"
      }
    });
  }

  onEdit(stadiumInfo: StaffITFFModel) {
    const dialogRef = this.dialog.open(AdminStadiumsCreateModal, {
      data: {
        pageMode: "edit",
        stadiumInfo: stadiumInfo
      }
    });
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.stadiumService.deleteStadium(id);
    this.isLoading = false;
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
