import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { StadiumsModel } from "../../models/application-stadiums.model";
import { StadiumsService } from "../../services/application-stadiums.service";

import { cityList } from "../../../assets/lists/city-tr.list";
import { townList } from "../../../assets/lists/town-izmir.list";
import { floorTypeList } from "../../../assets/lists/floor-type.list";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-application-stadiums-list',
  templateUrl: './stadiums-list.component.html',
  styleUrls: ['../../../app.component.css', './stadiums-list.component.css']
})
export class ApplicationStadiumList implements OnInit, OnDestroy {
  toolbarTitle = "SAHALAR";
  isLoading: boolean = false;
  stadiumsList: StadiumsModel[] = [];
  private stadiumListSub: Subscription;

  cityListArray = cityList;
  townListArray = townList;
  floorTypeListArray = floorTypeList;

  constructor(
    public stadiumService: StadiumsService,
    public dialog: MatDialog,
    private router: Router,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.stadiumService.getStadiums();
    this.stadiumListSub = this.stadiumService.getStadiumListUpdateListener()
      .subscribe({
        next: (data: StadiumsModel[]) => {
          this.stadiumsList = data;
          this.isLoading = false;


        },
        error: (error) => {

        }
      });
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

  showStadiumDetails(_id: number) {
    this.router.navigate(['/sahalar/detaylar', _id]);
  }

  ngOnDestroy(): void {
    this.stadiumListSub.unsubscribe();
  }
}
