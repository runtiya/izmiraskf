import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

import { FixtureModel } from "../../models/application-fixture.model";
import { FixtureService } from "../../services/application-fixtures.service";


import { globalFunctions } from "../../../functions/global.function";
import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon.list";
import { matchStatusList } from "../../../assets/lists/match-status.list";

@Component({
  selector: 'app-application-fixture-by-week',
  templateUrl: './fixture-by-week.component.html',
  styleUrls: ['../../../app.component.css', './fixture-by-week.component.css']
})
export class ApplicationFixtureByWeek implements OnInit, OnDestroy {
  toolbarTitle = "HAFTANIN KARŞILAŞMALARI";
  isLoading = false;
  fixtureList: FixtureModel[] = [];
  private fixtureListSub: Subscription;

  matchStatusList = matchStatusList;
  fontAwesomeIconList = fontAwesomeIconList;

  constructor(
    private fixtureService: FixtureService,
    private globalFunctions: globalFunctions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fixtureListSub = this.fixtureService.getFixtureUpdateListener()
      .subscribe({
        next: (data: FixtureModel[]) => {
          this.fixtureList = data;
        },
        error: (error) => {

        }
      });
  }

  getMatchDate(_date: Date): string {
    const longDate = this.getLocalDateForLongDate(_date);
    const shortTime = this.getLocalDateForShortTime(_date);
    const formattedDate = (longDate || shortTime) ? (longDate + " " + shortTime) : null;
    return formattedDate;
  }

  getLocalDateForLongDate(_date: Date): string {
    return this.globalFunctions.registerLocalDateForLongDate(_date);
  }

  getLocalDateForShortTime(_date: Date): string {
    return this.globalFunctions.registerLocalDateForShortTime(_date);
  }

  findMatchStatus(status: string): string {
    return this.matchStatusList.find(s => s.name == status).value;
  }

  findMatchStatusClass(status: string): string {
    return this.matchStatusList.find(s => s.name == status).class;
  }

  showStadiumDetails(_stadiumId: number) {
    this.router.navigate(['/sahalar/detaylar', _stadiumId]);
  }

  showTeamDetails(_teamId: number) {
    this.router.navigate(['/takimlar/detaylar', _teamId]);
  }

  ngOnDestroy(): void {
    this.fixtureListSub.unsubscribe();
  }
}
