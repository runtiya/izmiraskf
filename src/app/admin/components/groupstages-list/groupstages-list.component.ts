import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { GroupStagesModel } from "../../models/admin-groupstages.model";
import { LeaguesModel } from "../../models/admin-leagues.model";
import { SeasonsModel } from "../../models/admin-seasons.model";

import { GroupStagesService } from "../../services/admin-groupstages.service";
import { LeaguesService } from "../../services/admin-leagues.service";
import { SeasonsService } from "../../services/admin-seasons.service";

import { AdminGroupStagesCreateModal } from "../groupstages-create/groupstages-create.component";

import { groupPeriodSystemList } from "../../../assets/lists/group-period-system-list";

@Component({
  selector: 'app-admin-groupstages-list',
  templateUrl: './groupstages-list.component.html',
  styleUrls: ['../../../app.component.css', './groupstages-list.component.css']
})
export class AdminGroupList implements OnInit, OnDestroy {
  headerTitle = 'GRUPLAR';
  isLoading = false;
  seasonList: SeasonsModel[] = [];
  private seasonsListSubscription: Subscription;
  leagueList: LeaguesModel[] = [];
  private leagueListSubscription: Subscription;
  groupstageList: GroupStagesModel[] = [];
  private groupstageListSubscription: Subscription;
  groupPeriodSystemList = groupPeriodSystemList;
  tableColumns: string[] = [
                                "seasonName",
                                "leagueName",
                                "groupName",
                                "periodSystem",
                                "actions"
                              ];

  @Input() seasonSelectionId: number;
  @Input() leagueSelectionId: number;

  constructor(public groupstageService: GroupStagesService,
              public leagueService: LeaguesService,
              public seasonsService: SeasonsService,
              public dialog: MatDialog
            ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListSubListener()
      .subscribe((data: SeasonsModel[]) => {
        this.seasonList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
        this.seasonSelectionId = this.seasonList[0]["id"];
        this.leagueService.getLeagues(this.seasonSelectionId);
      });

    this.leagueListSubscription = this.leagueService.getLeagueListUpdateListener()
      .subscribe((data: LeaguesModel[]) => {
        this.leagueList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.leagueSelectionId = this.leagueList[0]["id"];
        this.groupstageService.getGroupstages(this.leagueSelectionId);
      });

    this.groupstageListSubscription = this.groupstageService.getGroupStageListUpdateListener()
      .subscribe((data: GroupStagesModel[]) => {
        this.groupstageList = data.sort((a, b) => a.orderNo - b.orderNo);
        this.isLoading = false;
      });

  }

  onCreate() {
    this.seasonsListSubscription.unsubscribe();
    this.leagueListSubscription.unsubscribe();
    this.groupstageListSubscription.unsubscribe();

    const dialogRef = this.dialog.open(AdminGroupStagesCreateModal, {
      data: {
        pageMode: 'create',
        seasonList: this.seasonList,
        seasonSelectionId: this.seasonSelectionId,
        leagueSelectionId: this.leagueSelectionId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      this.seasonsService.getSeasons();
      this.seasonsListSubscription = this.seasonsService.getSeasonsListSubListener()
        .subscribe((data: SeasonsModel[]) => {
          this.seasonList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
          this.seasonSelectionId = this.seasonSelectionId || this.seasonList[0]["id"];
          this.leagueService.getLeagues(this.seasonSelectionId);
        });

      this.leagueListSubscription = this.leagueService.getLeagueListUpdateListener()
        .subscribe((data: LeaguesModel[]) => {
          this.leagueList = data.sort((a, b) => a.orderNo - b.orderNo);
          this.leagueSelectionId = this.leagueSelectionId || this.leagueList[0]["id"];
          this.groupstageService.getGroupstages(this.leagueSelectionId);
        });

      this.groupstageListSubscription = this.groupstageService.getGroupStageListUpdateListener()
          .subscribe((data: GroupStagesModel[]) => {
            this.groupstageList = data.sort((a, b) => a.orderNo - b.orderNo);
            this.isLoading = false;
          });
    });

  }

  onEdit(groupstageInfo: GroupStagesModel) {
    this.seasonsListSubscription.unsubscribe();
    this.leagueListSubscription.unsubscribe();
    this.groupstageListSubscription.unsubscribe();

    const dialogRef = this.dialog.open(AdminGroupStagesCreateModal, {
      data: {
        pageMode: 'edit',
        groupstageInfo: groupstageInfo,
        seasonList: this.seasonList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      this.seasonsService.getSeasons();
      this.seasonsListSubscription = this.seasonsService.getSeasonsListSubListener()
        .subscribe((data: SeasonsModel[]) => {
          this.seasonList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
          this.seasonSelectionId = this.seasonSelectionId || this.seasonList[0]["id"];
          this.leagueService.getLeagues(this.seasonSelectionId);
          this.leagueListSubscription = this.leagueService.getLeagueListUpdateListener()
            .subscribe((data: LeaguesModel[]) => {
              this.leagueList = data.sort((a, b) => a.orderNo - b.orderNo);
              this.leagueSelectionId = this.leagueSelectionId || this.leagueList[0]["id"];
              this.groupstageService.getGroupstages(this.leagueSelectionId);
              this.groupstageListSubscription = this.groupstageService.getGroupStageListUpdateListener()
                .subscribe((data: GroupStagesModel[]) => {
                  this.groupstageList = data.sort((a, b) => a.orderNo - b.orderNo);
                  this.isLoading = false;
                });
            });
        });
    });
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.groupstageService.deleteGroupStage(id);
    this.isLoading = false;
  }

  onSeasonChange(seasonId: number) {
    this.isLoading = true;
    this.leagueSelectionId = null;
    this.leagueService.getLeagues(seasonId);
    this.isLoading = false;
  }

  onLeagueChange(leagueId: number) {
    this.isLoading = true;
    this.groupstageService.getGroupstages(leagueId);
    this.isLoading = false;
  }

  findPeriodSystem(periodSystem: number) {
    return groupPeriodSystemList.find(e => {return e.value == periodSystem}).name
  }

  ngOnDestroy(): void {
    this.seasonsListSubscription.unsubscribe();
    this.leagueListSubscription.unsubscribe();
    this.groupstageListSubscription.unsubscribe();
  }
}
