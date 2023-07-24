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
    public dialog: MatDialog,
    private globalFunctions: globalFunctions
    ){}


  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListUpdateListener()
      .subscribe((data: SeasonsModel[]) => {
        this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
        this.seasonSelectionId = this.seasonsList[0]["id"];
        this.leagueService.getLeagues(this.seasonSelectionId);
        this.leagueListSubscription = this.leagueService.getLeagueListUpdateListener()
          .subscribe((data: LeaguesModel[]) => {
            const filteredLeagueList = data.filter(league => league.seasonId === this.seasonSelectionId);
            this.leagueList = filteredLeagueList.sort((a, b) => a.orderNo - b.orderNo);
            this.isLoading = false;
          });
      });

  }

  onSeasonChange(seasonId: number) {
    this.isLoading = true;
    this.leagueService.getLeagues(seasonId);
    this.isLoading = false;
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
    this.isLoading = true;
    this.leagueService.deleteLeague(id);
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.seasonsListSubscription.unsubscribe();
    this.leagueListSubscription.unsubscribe();
  }
}
