import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";


import { SeasonsModel } from "../../models/admin-seasons.model";
import { SeasonsService } from "../../services/admin-seasons.service";
import { AdminSeasonsCreateModal } from "../seasons-create/seasons-create.component";

import { globalFunctions } from "../../../functions/global.function";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-admin-seasons-list',
  templateUrl: './seasons-list.component.html',
  styleUrls: ['../../../app.component.css', './seasons-list.component.css']
})
export class AdminSeasonsList implements OnInit, OnDestroy {
  toolbarTitle = "SEZONLAR";
  isLoading: boolean = false;
  seasonsList: SeasonsModel[] = [];
  private seasonsListSubscription: Subscription;
  tableColumns: string[] = [
                                "seasonName",
                                "seasonYear",
                                "isActive",
                                "actions"
                              ];

  constructor(
    private seasonsService: SeasonsService,
    private dialog: MatDialog,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListUpdateListener()
      .subscribe({
        next: (data: SeasonsModel[]) => {
          this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
          this.isLoading = false;
        }
      });
  }

  onCreate() {
    const dialogRef = this.dialog.open(AdminSeasonsCreateModal, {
      data: {
        pageMode: 'create'
      }
    });
  }

  onEdit(seasonInfo: SeasonsModel) {
    const dialogRef = this.dialog.open(AdminSeasonsCreateModal, {
      data: {
        pageMode: 'edit',
        seasonInfo: seasonInfo
      }
    });
  }

  onDelete(id: number) {
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
            this.seasonsService.deleteSeason(id);
          }
        }
      });
  }

  ngOnDestroy() {
    this.seasonsListSubscription.unsubscribe();
  }
}
