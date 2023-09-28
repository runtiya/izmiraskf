import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { SeasonsModel } from "../../models/admin-seasons.model";
import { SeasonsService } from "../../services/admin-seasons.service";
import { LeaguesModel } from "../../models/admin-leagues.model";
import { LeaguesService } from "../../services/admin-leagues.service";
import { AdminLeaguesCreateModal } from "../leagues-create/leagues-create.component";

import { leagueCategoryList } from "../../../assets/lists/league-category.list";
import { leagueTypeList } from "../../../assets/lists/league-type.list";

import { globalFunctions } from "../../../functions/global.function";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-admin-leagues-list',
  templateUrl: './leagues-list.component.html',
  styleUrls: ['../../../app.component.css', './leagues-list.component.css']
})
export class AdminLeaguesList implements OnInit, OnDestroy {
  toolbarTitle = 'LİGLER';
  isLoading: boolean = false;
  seasonsList: SeasonsModel[] = [];
  private seasonsListSubscription: Subscription;
  leagueList: LeaguesModel[] = [];
  private leagueListSubscription: Subscription;
  leagueCategoryList = leagueCategoryList;
  leagueTypeList = leagueTypeList;
  @Input() seasonSelectionId: number;
  tableColumns: string[] = [
                            "seasonName",
                            "leagueName",
                            "category",
                            "leagueType",
                            "isActive",
                            "actions"
                          ];

  constructor(
    private leagueService: LeaguesService,
    private seasonsService: SeasonsService,
    private dialog: MatDialog,
    private globalFunctions: globalFunctions
    ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListUpdateListener()
      .subscribe({
        next: (data: SeasonsModel[]) => {
          if (data.length > 0) {
            this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
            this.seasonSelectionId = this.seasonsList[0]["id"];
            this.leagueService.getLeagues(this.seasonSelectionId);
          } else {
            this.seasonsList = [];
            this.leagueList = [];

            this.seasonSelectionId = null;

            this.isLoading = false;
          }
        }
      });

      this.leagueListSubscription = this.leagueService.getLeagueListUpdateListener()
        .subscribe({
          next: (data: LeaguesModel[]) => {
            if (data.length > 0) {
              const filteredLeagueList = data.filter(league => league.seasonId === this.seasonSelectionId);
              this.leagueList = filteredLeagueList.sort((a, b) => a.orderNo - b.orderNo);
            } else {
              this.leagueList = [];
            }
            this.isLoading = false;
          }
        })
  }

  onSeasonChange(seasonId: number) {
    this.isLoading = true;
    this.leagueService.getLeagues(seasonId);
  }

  findSeasonName(seasonId: number): string {
    return this.seasonsList.find(s => s.id == seasonId).seasonName;
  }

  findLeagueCategory(category: LeaguesModel["category"]) {
    return leagueCategoryList.find(e => { return e.name == category}).value;
  }

  findLeagueType(leagueType: LeaguesModel["leagueType"]) {
    return leagueTypeList.find(e => { return e.name == leagueType}).value;
  }

  onCreate() {
    this.isLoading = true;
    const dialogRef = this.dialog.open(AdminLeaguesCreateModal, {
      data: {
        pageMode: 'create',
        seasonName: this.seasonsList.find(s => s.id == this.seasonSelectionId).seasonName,
        seasonSelectionId: this.seasonSelectionId
      }
    });
  }

  onEdit(leagueInfo: LeaguesModel) {
    const dialogRef = this.dialog.open(AdminLeaguesCreateModal, {
      data: {
        pageMode: 'edit',
        leagueInfo: leagueInfo,
        seasonName: this.seasonsList.find(s => s.id == this.seasonSelectionId).seasonName,
        seasonSelectionId: this.seasonSelectionId
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
            this.leagueService.deleteLeague(id);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.seasonsListSubscription.unsubscribe();
    this.leagueListSubscription.unsubscribe();
  }
}
