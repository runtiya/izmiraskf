import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { WeeklyMatchProgramModel } from "../../models/application-weeklymatchprogram.model";
import { WeeklyMatchProgramService } from "../../services/application-weeklymatchprogram.service";

import { WeeklyMatchListModel } from "../../models/application-weeklymatchlist.model";
import { WeeklyMatchListService } from "../../services/application-weeklymatchlist.service";

import { FixtureModel } from "../../models/application-fixture.model";
import { FixtureService } from "../../services/application-fixtures.service";

import { fixtureFunctions } from "../../functions/fixture.function";
import { globalFunctions } from "../../../functions/global.function";

import { matchStatusList } from "../../../assets/lists/match-status.list";

@Component({
  selector: 'app-application-weekly-match-list-slider-in-home',
  templateUrl: './weekly-match-list-slider-in-home.component.html',
  styleUrls: ['../../../app.component.css', './weekly-match-list-slider-in-home.component.css']
})
export class ApplicationWeeklyMatchListSliderInHome implements OnInit, OnDestroy {
  isLoading: boolean = false;
  marqueeText: string = '';
  htmlContent: string = '<p>Merhaba, <strong>Angular</strong> ile HTML içeriğini görüntülüyorum!</p>';
  title: string = "Haftanın Karşılaşmaları";

  weeklyMatchProgramList: WeeklyMatchProgramModel[] = [];
  private weeklyMatchProgramListSubscription: Subscription;
  weeklyMatchList: WeeklyMatchListModel[] = [];
  private weeklyMatchListSubscription: Subscription;
  fixtureList: FixtureModel[] = [];
  private fixtureListSub: Subscription;

  matchStatusList: Array<any> = matchStatusList;

  constructor(
    private weeklymatchprogramService: WeeklyMatchProgramService,
    private weeklymatchlistService: WeeklyMatchListService,
    private fixtureService: FixtureService,
    private fixtureFunctions: fixtureFunctions,
    private globalFunctions: globalFunctions,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.weeklymatchprogramService.getWeeklyMatchProgram();
    this.weeklyMatchProgramListSubscription = this.weeklymatchprogramService.getDocumentsListUpdateListener()
      .subscribe({
        next: (data: WeeklyMatchProgramModel[]) => {
          if (data.length > 0) {
            this.weeklyMatchProgramList = data;
            let _weeklyMatchProgramIds: Array<number> = [];
            this.weeklyMatchProgramList.forEach(wmpl => {
              _weeklyMatchProgramIds.push(wmpl.id);
            });

            this.weeklymatchlistService.getWeeklyMatchList();
            this.onSearchFixture(_weeklyMatchProgramIds);
          } else {
            this.weeklyMatchProgramList = [];
            this.weeklyMatchList = [];
            this.fixtureList = [];
            this.isLoading = false;
          }
        }
      });

    this.weeklyMatchListSubscription = this.weeklymatchlistService.getWeeklyMatchListUpdateListener()
      .subscribe({
        next: (data: WeeklyMatchListModel[]) => {
          this.weeklyMatchList = data;
        }
      });

    this.fixtureListSub = this.fixtureService.getFixtureUpdateListener()
      .subscribe({
        next: (data: FixtureModel[]) => {
          this.fixtureList = data.sort((a, b) => new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime());
          this.isLoading = false;
          this.fixtureList.forEach(f => {
            this.marqueeText += `
            <a>
            ${f.homeTeamShortName || f.homeTeamOfficialName}
            ${f.homeTeamScore !== null ? f.homeTeamScore.toString() : ''} - ${f.awayTeamScore !== null ? f.homeTeamScore.toString() : ''}
            ${f.awayTeamShortName || f.awayTeamOfficialName}
            </a>
            •
            `;
          });
        }
      });
  }

  onSearchFixture(weeklyMatchProgramIds: Array<number>) {
    let fixtureSearchModel = this.fixtureFunctions.setFixtureSearchModel(
      null,null, null, null, null, null, null, null, null, null, null, null,
      weeklyMatchProgramIds
    );

    this.fixtureService.getFixtureBySearchIndex(fixtureSearchModel);
  }

  showWeeklyMatchList() {
    this.router.navigate(['/haftalik-bulten']);
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  ngOnDestroy(): void {
    this.weeklyMatchProgramListSubscription.unsubscribe();
    this.weeklyMatchListSubscription.unsubscribe();
    this.fixtureListSub.unsubscribe();
  }

}
