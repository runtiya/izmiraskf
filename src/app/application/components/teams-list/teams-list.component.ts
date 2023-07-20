import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { TeamsModel } from "../../models/application-teams.model";
import { TeamsService } from "../../services/application-teams.service";
import { Router } from "@angular/router";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-application-teamslist',
  templateUrl: './teams-list.component.html',
  styleUrls: ['../../../app.component.css', './teams-list.component.css']
})
export class ApplicationTeamsList implements OnInit, OnDestroy {
  toolbarTitle = "TAKIMLAR";
  isLoading: boolean = false;
  teamsList: TeamsModel[] = [];
  private teamsListSub: Subscription;

  constructor(
    private teamsService: TeamsService,
    public dialog: MatDialog,
    private router: Router,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.teamsService.getTeams();
    this.teamsListSub = this.teamsService.getTeamListUpdateListener()
      .subscribe((data: TeamsModel[]) => {
        this.teamsList = data;
        this.isLoading = false;
      });
  }

  showTeamsDetails(_id: number) {
    this.router.navigate(['/takimlar/detaylar', _id]);
  }

  ngOnDestroy(): void {
    this.teamsListSub.unsubscribe();
  }

}
