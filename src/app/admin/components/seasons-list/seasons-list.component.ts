import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";


import { SeasonsModel } from "../../models/admin-seasons.model";
import { SeasonsService } from "../../services/admin-seasons.service";
import { AdminSeasonsCreateModal } from "../seasons-create/seasons-create.component";

import { globalFunctions } from "../../../functions/global.function";

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
    public seasonsService: SeasonsService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListUpdateListener()
      .subscribe((data: SeasonsModel[]) => {
        this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
        this.isLoading = false;
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
    this.isLoading = true;
    this.seasonsService.deleteSeason(id);
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.seasonsListSubscription.unsubscribe();
  }
}
