import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { TeamsModel } from "../../models/application-teams.model";
import { TeamsService } from "../../services/application-teams.service";
import { Router } from "@angular/router";
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

  constructor(private teamsService: TeamsService, public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.teamsService.getTeams();
    this.teamsListSub = this.teamsService.getTeamListSubListener()
      .subscribe((data: TeamsModel[]) => {
        this.teamsList = data.sort((a, b) => a.officialName.localeCompare(b.officialName));
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.teamsListSub.unsubscribe();
  }

  showTeamsDetails(_id: number) {
    this.router.navigate(['/takimlar/detaylar', _id]);
  }
}
