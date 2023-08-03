import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { StadiumsModel } from "../../models/application-stadiums.model";
import { StadiumsService } from "../../services/application-stadiums.service";

import { cityList } from "../../../assets/lists/city-tr.list";
import { townList } from "../../../assets/lists/town-izmir.list";
import { floorTypeList } from "../../../assets/lists/floor-type.list";

import { GoogleMapsModel } from "../../../models/global-google-maps.model";

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

  LatLngLiteral = <GoogleMapsModel>{};
  zoom = 18;
  center: google.maps.LatLngLiteral = null;
  markerPositions: google.maps.LatLngLiteral[] = [];

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
              this.toolbarTitle = data.stadiumName;
              this.globalFunctions.setToolbarTitle(this.toolbarTitle);

              if (this.stadium.latitude !== null && this.stadium.longitude !== null) {
                this.center = {lat: this.stadium.latitude, lng: this.stadium.longitude};
              }
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

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.markerPositions.push(event.latLng.toJSON());
    }
  }

  ngOnDestroy(): void {
    this.stadiumSub.unsubscribe();
  }
}
