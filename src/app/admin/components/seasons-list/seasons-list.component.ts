import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";


import { SeasonsModel } from "../../models/admin-seasons.model";
import { SeasonsService } from "../../services/admin/admin-seasons.service";
import { AdminSeasonsCreateModal } from "../seasons-create/seasons-create.component";



@Component({
  selector: 'app-admin-seasons-list',
  templateUrl: './seasons-list.component.html',
  styleUrls: ['../../../app.component.css', './seasons-list.component.css']
})
export class AdminSeasonsList {
  headerTitle = 'SEZONLAR';
  isLoading = false;
  seasonsList: SeasonsModel[] = [];
  private seasonsListSubscription: Subscription;

  constructor(public seasonsService: SeasonsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = true;
    this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListSubListener()
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

    dialogRef.afterClosed().subscribe(result => {
      this.seasonsListSubscription = this.seasonsService.getSeasonsListSubListener()
        .subscribe((data: SeasonsModel[]) => {
          this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
        });
    });
  }

  onEdit(seasonInfo: SeasonsModel) {
    const dialogRef = this.dialog.open(AdminSeasonsCreateModal, {
      data: {
        pageMode: 'edit',
        seasonInfo: seasonInfo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.seasonsListSubscription = this.seasonsService.getSeasonsListSubListener()
        .subscribe((data: SeasonsModel[]) => {
          this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
        });
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
