import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { StadiumsModel } from "../../models/application-stadiums.model";
import { StadiumsService } from "../../services/application-stadiums.service";

import { cityList } from "../../../assets/lists/city-list-tr";
import { townList } from "../../../assets/lists/town-list-izmir";
import { floorTypeList } from "../../../assets/lists/floor-type-list";



@Component({
  selector: 'app-application-stadiums-details',
  templateUrl: './stadiums-details.component.html',
  styleUrls: ['../../../app.component.css', './stadiums-details.component.css']
})
export class ApplicationStadiumDetails implements OnInit, OnDestroy {
  headerTitle = "";
  isLoading = false;
  stadium: StadiumsModel;
  private stadiumSub: Subscription;
  url_stadiumId: number;

  constructor(
    private router: ActivatedRoute,
    private stadiumsService: StadiumsService
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
              console.log(this.stadium);
            },
            error: (error) => {

            }
          });
      })
  }

  ngOnDestroy(): void {

  }
}
