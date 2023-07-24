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

import { groupPeriodSystemList } from "../../../assets/lists/group-period-system.list";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-admin-groupstages-list',
  templateUrl: './groupstages-list.component.html',
  styleUrls: ['../../../app.component.css', './groupstages-list.component.css']
})
export class AdminGroupList implements OnInit, OnDestroy {
  toolbarTitle = 'GRUPLAR';
  isLoading: boolean = false;
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
                              "isActive",
                              "actions"
                            ];

  @Input() seasonSelectionId: number;
  @Input() leagueSelectionId: number;

  constructor(public groupstageService: GroupStagesService,
              public leagueService: LeaguesService,
              public seasonsService: SeasonsService,
              public dialog: MatDialog,
              private globalFunctions: globalFunctions
            ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListUpdateListener()
      .subscribe((data: SeasonsModel[]) => {
        if (data.length > 0) {
          this.seasonList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
          this.seasonSelectionId = this.seasonList[0]["id"];
          this.leagueService.getLeagues(this.seasonSelectionId);
        } else {
          this.seasonList = [];
          this.leagueList = [];
          this.groupstageList = [];
        }
      });

    this.leagueListSubscription = this.leagueService.getLeagueListUpdateListener()
      .subscribe((data: LeaguesModel[]) => {
        if (data.length > 0) {
          this.leagueList = data.sort((a, b) => a.orderNo - b.orderNo);
          this.leagueSelectionId = this.leagueList[0]["id"];
          this.groupstageService.getGroupstages(this.leagueSelectionId);
        } else {
          this.leagueList = [];
          this.groupstageList = [];
        }
      });

    this.groupstageListSubscription = this.groupstageService.getGroupStageListUpdateListener()
      .subscribe((data: GroupStagesModel[]) => {
        if (data.length > 0) {
          this.groupstageList = data.sort((a, b) => a.orderNo - b.orderNo);
          this.isLoading = false;
        } else {
          this.groupstageList = [];
        }
      });
  }

  onCreate() {
    const dialogRef = this.dialog.open(AdminGroupStagesCreateModal, {
      data: {
        pageMode: 'create',
        seasonSelectionId: this.seasonSelectionId,
        seasonName: this.seasonList.find(s => s.id == this.seasonSelectionId).seasonName,
        leagueSelectionId: this.leagueSelectionId,
        leagueName: this.leagueList.find(l => l.id == this.leagueSelectionId).leagueName
      }
    });
  }

  onEdit(groupstageInfo: GroupStagesModel) {
    const dialogRef = this.dialog.open(AdminGroupStagesCreateModal, {
      data: {
        pageMode: 'edit',
        groupstageInfo: groupstageInfo,
        seasonSelectionId: this.seasonSelectionId,
        seasonName: this.seasonList.find(s => s.id == this.seasonSelectionId).seasonName,
        leagueSelectionId: this.leagueSelectionId,
        leagueName: this.leagueList.find(l => l.id == this.leagueSelectionId).leagueName
      }
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

  findSeasonName(seasonId: number): string {
    return this.seasonList.find(s => s.id == seasonId).seasonName;
  }

  findLeagueName(leagueId: number): string {
    return this.leagueList.find(l => l.id == leagueId).leagueName;
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
