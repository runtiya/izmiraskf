import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subscription } from "rxjs";

import { GroupStagesModel } from "../../models/admin-groupstages.model";
import { LeaguesModel } from "../../models/admin-leagues.model";
import { SeasonsModel } from "../../models/admin-seasons.model";
import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";

import { GroupStagesService } from "../../services/admin/admin-groupstages.service";
import { LeaguesService } from "../../services/admin/admin-leagues.service";
import { SeasonsService } from "../../services/admin/admin-seasons.service";
import { TeamsInGroupstagesService } from "../../services/admin/admin-teams-in-groupstages.service";

import { TeamsInDisqualificationsEditModal } from "../teams-in-disqualifications-edit/teams-in-disqualifications-edit.component";

@Component({
  selector: 'app-admin-teams-in-disqualifications',
  templateUrl: './teams-in-disqualifications.component.html',
  styleUrls: ['../../../app.component.css', './teams-in-disqualifications.component.css']
})
export class TeamsInDisqualifications implements OnInit, OnDestroy {
  headerTitle = "İHRAÇ VE ÇEKİLME";
  isLoading = false;
  seasonList: SeasonsModel[] = [];
  private seasonListSub: Subscription;
  leagueList: LeaguesModel[] = [];
  private leagueListSub: Subscription;
  groupstageList: GroupStagesModel[] = [];
  private groupstageListSub: Subscription;
  teamsingroupstagesList: TeamsInGroupstagesModel[] = [];
  private teamsingroupstagesListSub: Subscription;

  displayedColumns: string[] = ['orderNo', 'teamName', 'status', 'weekofExpelledorReceded', 'explanation', 'edit'];

  @Input() seasonSelectionId: number;
  @Input() leagueSelectionId: number;
  @Input() groupstageSelectionId: number;

  constructor(public seasonsService: SeasonsService,
              public leaguesService: LeaguesService,
              public groupstagesService: GroupStagesService,
              public teamsingroupstagesService: TeamsInGroupstagesService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog
            ) {}

  ngOnInit(): void {

    this.seasonsService.getSeasons();
    this.seasonListSub = this.seasonsService.getSeasonsListSubListener()
      .subscribe((data: SeasonsModel[]) => {
        this.isLoading = true;
        this.seasonList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
        this.seasonSelectionId = this.seasonList[0]["id"];
        this.leaguesService.getLeagues(this.seasonSelectionId);
        this.isLoading = false;
      });

    this.leagueListSub = this.leaguesService.getLeagueListUpdateListener()
      .subscribe((data: LeaguesModel[]) => {
        this.isLoading = true;
        this.leagueList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.leagueSelectionId = this.leagueList[0]["id"];
        this.groupstagesService.getGroups(this.leagueSelectionId);
        this.isLoading = false;
      });

    this.groupstageListSub = this.groupstagesService.getGroupStageListUpdateListener()
      .subscribe((data: GroupStagesModel[]) => {
        this.isLoading = true;
        this.groupstageList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.groupstageSelectionId = this.groupstageList[0]["id"];
        this.teamsingroupstagesService.getTeamsInGroupstages(this.groupstageSelectionId);
        this.isLoading = false;
      });


    this.teamsingroupstagesListSub = this.teamsingroupstagesService.getTeamsInGroupstagesUpdateListener()
      .subscribe((data: TeamsInGroupstagesModel[]) => {
        this.isLoading = true;
        this.teamsingroupstagesList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.isLoading = false;
      });
  }

  onEdit(id: number) {
    const team = this.teamsingroupstagesList.find(e => e.id == id);
    const dialogRef = this.dialog.open(TeamsInDisqualificationsEditModal, {
      data: {
        teamInfo: team
      }
    });

  }

  onSeasonChange(seasonSelectionId: number) {
    this.isLoading = true;
    this.leaguesService.getLeagues(seasonSelectionId);
    this.isLoading = false;
  }

  onLeagueChange(leagueSelectionId: number) {
    this.isLoading = true;
    this.groupstagesService.getGroups(leagueSelectionId);
    this.isLoading = false;
  }

  onGroupstageChange(groupstageSelectionId: number) {
    this.isLoading = true;
    this.teamsingroupstagesService.getTeamsInGroupstages(groupstageSelectionId);
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.seasonListSub.unsubscribe();
    this.leagueListSub.unsubscribe();
    this.groupstageListSub.unsubscribe();
    this.teamsingroupstagesListSub.unsubscribe();
  }
}
