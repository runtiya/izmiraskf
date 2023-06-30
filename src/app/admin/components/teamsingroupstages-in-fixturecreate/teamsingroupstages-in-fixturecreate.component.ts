import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from "@angular/material/dialog";

import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";
import { TeamsInGroupstagesService } from "../../services/admin-teams-in-groupstages.service";

import { StadiumsModel } from "../../models/admin-stadiums.model";
import { StadiumsService } from "../../services/admin-stadiums.service";

import { globalFunctions } from "../../../functions/global.function";
import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon.list";


@Component({
  selector: 'app-admin-teamsingroupstages-in-fixturecreate',
  templateUrl: './teamsingroupstages-in-fixturecreate.component.html',
  styleUrls: ['../../../app.component.css', './teamsingroupstages-in-fixturecreate.component.css']
})
export class AdminTeamsInGroupstagesInFixtureCreate implements OnInit, OnDestroy {
  teamsingroupstagesList: TeamsInGroupstagesModel[] = [];
  private teamsingroupstagesListSub: Subscription;
  stadiumList: StadiumsModel[] = [];
  private stadiumListSub: Subscription;
  fontAwesomeIconList = fontAwesomeIconList;
  tableColumnsGroup: string[] = [
                                  "orderNo",
                                  "status",
                                  "teamName",
                                  "stadiumName"
                                ];

  constructor(
    private teamsingroupstagesService: TeamsInGroupstagesService,
    private stadiumService: StadiumsService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.teamsingroupstagesListSub = this.teamsingroupstagesService.getTeamsInGroupstagesUpdateListener()
      .subscribe({
        next: (data: TeamsInGroupstagesModel[]) => {
          if (data.length > 0) {
            this.teamsingroupstagesList = data.sort((a, b) => a.orderNo - b.orderNo);
          } else {
            this.teamsingroupstagesList = [];
          }

        },
        error: (error) => {

        }
      });

    this.stadiumListSub = this.stadiumService.getStadiumListUpdateListener()
      .subscribe({
        next: (data: StadiumsModel[]) => {
          this.stadiumList = data;
        },
        error: (error) => {

        }
      });
  }

  findExpelledOrReceded(teamId: number): boolean {
    let team: TeamsInGroupstagesModel = this.teamsingroupstagesList.find(team => team.teamId == teamId);
    return !!team ? (team.isExpelled || team.isReceded) : false;
  }

  findExpelledOrRecededExplanation(teamId: number): string {
    let team: TeamsInGroupstagesModel = this.teamsingroupstagesList.find(team => team.teamId == teamId);
    return !!team ? team.explanation : null;
  }

  findStadium(stadiumId: number): string {
    return !!stadiumId ? this.stadiumList.find(stadium => stadium.id == stadiumId).stadiumName : null;
  }

  ngOnDestroy(): void {
    this.teamsingroupstagesListSub.unsubscribe();
  }
}
