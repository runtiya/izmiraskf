import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { SafeResourceUrl } from '@angular/platform-browser';

import { StadiumsModel } from "../../models/application-stadiums.model";
import { StadiumsService } from "../../services/application-stadiums.service";

import { cityList } from "../../../assets/lists/city-tr.list";
import { townList } from "../../../assets/lists/town-izmir.list";
import { floorTypeList } from "../../../assets/lists/floor-type.list";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-application-stadiums-details',
  templateUrl: './stadiums-details.component.html',
  styleUrls: ['../../../app.component.css', './stadiums-details.component.css']
})
export class ApplicationStadiumDetails implements OnInit, OnDestroy {
  toolbarTitle = "";
  isLoading: boolean = false;
  stadium: StadiumsModel = <StadiumsModel>{};
  private stadiumSub: Subscription;
  url_stadiumId: number;

  cityList = cityList;
  townList = townList;
  floorTypeList = floorTypeList;

  public mapSafeSrc: SafeResourceUrl;

  constructor(
    private router: ActivatedRoute,
    private stadiumsService: StadiumsService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.router.paramMap
      .subscribe(params => {
        this.url_stadiumId = Number(params.get('id'));

        this.stadiumsService.getStadiumById(this.url_stadiumId);
        this.stadiumSub = this.stadiumsService.getStadiumByIdUpdateListener()
          .subscribe({
            next: (data: StadiumsModel) => {
              this.stadium = data;
              this.mapSafeSrc = this.globalFunctions.getSafeResourceUrl(this.stadium.mapUrl);
              this.toolbarTitle = data.stadiumName;
              this.globalFunctions.setToolbarTitle(this.toolbarTitle);
            },
            error: (error) => {

            }
          });
      })
  }

  onCityList(city: string) {
    if (city == null || city == undefined) {
      return null
    }
    else {
      let cityObj = this.cityList.find(e => e.name === city);
      return cityObj.value;
    }
  }

  onTownList(town: string) {
    if (town == null || town == undefined) {
      return null
    }
    else {
      let townObj = this.townList.find(e => e.name === town);
      return townObj.value;
    }
  }

  onFloorTypeList(floorType: string) {
    if (floorType == null || floorType == undefined) {
      return null
    }
    else {
      let floorTypeObj = this.floorTypeList.find(e => e.name === floorType);
      return floorTypeObj.value;
    }
  }

  ngOnDestroy(): void {
    this.stadiumSub.unsubscribe();
  }
}
