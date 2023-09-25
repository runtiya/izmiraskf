import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material/dialog";

import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";
import { TeamsInGroupstagesService } from "../../services/admin-teams-in-groupstages.service";

import { StadiumsModel } from "../../models/admin-stadiums.model";
import { StadiumsService } from "../../services/admin-stadiums.service";

import { FixtureService } from "../../services/admin-fixtures.service";

import { globalFunctions } from "../../../functions/global.function";

import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-admin-teamsingroupstages-in-fixturecreate',
  templateUrl: './teamsingroupstages-in-fixturecreate.component.html',
  styleUrls: ['../../../app.component.css', './teamsingroupstages-in-fixturecreate.component.css']
})
export class AdminTeamsInGroupstagesInFixtureCreate implements OnInit, OnDestroy {
  isLoading: boolean = false;
  teamsingroupstagesList: TeamsInGroupstagesModel[] = [];
  private teamsingroupstagesListSub: Subscription;
  stadiumList: StadiumsModel[] = [];
  private stadiumListSub: Subscription;

  tableColumnsGroup: string[] = [
                                  "orderNo",
                                  "status",
                                  "teamName",
                                  "stadiumName"
                                ];

  @Input() groupstageSelectionId: number;

  constructor(
    private teamsingroupstagesService: TeamsInGroupstagesService,
    private stadiumService: StadiumsService,
    private fixturesService: FixtureService,
    private globalFunctions: globalFunctions,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.teamsingroupstagesListSub = this.teamsingroupstagesService.getTeamsInGroupstagesUpdateListener()
      .subscribe({
        next: (data: TeamsInGroupstagesModel[]) => {
          if (data.length > 0) {
            this.teamsingroupstagesList = data.sort((a, b) => a.orderNo - b.orderNo);
            this.groupstageSelectionId = this.teamsingroupstagesList[0].groupstageId;
          } else {
            this.teamsingroupstagesList = [];
            this.groupstageSelectionId = null;
          }
          this.isLoading = false;
        }
      });

    this.stadiumListSub = this.stadiumService.getStadiumListUpdateListener()
      .subscribe({
        next: (data: {stadiumsList: StadiumsModel[], stadiumsCount: number}) => {
          this.stadiumList = data.stadiumsList;
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.teamsingroupstagesList, event.previousIndex, event.currentIndex);
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  onSaveTeamsInGroupstages(teams: TeamsInGroupstagesModel[]) {
    const dialogRef = this.dialog.open(AdminConfirmationDialogModal, {
      data: {
        title: "İŞLEMİ ONAYLIYOR MUSUNUZ?",
        message: "Lütfen fikstür bilgilerinizin silindiğinden emin olun! İşleminizi onaylıyor musunuz?"
      }
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            teams.forEach((team, i) => team.orderNo = i+1);
            this.teamsingroupstagesService.createTeamsInGroupstages(teams, this.groupstageSelectionId);

            this.fixturesService.clearFixture(this.groupstageSelectionId);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.teamsingroupstagesListSub.unsubscribe();
  }
}
