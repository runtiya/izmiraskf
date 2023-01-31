import { Component, Inject, Input, OnChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";


import { LeaguesService } from "../../services/admin/admin-leagues.service";
import { leagueCategoryList } from "../../assets/lists/league-category-list";
import { leagueTypeList } from "../../assets/lists/league-type-list";

@Component({
  selector: 'app-admin-leagues-create',
  templateUrl: './leagues-create.component.html',
  styleUrls: ['../../../app.component.css', './leagues-create.component.css']
})
export class AdminLeaguesCreateModal {
  isLoading = false;
  pageMode: string = this.data.pageMode || 'create';
  leagueInfo = this.data.leagueInfo;
  seasonList = this.data.seasonList;
  leagueSubmitForm: FormGroup;
  leagueCategoryList = leagueCategoryList;
  leagueTypeList = leagueTypeList;


  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, public dialogRef: MatDialogRef<AdminLeaguesCreateModal>, public leaguesService: LeaguesService) {}

  ngOnInit() {
    this.isLoading = true;
    this.leagueSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.leagueInfo.id : null, {validators: []}),
      seasonId: new FormControl(this.pageMode == 'edit' ? this.leagueInfo.seasonId : this.seasonList[0]["id"], {validators: [Validators.required]}),
      leagueName: new FormControl(this.pageMode == 'edit' ? this.leagueInfo.leagueName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      category: new FormControl(this.pageMode == 'edit' ? this.leagueInfo.category : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      leagueType: new FormControl(this.pageMode == 'edit' ? this.leagueInfo.leagueType : leagueTypeList[0]["name"], {validators: [Validators.required, Validators.maxLength(200)]}),
      isActive: new FormControl(this.pageMode == 'edit' ? !!this.leagueInfo.isActive : true, {validators: [Validators.required]}),
      orderNo: new FormControl(this.pageMode == 'edit' ? this.leagueInfo.orderNo : 1, {validators: [Validators.required, Validators.min(1), Validators.max(999)]})
    });
    this.isLoading = false;
  }

  onSubmitForm() {
    console.log(this.leagueSubmitForm.value)

    if (this.leagueSubmitForm.valid) {
      this.isLoading = true;
      if (this.pageMode === 'create') {
        this.leaguesService.createLeague(this.leagueSubmitForm.value);
      } else {
        this.leaguesService.updateLeague(this.leagueSubmitForm.value);
      }
      this.isLoading = false;
      this.dialogRef.close();
    } else {
      console.log(this.leagueSubmitForm.value);
    }

  }

  onDelete(id: number) {
    this.isLoading = true;
    this.leaguesService.deleteLeague(id);
    this.isLoading = false;

    this.dialogRef.close();
  }
}
