import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";

import { WeeklyMatchProgramService } from "../../services/admin-weeklymatchprogram.service";

@Component({
  selector: 'app-admin-weeklymatchprogram-create',
  templateUrl: './weekly-match-program-create.component.html',
  styleUrls: ['../../../app.component.css', './weekly-match-program-create.component.css']
})
export class AdminWeeklyMatchProgramCreateModal implements OnInit {
  isLoading: boolean = false;
  pageMode: string = this.data.pageMode || 'create';
  weeklyMatchProgramInfo = this.data.weeklyMatchProgramInfo;
  selectedSeasonId: number = this.data.selectedSeasonId;
  selectedSeasonName: string = this.data.selectedSeasonName;
  weeklyMatchProgramSubmitForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<AdminWeeklyMatchProgramCreateModal>,
    private weeklyMatchProgramService: WeeklyMatchProgramService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.weeklyMatchProgramSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.weeklyMatchProgramInfo.id : null, {validators: []}),
      createdAt: new FormControl(this.pageMode == 'edit' ? this.weeklyMatchProgramInfo.createdAt : null, {validators: []}),
      createdBy: new FormControl(this.pageMode == 'edit' ? this.weeklyMatchProgramInfo.createdBy : null, {validators: []}),
      updatedAt: new FormControl(this.pageMode == 'edit' ? this.weeklyMatchProgramInfo.updatedAt : null, {validators: []}),
      updatedBy: new FormControl(this.pageMode == 'edit' ? this.weeklyMatchProgramInfo.updatedBy : null, {validators: []}),
      seasonId: new FormControl(this.pageMode == 'edit' ? this.weeklyMatchProgramInfo.seasonId : this.selectedSeasonId, {validators: [Validators.required]}),
      beginDate: new FormControl(this.pageMode == 'edit' ? this.weeklyMatchProgramInfo.beginDate : null, {validators: [Validators.required]}),
      endDate: new FormControl(this.pageMode == 'edit' ? this.weeklyMatchProgramInfo.endDate : null, {validators: [Validators.required]}),
      isActive: new FormControl(this.pageMode == 'edit' ? !!this.weeklyMatchProgramInfo.isActive : true, {validators: [Validators.required]}),
    });
    this.isLoading = false;
  }

  onDelete(seasonId: number, weeklyMatchProgramId: number) {
    this.weeklyMatchProgramService.deleteWeeklyMatchProgram(seasonId, weeklyMatchProgramId);

    this.dialogRef.close();
  }

  onSubmitForm() {
    if (this.weeklyMatchProgramSubmitForm.valid) {
      if (this.pageMode === "create") {
        this.weeklyMatchProgramService.createWeeklyMatchProgram(this.weeklyMatchProgramSubmitForm.value);
      } else {
        this.weeklyMatchProgramService.updateWeeklyMatchProgram(this.weeklyMatchProgramSubmitForm.value);
      }

      this.dialogRef.close();
    } else {

    }
  }
}
