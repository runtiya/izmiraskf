import { Component, Inject, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";


import { SeasonsService } from "../../services/admin/admin-seasons.service";
import { seasonYearList } from "../../assets/lists/season-year-list";

@Component({
  selector: 'app-admin-seasons-create',
  templateUrl: './seasons-create.component.html',
  styleUrls: ['../../../app.component.css', './seasons-create.component.css']
})
export class AdminSeasonsCreateModal {
  isLoading = false;
  pageMode: string = this.data.pageMode || 'create';
  seasonInfo = this.data.seasonInfo;
  seasonSubmitForm: FormGroup;
  seasonYearList = seasonYearList;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, public dialogRef: MatDialogRef<AdminSeasonsCreateModal>, public seasonsService: SeasonsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.seasonSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.seasonInfo.id : null, {validators: []}),
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
      console.log(this.seasonSubmitForm.value);
    }
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.seasonsService.deleteSeason(id);
    this.isLoading  = false;

    this.dialogRef.close();
  }
}
