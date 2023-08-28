import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";
import { Subscription } from "rxjs";
import { DatePipe } from "@angular/common";

import { DisciplinaryBoardFileModel } from "../../models/admin-disciplinaryboardfiles.model";
import { DisciplinaryBoardFilesService } from "../../services/admin-disciplinaryboardfiles.service";

import { SeasonsService } from "../../services/admin-seasons.service";
import { SeasonsModel } from "../../models/admin-seasons.model";

import { StaffITFFModel } from "../../models/admin-staffizmirtff.model";
import { StaffITFFService } from "../../services/admin-staffitff.service";

import { disciplinaryCommitteesList } from "../../../assets/lists/disciplinary-committees.list";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
    selector: 'app-admin-disciplinary-board-files-create',
    templateUrl: './disciplinary-board-files-create.component.html',
    styleUrls: ['../../../app.component.css', './disciplinary-board-files-create.component.css']
})
export class AdminDisciplinaryBoardCreateModal implements OnInit {
    isLoading: boolean = false;
    disciplinaryCommitteesList = disciplinaryCommitteesList;
    pageMode: string = this.data.pageMode || 'create';
    disciplinaryBoardFileInfo = this.data.disciplinaryBoardFileInfo;
    seasonList: SeasonsModel[] = this.data.seasonList || [];
    caseType: string = this.data.caseType;
    title: string = disciplinaryCommitteesList.find(c => c.name == this.caseType).caseTitle;
    staffizmirtffList: StaffITFFModel[] = [];
    private staffizmirtffListSub: Subscription;
    disciplinaryBoardFilesSubmitForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: Data,
        private dialogRef: MatDialogRef<AdminDisciplinaryBoardCreateModal>,
        private dialog: MatDialog,
        private disciplinaryBoardFilesService : DisciplinaryBoardFilesService,
        private staffService: StaffITFFService,
        private _datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.disciplinaryBoardFilesSubmitForm = new FormGroup({
            id: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardFileInfo.id : null, {validators: []}),
            createdAt: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardFileInfo.createdAt : null, {validators: []}),
            createdBy: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardFileInfo.createdBy : null, {validators: []}),
            updatedAt: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardFileInfo.updatedAt : null, {validators: []}),
            updatedBy: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardFileInfo.updatedBy : null, {validators: []}),
            seasonId: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardFileInfo.seasonId : this.data.seasonSelectionId, {validators: [Validators.required]}),
            caseNo: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardFileInfo.caseNo : null, {validators: [Validators.required, Validators.maxLength(200)]}),
            caseDate: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardFileInfo.caseDate : null, {validators: [Validators.required]}),
            caseType: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardFileInfo.caseType : this.caseType, {validators: [Validators.required]}),
            title: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardFileInfo.title : this.title, {validators: [Validators.required, Validators.maxLength(200)]}),
            participants: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardFileInfo.participants : null, {validators: [Validators.required, Validators.maxLength(200)]}),
            explanation: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardFileInfo.explanation : null, {validators: [Validators.maxLength(2000)]})
        });
        this.isLoading = false;
    }

    onSubmitForm() {
        let currentDate = this._datePipe.transform((new Date), 'yyyy-MM-ddTHH:mm');

        if (this.disciplinaryBoardFilesSubmitForm.valid) {
            this.isLoading = true;
            if (this.pageMode === 'create') {
                this.disciplinaryBoardFilesSubmitForm.get('createdAt').setValue(currentDate);
                this.disciplinaryBoardFilesService.createDisciplinaryBoardFile(this.disciplinaryBoardFilesSubmitForm.value);
            } else {
                this.disciplinaryBoardFilesSubmitForm.get('updatedAt').setValue(currentDate);
                this.disciplinaryBoardFilesService.updateDisciplinaryBoardFile(this.disciplinaryBoardFilesSubmitForm.value);
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
              this.disciplinaryBoardFilesService.deleteDisciplinaryBoardFile(id);
              this.dialogRef.close();
            }
          }
        });
    }
}
