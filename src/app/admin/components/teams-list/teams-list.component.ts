import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { TeamsModel } from "../../models/admin-teams.model";
import { TeamsService } from "../../services/admin/admin-teams.service";
import { TeamsCreateModal } from "../teams-create/teams-create.component";


@Component({
  selector: 'app-admin-teamslist',
  templateUrl: './teams-list.component.html',
  styleUrls: ['../../../app.component.css', './teams-list.component.css']
})
export class TeamsList implements OnInit, OnDestroy {
  headerTitle = "TAKIMLAR";
  isLoading = false;
  teamsList: TeamsModel[] = [];
  private teamsListSub: Subscription;

  constructor(public teamsService: TeamsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.teamsService.getTeams();
    this.teamsListSub = this.teamsService.getTeamListSubListener()
      .subscribe((data: TeamsModel[]) => {
        this.teamsList = data.sort((a, b) => a.officialName.localeCompare(b.officialName));
        this.isLoading = false;
        console.log(this.teamsList);
      });
  }

  onCreate() {
    const dialogRef = this.dialog.open(TeamsCreateModal, {
      data: {
        pageMode: "create"
      }
    });
  }

  onEdit(teamInfo: TeamsModel) {
    console.log(teamInfo);
    const dialogRef = this.dialog.open(TeamsCreateModal, {
      data: {
        pageMode: "edit",
        teamInfo: teamInfo
      }
    });
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.teamsService.deleteTeam(id);
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.teamsListSub.unsubscribe();
  }
}
