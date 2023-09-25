import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { SeasonsModel } from "../../models/admin-seasons.model";
import { SeasonsService } from "../../services/admin-seasons.service";

import { WeeklyMatchProgramModel } from "../../models/admin-weeklymatchprogram.model";
import { WeeklyMatchProgramService } from "../../services/admin-weeklymatchprogram.service";

import { AdminWeeklyMatchProgramCreateModal } from "../weekly-match-program-create/weekly-match-program-create.component";

import { globalFunctions } from "../../../functions/global.function";

import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-admin-weeklymatchprogram-list',
  templateUrl: './weekly-match-program-list.component.html',
  styleUrls: ['../../../app.component.css', './weekly-match-program-list.component.css']
})
export class AdminWeeklyMatchProgramList implements OnInit, OnDestroy {
  toolbarTitle = "HAFTALIK BÜLTEN";
  isLoading: boolean = false;

  seasonsList: SeasonsModel[] = [];
  private seasonsListSubscription: Subscription;
  weeklyMatchProgramList: WeeklyMatchProgramModel[] = [];
  private weeklyMatchProgramListSubscription: Subscription;

  @Input() seasonSelectionId: number;
  tableColumns: string[] = [
                            "seasonName",
                            "programId",
                            "beginDate",
                            "endDate",
                            "isActive",
                            "actions"
                          ];

  constructor(
    private seasonsService: SeasonsService,
    private weeklymatchprogramService: WeeklyMatchProgramService,
    private dialog: MatDialog,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListUpdateListener()
      .subscribe({
        next: (data: SeasonsModel[]) => {
          if (data.length > 0) {
            this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
            this.seasonSelectionId = this.seasonsList[0]["id"];
            this.weeklymatchprogramService.getWeeklyMatchProgram(this.seasonSelectionId);
          } else {
            this.seasonSelectionId = null;
            this.weeklyMatchProgramList = [];
            this.isLoading = false;
          }
        }
      });

    this.weeklyMatchProgramListSubscription = this.weeklymatchprogramService.getDocumentsListUpdateListener()
      .subscribe({
        next: (data: WeeklyMatchProgramModel[]) => {
          this.weeklyMatchProgramList = data;
          this.isLoading = false;
        }
      });
  }

  onSeasonChange(seasonId: number) {
    this.isLoading = true;
    this.weeklymatchprogramService.getWeeklyMatchProgram(seasonId);
  }

  onActiveChange(weeklyMatchProgram: WeeklyMatchProgramModel) {
    this.onEdit(weeklyMatchProgram);
  }

  findSeasonName(seasonId: number): string {
    return this.seasonsList.find(s => s.id == seasonId).seasonName;
  }

  onCreate() {
    const dialogRef = this.dialog.open(AdminWeeklyMatchProgramCreateModal, {
      data: {
        pageMode: "create",
        weeklyMatchProgramInfo: null,
        selectedSeasonId: this.seasonSelectionId,
        selectedSeasonName: this.findSeasonName(this.seasonSelectionId)
      }
    });
  }

  onEdit(weeklyMatchProgram: WeeklyMatchProgramModel) {
    this.weeklymatchprogramService.updateWeeklyMatchProgram(weeklyMatchProgram);
  }

  onDelete(seasonId: number, weeklyMatchProgramId: number) {
    const dialogRef = this.dialog.open(AdminConfirmationDialogModal, {
      data: {
        title: 'İŞLEMİ ONAYLIYOR MUSUNUZ?',
        message: 'Bu işlem verilerinizi kalıcı olarak silecektir, işleminizi onaylıyor musunuz?'
      }
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.weeklymatchprogramService.deleteWeeklyMatchProgram(seasonId, weeklyMatchProgramId);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.seasonsListSubscription.unsubscribe();
    this.weeklyMatchProgramListSubscription.unsubscribe();
  }
}
