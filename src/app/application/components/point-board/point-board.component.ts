import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

import { TeamsInGroupstagesModel } from "../../models/application-teams-in-groupstages.model";
import { TeamsInGroupstagesService } from "../../services/application-teams-in-groupstages.service";

import { PointBoardModel } from "../../models/application-pointboard.model";
import { PointBoardService } from "../../services/application-pointboard.service";

import { globalFunctions } from "../../../functions/global.function";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-application-point-board',
  templateUrl: './point-board.component.html',
  styleUrls: ['../../../app.component.css', './point-board.component.css']
})
export class ApplicationPointBoard implements OnInit, OnDestroy {
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
    public teamsingroupstageService: TeamsInGroupstagesService,
    public pointboardService: PointBoardService,
    private globalFunctions: globalFunctions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teamsingroupstageListSub = this.teamsingroupstageService.getTeamsInGroupstagesUpdateListener()
      .subscribe({
        next: (data: TeamsInGroupstagesModel[]) => {
          if (data.length > 0) {
            this.teamsingroupstageList = data;
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

  showTeamDetails(_teamId: number) {
    this.router.navigate(['/takimlar/detaylar', _teamId]);
  }

  ngOnDestroy(): void {
    this.pointBoardListSub.unsubscribe();
    this.teamsingroupstageListSub.unsubscribe();
  }
}
