import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

import { TeamsInGroupstagesModel } from "../../models/application-teams-in-groupstages.model";
import { TeamsInGroupstagesService } from "../../services/application-teams-in-groupstages.service";

import { PointBoardModel } from "../../models/application-pointboard.model";
import { PointBoardService } from "../../services/application-pointboard.service";

import { globalFunctions } from "../../../functions/global.function";
import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon.list";

@Component({
  selector: 'app-application-point-board',
  templateUrl: './point-board.component.html',
  styleUrls: ['../../../app.component.css', './point-board.component.css']
})
export class ApplicationPointBoard implements OnInit, OnDestroy {
  toolbarTitle = "PUAN TABLOSU";
  isLoading = false;
  teamsingroupstageList: TeamsInGroupstagesModel[] = [];
  private teamsingroupstageListSub: Subscription;
  expelledOrRecededTeamsInGroupstageList: TeamsInGroupstagesModel[] = [];
  pointBoardList: PointBoardModel[] = [];
  private pointBoardListSub: Subscription;

  fontAwesomeIconList = fontAwesomeIconList;
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
          this.teamsingroupstageList = data;
          this.expelledOrRecededTeamsInGroupstageList = this.teamsingroupstageList.filter(t => !!t.isExpelled || !!t.isReceded);
        },
        error: (error) => {

        }
      });

    this.pointBoardListSub = this.pointboardService.getPointBoardUpdateListener()
      .subscribe({
        next: (data: PointBoardModel[]) => {
          this.pointBoardList = data;
        },
        error: (error) => {

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

  showTeamDetails(_teamId: number) {
    this.router.navigate(['/takimlar/detaylar', _teamId]);
  }

  ngOnDestroy(): void {
    this.pointBoardListSub.unsubscribe();
    this.teamsingroupstageListSub.unsubscribe();
  }
}
