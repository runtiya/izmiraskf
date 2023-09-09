import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";
import { Subscription } from "rxjs";

import { LeaguesModel } from "../../models/admin-leagues.model";
import { SeasonsModel } from "../../models/admin-seasons.model";

import { GroupStagesService } from "../../services/admin-groupstages.service";
import { LeaguesService } from "../../services/admin-leagues.service";
import { SeasonsService } from "../../services/admin-seasons.service";

import { groupPeriodSystemList } from "../../../assets/lists/group-period-system.list";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-admin-groupstages-create',
  templateUrl: './groupstages-create.component.html',
  styleUrls: ['../../../app.component.css', './groupstages-create.component.css']
})
export class AdminGroupStagesCreateModal implements OnInit {
  isLoading: boolean = false;
  pageMode: string = this.data.pageMode || 'create';
  groupstageInfo = this.data.groupstageInfo;
  seasonName = this.data.seasonName;
  leagueName = this.data.leagueName;
  leagueList: LeaguesModel[] = [];
  private leagueListSubscription: Subscription;
  seasonList: SeasonsModel[] = this.data.seasonList || [];
  private seasonsListSubscription: Subscription;
  groupstageSubmitForm: FormGroup;
  groupPeriodSystemList = groupPeriodSystemList;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Data,
    private dialogRef: MatDialogRef<AdminGroupStagesCreateModal>,
    private dialog: MatDialog,
    private groupstagesService: GroupStagesService,
    private leagueService: LeaguesService,
    private seasonsService: SeasonsService
    ) {}

  ngOnInit() {
    this.isLoading = true;
    this.groupstageSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.id : null, {validators: []}),
      createdAt: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.createdAt : null, {validators: []}),
      createdBy: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.createdBy : null, {validators: []}),
      updatedAt: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.updatedAt : null, {validators: []}),
      updatedBy: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.updatedBy : null, {validators: []}),
      seasonId: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.seasonId : this.data.seasonSelectionId, {validators: [Validators.required]}),
      leagueId: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.leagueId : this.data.leagueSelectionId, {validators: [Validators.required]}),
      groupName: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.groupName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      periodSystem: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.periodSystem : groupPeriodSystemList[1].value, {validators: [Validators.required]}),
      isActive: new FormControl(this.pageMode == 'edit' ? !!this.groupstageInfo.isActive : true, {validators: [Validators.required]}),
      orderNo: new FormControl(this.pageMode == 'edit' ? this.groupstageInfo.orderNo : 1, {validators: [Validators.required]})
    });
    this.isLoading = false;
  }

  onSubmitForm() {

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

    }
  }

  onSeasonChange() {
    this.isLoading = true;
    let seasonId = this.groupstageSubmitForm.get('seasonId').value;
    this.leagueService.getLeagues(seasonId);
    this.isLoading = false;
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
            this.groupstagesService.deleteGroupStage(id);
            this.dialogRef.close();
          }
        }
      });
  }

}
