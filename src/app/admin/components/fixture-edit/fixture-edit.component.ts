import { Component, Inject, Input, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";

import { FixtureModel } from "../../models/admin-fixture.model";
import { StadiumsModel } from "../../models/admin-stadiums.model";
import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";

import { FixtureService } from "../../services/admin/admin-fixtures.service";


@Component({
  selector: 'app-admin-fixture-edit',
  templateUrl: './fixture-edit.component.html',
  styleUrls: ['../../../app.component.css', './fixture-edit.component.css']
})
export class AdminFixtureEditModal implements OnInit, OnDestroy {
  isLoading = false;
  pageMode: string = this.data.pageMode || 'create';
  fixtureInfo: FixtureModel = this.data.fixtureInfo;
  stadiumList: StadiumsModel[] = this.data.stadiumList;
  teamsingroupstagesList: TeamsInGroupstagesModel[] = this.data.teamsingroupstagesList;
  fixtureSubmitForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<AdminFixtureEditModal>,
    public fixturesService: FixtureService
  ) {}

  ngOnInit(): void {
    this.fixtureSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.id : null, {validators: []}),
      groupstageId: new FormControl(this.fixtureInfo.groupstageId, {validators: [Validators.required]}),
      matchNo: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.matchNo : null, {validators: []}),
      matchWeek: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.matchWeek : 1, {validators: [Validators.required, Validators.min(1), Validators.max(999)]}),
      matchDate: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.matchDate : null, {validators: []}),
      stadiumId: new FormControl

    })
  }

  ngOnDestroy(): void {

  }
}
