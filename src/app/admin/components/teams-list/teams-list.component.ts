import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

import { TeamsModel } from "../../models/admin-teams.model";
import { TeamsService } from "../../services/admin-teams.service";
import { AdminTeamsCreateModal } from "../teams-create/teams-create.component";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-admin-teamslist',
  templateUrl: './teams-list.component.html',
  styleUrls: ['../../../app.component.css', './teams-list.component.css']
})
export class AdminTeamsList implements OnInit, OnDestroy {
  toolbarTitle = "TAKIMLAR";
  isLoading: boolean = false;
  teamsList: TeamsModel[] = [];
  teamsCount: number = 0;
  paginationPageSizeOptions: Array<number> = this.globalFunctions.getPaginationPageSizeOptions();
  paginationPageSize: number = this.paginationPageSizeOptions[1];
  paginationCurrentPage: number = 1;
  private teamsListSub: Subscription;

  constructor(
    private teamsService: TeamsService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.teamsService.getTeams(this.paginationPageSize, this.paginationCurrentPage);
    this.teamsListSub = this.teamsService.getTeamsListUpdateListener()
      .subscribe({
        next: (data: {teamsList: TeamsModel[], teamsCount: number}) => {
          this.teamsList = data.teamsList.sort((a, b) => a.officialName.localeCompare(b.officialName)).filter((t, index) => index < 20);
          this.teamsCount = data.teamsCount;
          this.isLoading = false;
        }
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
    const dialogRef = this.dialog.open(AdminConfirmationDialogModal, {
        data: {
          title: 'İŞLEMİ ONAYLIYOR MUSUNUZ?',
          message: 'Bu işlem verilerinizi kalıcı olarak silecektir, işleminizi onaylıyor musunuz?'
        }
      });

      dialogRef.afterClosed()
        .subscribe({
          next: (data) => {
            if (data) {
              this.teamsService.deleteTeam(id);
            }
          }
        });
  }

  onChangePaginationPage(paginationData: PageEvent) {
    this.teamsService.getTeams(paginationData.pageSize, paginationData.pageIndex + 1);
  }

  ngOnDestroy(): void {
    this.teamsListSub.unsubscribe();
  }
}
