import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { SeasonsModel } from "../../models/admin-seasons.model";
import { SeasonsService } from "../../services/admin/admin-seasons.service";
import { LeaguesModel } from "../../models/admin-leagues.model";
import { LeaguesService } from "../../services/admin/admin-leagues.service";
import { AdminLeaguesCreateModal } from "../leagues-create/leagues-create.component";

import { leagueCategoryList } from "../../assets/lists/league-category-list";
import { leagueTypeList } from "../../assets/lists/league-type-list";

@Component({
  selector: 'app-admin-leagues-list',
  templateUrl: './leagues-list.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['../../../app.component.css', './leagues-list.component.css']
})
export class AdminLeaguesList implements OnInit, OnDestroy {
  headerTitle = 'LİGLER';
  isLoading = false;
  seasonsList: SeasonsModel[] = [];
  private seasonsListSubscription: Subscription;
  leagueList: LeaguesModel[] = [];
  private leagueListSubscription: Subscription;
  leagueCategoryList = leagueCategoryList;
  leagueTypeList = leagueTypeList;
  @Input() seasonSelectionId: number;
  displayedColumns: string[] = ["leagueName", "category", "leagueType", "isActive", "edit", "delete"];

  constructor(public leagueService: LeaguesService, public seasonsService: SeasonsService, public dialog: MatDialog){}


  ngOnInit(): void {
    this.isLoading = true;
    this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListSubListener()
      .subscribe((data: SeasonsModel[]) => {
        this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
        this.seasonSelectionId = this.seasonsList[0]["id"];
        this.leagueService.getLeagues(this.seasonSelectionId);
        this.leagueListSubscription = this.leagueService.getLeagueListUpdateListener()
          .subscribe((data: LeaguesModel[]) => {
            this.leagueList = data.sort((a, b) => a.orderNo - b.orderNo);
            this.isLoading = false;
            console.log(this.leagueList)
          });
      });

  }

  onSeasonChange(seasonChangedID: number) {
    this.isLoading = true;
    this.seasonSelectionId = seasonChangedID;
    this.leagueService.getLeagues(this.seasonSelectionId);
    this.isLoading = false;
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
        seasonList: this.seasonsList,
        seasonSelectionId: this.seasonSelectionId
      }
    });
  }

  onEdit(leagueInfo: LeaguesModel) {
    const dialogRef = this.dialog.open(AdminLeaguesCreateModal, {
      data: {
        pageMode: 'edit',
        leagueInfo: leagueInfo,
        seasonList: this.seasonsList,
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
