import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";

import { GlobalStatisticsService } from "../../services/global-statistics.service";

import { SeasonsModel } from "../../application/models/application-seasons.model";
import { SeasonsService } from "../../application/services/application-seasons.service";


@Component({
  selector: 'app-global-statistics-season-summary-list',
  templateUrl: './statistics-season-summary-list.component.html',
  styleUrls: ['../../app.component.css', './statistics-season-summary-list.component.css']
})
export class GlobalStatisticsSeasonSummaryList implements OnInit, OnDestroy {

  seasonSummaryList: any[] = [];
  _seasonSummaryList: any[];
  private seasonSummaryListSub: Subscription;

  seasonsList: SeasonsModel[] = [];
  private seasonsListSubscription: Subscription;

  @Input() seasonSelectionId: number;

  tableColumnsSeasonSummaryTable: string[] = [
    "seasonName",
    "leagueName",
    "groupstageName",
    "teamsCount",
    "matchCount"
  ];

  totalMatchCount: number = 0;

  constructor(
    private statisticsService: GlobalStatisticsService,
    private seasonsService: SeasonsService,
  ) {}

  ngOnInit(): void {
    //this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListUpdateListener()
      .subscribe({
        next: (data: SeasonsModel[]) => {
          this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
          this.seasonSelectionId = this.seasonsList[0]["id"];
          this.statisticsService.getSeasonSummaryList(this.seasonSelectionId);
        }
      });

    this.seasonSummaryListSub = this.statisticsService.getSeasonSummaryListUpdateListener()
      .subscribe({
        next: (data: any[]) => {
          this.seasonSummaryList = data;
          this.totalMatchCount = 0;
          this.seasonSummaryList.forEach(ssl => {
            this.totalMatchCount += ssl.totalMatches;
          });
        }
      });

  }

  onSeasonChange(seasonId: number) {
    this.statisticsService.getSeasonSummaryList(seasonId);
  }

  ngOnDestroy(): void {
    this.seasonSummaryListSub.unsubscribe();
    this.seasonsListSubscription.unsubscribe();
  }
}
