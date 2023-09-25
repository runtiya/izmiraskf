import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

import { SeasonsService } from "../../services/admin-seasons.service";
import { seasonYearList } from "../../../assets/lists/season-year.list";

@Component({
  selector: 'app-admin-seasons-create',
  templateUrl: './seasons-create.component.html',
  styleUrls: ['../../../app.component.css', './seasons-create.component.css']
})
export class AdminSeasonsCreateModal implements OnInit {
  isLoading: boolean = false;
  pageMode: string = this.data.pageMode || 'create';
  seasonInfo = this.data.seasonInfo;
  seasonSubmitForm: FormGroup;
  seasonYearList = seasonYearList;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Data,
    private dialogRef: MatDialogRef<AdminSeasonsCreateModal>,
    private dialog: MatDialog,
    private seasonsService: SeasonsService
    ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.seasonSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.seasonInfo.id : null, {validators: []}),
      createdAt: new FormControl(this.pageMode == 'edit' ? this.seasonInfo.createdAt : null, {validators: []}),
      createdBy: new FormControl(this.pageMode == 'edit' ? this.seasonInfo.createdBy : null, {validators: []}),
      updatedAt: new FormControl(this.pageMode == 'edit' ? this.seasonInfo.updatedAt : null, {validators: []}),
      updatedBy: new FormControl(this.pageMode == 'edit' ? this.seasonInfo.updatedBy : null, {validators: []}),
      seasonName: new FormControl(this.pageMode == 'edit' ? this.seasonInfo.seasonName : seasonYearList[0] + ' SEZONU', {validators: [Validators.required, Validators.maxLength(200)]}),
      seasonYear: new FormControl(this.pageMode == 'edit' ? this.seasonInfo.seasonYear : seasonYearList[0], {validators: [Validators.required, Validators.maxLength(200)]}),
      isActive: new FormControl(this.pageMode == 'edit' ? !!this.seasonInfo.isActive : true, {validators: [Validators.required]}),
    });
    this.isLoading = false;
  }

  onSubmitForm() {
    if (this.seasonSubmitForm.valid) {
      this.isLoading = true;
      if (this.pageMode === 'create') {
        this.seasonsService.createSeason(this.seasonSubmitForm.value);
      } else {
        this.seasonsService.updateSeason(this.seasonSubmitForm.value);
      }
      this.isLoading = false;
      this.dialogRef.close();
    } else {

    }
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
            this.dialogRef.close();
          }
        }
      });
  }
}
