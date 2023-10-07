import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";
import { TeamsInGroupstagesService } from "../../services/admin-teams-in-groupstages.service";

import { PointBoardModel } from "../../models/admin-pointboard.model";
import { PointBoardService } from "../../services/admin-pointboard.service";

import { globalFunctions } from "../../../functions/global.function";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-admin-point-board',
  templateUrl: './point-board.component.html',
  styleUrls: ['../../../app.component.css', './point-board.component.css']
})
export class AdminPointBoard implements OnInit, OnDestroy {
  toolbarTitle = "PUAN TABLOSU";
  isLoading: boolean = false;
  teamsingroupstageList: TeamsInGroupstagesModel[] = [];
  private teamsingroupstageListSub: Subscription;
  expelledOrRecededTeamsInGroupstageList: TeamsInGroupstagesModel[] = [];
  pointBoardList: PointBoardModel[] = [];
  private pointBoardListSub: Subscription;
  environment = environment;

  tableColumnsPointBoard: string[] = [
                                      "order",
                                      "team",
                                      "played",
                                      "win",
                                      "draw",
                                      "lose",
                                      "goalScored",
                                      "goalConceded",
                                      "goalAverage",
                                      "totalPoints"
                                    ];

  constructor(
    private teamsingroupstageService: TeamsInGroupstagesService,
    private pointboardService: PointBoardService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.teamsingroupstageListSub = this.teamsingroupstageService.getTeamsInGroupstagesUpdateListener()
      .subscribe({
        next: (data: TeamsInGroupstagesModel[]) => {
          if (data.length > 0) {
            this.teamsingroupstageList = data;
            this.teamsingroupstageList.map(t => {
              if (t.teamImagePath !== null) {
                t.teamImagePath = `${environment.serverUrl}${t.teamImagePath}`;
              }
            });
            this.expelledOrRecededTeamsInGroupstageList = this.teamsingroupstageList.filter(t => !!t.isExpelled || !!t.isReceded);
          } else {
            this.teamsingroupstageList = [];
            this.expelledOrRecededTeamsInGroupstageList = [];
          }

        }
      });

    this.pointBoardListSub = this.pointboardService.getPointBoardUpdateListener()
      .subscribe({
        next: (data: PointBoardModel[]) => {
          if (data.length > 0) {
            this.pointBoardList = data;
            this.pointBoardList.map(p => {
              if (p.teamImagePath !== null) {
                p.teamImagePath = `${environment.serverUrl}${p.teamImagePath}`;
              }
            });
          } else {
            this.pointBoardList = [];
          }
        }
      });

  }

  findExpelledOrRecededTeam(_teamId: number): boolean {
    let team = this.expelledOrRecededTeamsInGroupstageList.find(team => team.teamId == _teamId);
    return !!team;
  }

  findExpelledOrRecededExplanation(_teamId: number): string {
    let team = this.expelledOrRecededTeamsInGroupstageList.find(team => team.teamId == _teamId);
    return !!team ? team.explanation : '';
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  ngOnDestroy(): void {
    this.pointBoardListSub.unsubscribe();
    this.teamsingroupstageListSub.unsubscribe();
  }
}
