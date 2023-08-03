import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { TeamsModel } from "../../models/application-teams.model";
import { TeamsService } from "../../services/application-teams.service";

import { globalFunctions } from "../../../functions/global.function";

import { GoogleMapsModel } from "../../../models/global-google-maps.model";
import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon.list";

@Component({
  selector: 'app-application-teams-details',
  templateUrl: './teams-details.component.html',
  styleUrls: ['../../../app.component.css', './teams-details.component.css']
})
export class ApplicationTeamDetails implements OnInit, OnDestroy {
  toolbarTitle = "";
  isLoading: boolean = false;
  team: TeamsModel = <TeamsModel>{};
  private teamSub: Subscription;
  url_teamId: number;

  LatLngLiteral = <GoogleMapsModel>{};
  zoom = 18;
  center: google.maps.LatLngLiteral = null;
  markerPositions: google.maps.LatLngLiteral[] = [];

  fontAwesomeIconList = fontAwesomeIconList;

  constructor(
    private teamsService: TeamsService,
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.team.colorCodes = "#000000;#000000";
    this.router.paramMap
      .subscribe(params => {
        this.url_teamId = Number(params.get('id'));

        this.teamsService.getTeamById(this.url_teamId);
        this.teamSub = this.teamsService.getTeamByIdUpdateListener()
          .subscribe({
            next: (data: TeamsModel) => {
              this.team = data;
              this.toolbarTitle = data.officialName;
              this.globalFunctions.setToolbarTitle(this.toolbarTitle);
              if (this.team.latitude !== null && this.team.longitude !== null) {
                this.center = {lat: this.team.latitude, lng: this.team.longitude};
              }
            },
            error: (error) => {

            }
          });
      })
  }

  ngOnDestroy(): void {
    this.teamSub.unsubscribe();
  }
}
