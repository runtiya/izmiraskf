import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { SafeResourceUrl } from '@angular/platform-browser';

import { TeamsModel } from "../../models/application-teams.model";
import { TeamsService } from "../../services/application-teams.service";

import { globalFunctions } from "../../../functions/global.function";

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
  public mapSafeSrc: SafeResourceUrl;

  constructor(
    private teamsService: TeamsService,
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.team.colorCodes = "#000000;#000000";
    this.router.paramMap
      .subscribe(params => {
        this.url_teamId = Number(params.get('id'));
        this.teamsService.getTeamById(this.url_teamId);
        this.teamSub = this.teamsService.getTeamByIdUpdateListener()
          .subscribe({
            next: (data: TeamsModel) => {
              this.team = data;
              this.mapSafeSrc = this.globalFunctions.getSafeResourceUrl(this.team.mapUrl);
              this.toolbarTitle = data.officialName;
              this.globalFunctions.setToolbarTitle(this.toolbarTitle);
              this.isLoading = false;
            }
          });
      });
  }

  getCityValue(city: string): string {
    return this.globalFunctions.getCityValue(city);
  }

  getTownValue(town: string): string {
    return this.globalFunctions.getTownValue(town);
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  ngOnDestroy(): void {
    this.teamSub.unsubscribe();
  }
}
