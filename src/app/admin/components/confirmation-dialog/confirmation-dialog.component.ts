import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";

import { globalFunctions } from "../../../functions/global.function";

@Component({
    selector: 'app-admin-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['../../../app.component.css', './confirmation-dialog.component.css']
})

export class AdminConfirmationDialogModal {
  isLoading: boolean = false;
  confirmationTitle: string = this.data.title;
  confirmationMessage: string = this.data.message;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<AdminConfirmationDialogModal>,
    private globalFunctions: globalFunctions
  ) {}


}
