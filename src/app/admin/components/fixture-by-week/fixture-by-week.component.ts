import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

import { FixtureModel } from "../../models/admin-fixture.model";
import { FixtureService } from "../../services/admin-fixtures.service";

import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";
import { TeamsInGroupstagesService } from "../../services/admin-teams-in-groupstages.service";

import { globalFunctions } from "../../../functions/global.function";
import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon.list";
import { matchStatusList } from "../../../assets/lists/match-status.list";

@Component({
  selector: 'app-admin-fixture-by-week',
  templateUrl: './fixture-by-week.component.html',
  styleUrls: ['../../../app.component.css', './fixture-by-week.component.css']
})
export class AdminFixtureByWeek implements OnInit, OnDestroy {
  toolbarTitle = "HAFTANIN KARŞILAŞMALARI";
  isLoading = false;
  fixtureList: FixtureModel[] = [];
  teamsingroupstageList: TeamsInGroupstagesModel[] = [];
  private teamsingroupstageListSub: Subscription;
  private fixtureListSub: Subscription;

  matchStatusList = matchStatusList;
  fontAwesomeIconList = fontAwesomeIconList;

  constructor(
    private fixtureService: FixtureService,
    private teamsingroupstageService: TeamsInGroupstagesService,
    private globalFunctions: globalFunctions
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

    this.teamsingroupstageListSub = this.teamsingroupstageService.getTeamsInGroupstagesUpdateListener()
      .subscribe({
        next: (data: TeamsInGroupstagesModel[]) => {
          this.teamsingroupstageList = data;
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

  findTeamLogo(teamId: number): string {
    let team : TeamsInGroupstagesModel = this.teamsingroupstageList.find(team => team.teamId == teamId);
    return !!team ? team.teamImagePath : null;
  }

  ngOnDestroy(): void {
    this.fixtureListSub.unsubscribe();
  }
}
