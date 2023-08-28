import { Component, Inject, Input, OnChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";

import { LeaguesService } from "../../services/admin-leagues.service";
import { leagueCategoryList } from "../../../assets/lists/league-category.list";
import { leagueTypeList } from "../../../assets/lists/league-type.list";

import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-admin-leagues-create',
  templateUrl: './leagues-create.component.html',
  styleUrls: ['../../../app.component.css', './leagues-create.component.css']
})
export class AdminLeaguesCreateModal {
  isLoading: boolean = false;
  pageMode: string = this.data.pageMode || 'create';
  leagueInfo = this.data.leagueInfo;
  //seasonList = this.data.seasonList;
  seasonName = this.data.seasonName;
  seasonSelectionId = this.data.seasonSelectionId;
  leagueSubmitForm: FormGroup;
  leagueCategoryList = leagueCategoryList;
  leagueTypeList = leagueTypeList;


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Data,
    private dialogRef: MatDialogRef<AdminLeaguesCreateModal>,
    private dialog: MatDialog,
    private leaguesService: LeaguesService
    ) {}

  ngOnInit() {
    this.isLoading = true;
    this.leagueSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.leagueInfo.id : null, {validators: []}),
      seasonId: new FormControl(this.pageMode == 'edit' ? this.leagueInfo.seasonId : this.seasonSelectionId, {validators: [Validators.required]}),
      leagueName: new FormControl(this.pageMode == 'edit' ? this.leagueInfo.leagueName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      category: new FormControl(this.pageMode == 'edit' ? this.leagueInfo.category : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      leagueType: new FormControl(this.pageMode == 'edit' ? this.leagueInfo.leagueType : leagueTypeList[0]["name"], {validators: [Validators.required, Validators.maxLength(200)]}),
      isActive: new FormControl(this.pageMode == 'edit' ? !!this.leagueInfo.isActive : true, {validators: [Validators.required]}),
      orderNo: new FormControl(this.pageMode == 'edit' ? this.leagueInfo.orderNo : 1, {validators: [Validators.required, Validators.min(1), Validators.max(999)]})
    });
    this.isLoading = false;
  }

  onCategoryChange() {
    let category = this.leagueSubmitForm.get('category').value;

    let categoryName = leagueCategoryList.find(e => e.name == category).value;
    this.leagueSubmitForm.get('leagueName').setValue(categoryName);

    let orderNo = leagueCategoryList.findIndex(e => e.name == category);
    this.leagueSubmitForm.get('orderNo').setValue(orderNo + 1);
  }

  onSubmitForm() {

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
            this.leaguesService.deleteLeague(id);
            this.dialogRef.close();
          }
        }
      });
  }
}
