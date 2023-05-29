import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { TeamsModel } from "../../models/application-teams.model";
import { TeamsService } from "../../services/application-teams.service";

@Component({
  selector: 'app-application-teamslist',
  templateUrl: './teams-list.component.html',
  styleUrls: ['../../../app.component.css', './teams-list.component.css']
})
export class ApplicationTeamsList implements OnInit, OnDestroy {
  headerTitle = "TAKIMLAR";
  isLoading = false;
  teamsList: TeamsModel[] = [];
  private teamsListSub: Subscription;

  constructor(
    private teamsService: TeamsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.teamsService.getTeams();
  }

  ngOnDestroy(): void {

  }
}
