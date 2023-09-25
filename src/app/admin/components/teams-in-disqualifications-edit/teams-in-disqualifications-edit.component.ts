import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";

import { TeamsInGroupstagesService } from "../../services/admin-teams-in-groupstages.service";

@Component({
  selector: 'app-admin-teams-in-disqualifications-edit',
  templateUrl: './teams-in-disqualifications-edit.component.html',
  styleUrls: ['../../../app.component.css', './teams-in-disqualifications-edit.component.css']
})
export class AdminTeamsInDisqualificationsEditModal implements OnInit {
  isLoading: boolean = false;
  teamInfo = this.data.teamInfo;
  teamSubmitForm: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<AdminTeamsInDisqualificationsEditModal>,
    public teamsingroupstagesService: TeamsInGroupstagesService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.teamSubmitForm = new FormGroup({
      id: new FormControl(this.teamInfo.id, {validators: [Validators.required]}),
      createdAt: new FormControl(this.teamInfo.createdAt, {validators: []}),
      createdBy: new FormControl(this.teamInfo.createdBy, {validators: []}),
      updatedAt: new FormControl(this.teamInfo.updatedAt, {validators: []}),
      updatedBy: new FormControl(this.teamInfo.updatedBy, {validators: []}),
      groupstageId: new FormControl(this.teamInfo.groupstageId, {validators: [Validators.required]}),
      teamId: new FormControl(this.teamInfo.teamId, {validators: [Validators.required]}),
      teamOfficialName: new FormControl(this.teamInfo.teamOfficialName),
      teamShortName: new FormControl(this.teamInfo.teamShortName),
      status: new FormControl(this.teamInfo.isExpelled ? 'isExpelled' : this.teamInfo.isReceded ? 'isReceded' : null),
      isExpelled: new FormControl(this.teamInfo.isExpelled),
      isReceded: new FormControl(this.teamInfo.isReceded),
      weekofExpelledorReceded: new FormControl(this.teamInfo.weekofExpelledorReceded, {validators: [Validators.max(999)]}),
      explanation: new FormControl(this.teamInfo.explanation, {validators: [Validators.maxLength(200)]}),
      orderNo: new FormControl(this.teamInfo.orderNo, {validators: [Validators.required]})
    });
    this.isLoading = false;
  }

  onSubmitForm() {
    const status = this.teamSubmitForm.get('status').value;
    if (status === 'isExpelled') {
      this.teamSubmitForm.get('isExpelled').setValue(true);
      this.teamSubmitForm.get('isReceded').setValue(false);
    } else if (status === 'isReceded') {
      this.teamSubmitForm.get('isExpelled').setValue(false);
      this.teamSubmitForm.get('isReceded').setValue(true);
    } else {
      this.teamSubmitForm.get('isExpelled').setValue(false);
      this.teamSubmitForm.get('isReceded').setValue(false);
    }

    if (this.teamSubmitForm.valid) {
      this.isLoading = true;
      this.teamsingroupstagesService.updateTeamsInGroupstages(this.teamSubmitForm.value);
      this.isLoading = false;
      this.dialogRef.close();
    } else {
      return null;
    }
  }
}
