import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { TeamsModel } from "../../models/admin-teams.model";
import { TeamsService } from "../../services/admin-teams.service";
import { AdminTeamsCreateModal } from "../teams-create/teams-create.component";

import { globalFunctions } from "../../../functions/global.function";
import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon.list";

@Component({
  selector: 'app-admin-teamslist',
  templateUrl: './teams-list.component.html',
  styleUrls: ['../../../app.component.css', './teams-list.component.css']
})
export class AdminTeamsList implements OnInit, OnDestroy {
  toolbarTitle = "TAKIMLAR";
  isLoading = false;
  teamsList: TeamsModel[] = [];
  private teamsListSub: Subscription;

  fontAwesomeIconList = fontAwesomeIconList;

  constructor(
    private teamsService: TeamsService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.teamsService.getTeams();
    this.teamsListSub = this.teamsService.getTeamListSubListener()
      .subscribe((data: TeamsModel[]) => {
        this.teamsList = data.sort((a, b) => a.officialName.localeCompare(b.officialName));
        this.isLoading = false;
      });
  }

  onCreate() {
    const dialogRef = this.dialog.open(AdminTeamsCreateModal, {
      data: {
        pageMode: "create"
      }
    });
  }

  onEdit(teamInfo: TeamsModel) {
    const dialogRef = this.dialog.open(AdminTeamsCreateModal, {
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
