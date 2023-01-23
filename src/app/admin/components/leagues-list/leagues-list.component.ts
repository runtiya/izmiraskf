import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { SeasonsModel } from "../../models/admin-seasons.model";
import { SeasonsService } from "../../services/admin/admin-seasons.service";
import { LeaguesModel } from "../../models/admin-leagues.model";
import { LeaguesService } from "../../services/admin/admin-leagues.service";

import { leagueCategoryList } from "../../assets/lists/league-category-list";
import { leagueTypeList } from "../../assets/lists/league-type-list";

@Component({
  selector: 'app-admin-leagues-list',
  templateUrl: './leagues-list.component.html',
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

  constructor(public leagueService: LeaguesService, public seasonsService: SeasonsService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.isLoading = true;
    this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListSubListener()
      .subscribe((data: SeasonsModel[]) => {
        this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
        this.leagueService.getLeagues(this.seasonsList[0]["id"]);
        this.leagueListSubscription = this.leagueService.getLeagueListUpdateListener()
          .subscribe((data: LeaguesModel[]) => {
            this.leagueList = data;
            this.isLoading = false;
            console.log(this.leagueList)
          })
      });
  }

  onCreate() {

  }

  ngOnDestroy(): void {
    this.leagueListSubscription.unsubscribe();
  }
}
