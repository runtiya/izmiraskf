import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";


import { globalFunctions } from "../../../functions/global.function";


@Component({
    selector: 'app-admin-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['../../../app.component.css', './confirmation-dialog.component.css']
})

export class AdminConfirmationDialogModal implements OnInit {
    isLoading = false;
    confirmationTitle: string = this.data.title;
    confirmationMessage: string = this.data.message;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Data,
        public dialogRef: MatDialogRef<AdminConfirmationDialogModal>,
        private globalFunctions: globalFunctions,
    ) {}

    ngOnInit(): void {

    }

}
