import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";
import { Subscription } from "rxjs";

import { LeaguesModel } from "../../models/admin-leagues.model";
import { SeasonsModel } from "../../models/admin-seasons.model";

import { GroupStagesService } from "../../services/admin/admin-groupstages.service";
import { LeaguesService } from "../../services/admin/admin-leagues.service";
import { SeasonsService } from "../../services/admin/admin-seasons.service";

import { groupPeriodSystemList } from "../../assets/lists/group-period-system-list";

@Component({
  selector: 'app-admin-groupstages-create',
  templateUrl: './groupstages-create.component.html',
  styleUrls: ['../../../app.component.css', './groupstages-create.component.css']
})
export class AdminGroupStagesCreateModal {
  isLoading = false;
  pageMode: string = this.data.pageMode || 'create';
  groupstageInfo = this.data.groupstageInfo;
  leagueList: LeaguesModel[] = [];
  private leagueListSubscription: Subscription;
  seasonList: SeasonsModel[] = [];
  private seasonsListSubscription: Subscription;
  groupstageSubmitForm: FormGroup;
  groupPeriodSystemList = groupPeriodSystemList;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Data,
              public dialogRef: MatDialogRef<AdminGroupStagesCreateModal>,
              public groupstagesService: GroupStagesService,
              public leagueService: LeaguesService,
              public seasonsService: SeasonsService
            ) {}

  ngOnInit() {
    this.isLoading = true;
    this.seasonsService.getSeasons();
    this.seasonsListSubscription = this.seasonsService.getSeasonsListSubListener()
      .subscribe((data: SeasonsModel[]) => {
        this.seasonList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
        //this.leagueService.getLeagues(this.seasonList[0]["id"]);
        this.leagueListSubscription = this.leagueService.getLeagueListUpdateListener()
          .subscribe((data: LeaguesModel[]) => {
            this.leagueList = data.sort((a, b) => a.orderNo - b.orderNo);
          });
        this.groupstageSubmitForm = new FormGroup({
          id: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.id : null, {validators: []}),
          seasonId: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.seasonId : this.seasonList[0]["id"], {validators: [Validators.required]}),
          leagueId: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.leagueId : null, {validators: [Validators.required]}),
          groupName: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.groupName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
          periodSystem: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.periodSystem : null, {validators: [Validators.required]}),
          orderNo: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.orderNo : 1, {validators: [Validators.required]})
        })
        this.isLoading = false;
      });



  }

  onSubmitForm() {
    console.log(this.groupstageSubmitForm.value);

    if (this.groupstageSubmitForm.valid) {
      this.isLoading = true;
      if (this.pageMode === 'create') {
        this.groupstagesService.createGroupStage(this.groupstageSubmitForm.value);
      } else {
        this.groupstagesService.updateGroupStage(this.groupstageSubmitForm.value);
      }
      this.isLoading = false;
      this.dialogRef.close();
    } else {
      console.log(this.groupstageSubmitForm.value);
    }
  }

  onSeasonChange() {
    this.isLoading = true;
    let seasonId = this.groupstageSubmitForm.get('seasonId').value;
    this.leagueService.getLeagues(seasonId);
    this.isLoading = false;
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.groupstagesService.deleteGroupStage(id);
    this.isLoading = false;

    this.dialogRef.close();
  }
}
