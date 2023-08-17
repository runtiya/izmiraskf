import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

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
  teamsCount: number = 0;
  paginationPageSizeOptions: Array<number> = this.globalFunctions.getPaginationPageSizeOptions();
  paginationPageSize: number = this.paginationPageSizeOptions[1];
  paginationCurrentPage: number = 1;
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
    this.teamsService.getTeams(this.paginationPageSize, this.paginationCurrentPage);
    this.teamsListSub = this.teamsService.getTeamsListUpdateListener()
      .subscribe((data: {teamsList: TeamsModel[], teamsCount: number}) => {
        this.teamsList = data.teamsList;
        this.teamsCount = data.teamsCount;
        this.isLoading = false;
      });
  }

  showTeamsDetails(_id: number) {
    this.router.navigate(['/takimlar/detaylar', _id]);
  }

  onChangePaginationPage(paginationData: PageEvent) {
    this.teamsService.getTeams(paginationData.pageSize, paginationData.pageIndex + 1);
  }

  ngOnDestroy(): void {
    this.teamsListSub.unsubscribe();
  }

}
