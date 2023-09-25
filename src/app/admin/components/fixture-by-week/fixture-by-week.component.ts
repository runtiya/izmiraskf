import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { FixtureModel } from "../../models/admin-fixture.model";
import { FixtureService } from "../../services/admin-fixtures.service";

import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";
import { TeamsInGroupstagesService } from "../../services/admin-teams-in-groupstages.service";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-admin-fixture-by-week',
  templateUrl: './fixture-by-week.component.html',
  styleUrls: ['../../../app.component.css', './fixture-by-week.component.css']
})
export class AdminFixtureByWeek implements OnInit, OnDestroy {
  toolbarTitle = "HAFTANIN KARŞILAŞMALARI";
  isLoading: boolean = false;
  fixtureList: FixtureModel[] = [];
  teamsingroupstageList: TeamsInGroupstagesModel[] = [];
  private teamsingroupstageListSub: Subscription;
  private fixtureListSub: Subscription;

  constructor(
    private fixtureService: FixtureService,
    private teamsingroupstageService: TeamsInGroupstagesService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fixtureListSub = this.fixtureService.getFixtureUpdateListener()
      .subscribe({
        next: (data: FixtureModel[]) => {
          this.fixtureList = data;
          this.isLoading = false;
        }
      });

    this.teamsingroupstageListSub = this.teamsingroupstageService.getTeamsInGroupstagesUpdateListener()
      .subscribe({
        next: (data: TeamsInGroupstagesModel[]) => {
          this.teamsingroupstageList = data;
        }
      });
  }

  getMatchDate(_date: Date): string {
    return this.globalFunctions.getDateTime(_date);
  }

  getMatchStatus(status: string): string {
    return this.globalFunctions.getMatchStatusValue(status);
  }

  getMatchStatusClass(status: string): string {
    return this.globalFunctions.getMatchStatusClass(status);
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  findTeamLogo(teamId: number): string {
    let team : TeamsInGroupstagesModel = this.teamsingroupstageList.find(team => team.teamId == teamId);
    return !!team ? team.teamImagePath : null;
  }

  ngOnDestroy(): void {
    this.fixtureListSub.unsubscribe();
  }
}
