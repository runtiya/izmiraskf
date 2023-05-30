import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";
import { Subscription } from "rxjs";
import { DatePipe } from "@angular/common";


import { DisciplinaryBoardDecisionModel } from "../../models/admin-disciplinaryboarddecisions.model";
import { DisciplinaryBoardDecisionsService } from "../../services/admin-disciplinaryboarddecisions.service";

import { DisciplinaryBoardFileModel } from "../../models/admin-disciplinaryboardfiles.model";
import { LeaguesModel } from "../../models/admin-leagues.model";
import { TeamsModel } from "../../models/admin-teams.model";

import { disciplinaryBelongingToList } from "../../../assets/lists/disciplinary-belongingto-list";
import { disciplinaryPenalTypeList } from "../../../assets/lists/disciplinary-penaltype-list";

@Component({
    selector: 'app-admin-disciplinary-board-decisions-create',
    templateUrl: './disciplinary-board-decisions-create.component.html',
    styleUrls: ['../../../app.component.css', './disciplinary-board-decisions-create.component.css']
})
export class AdminDisciplinaryBoardDecisionsCreateModal implements OnInit {
    isLoading = false;
    pageMode: string = this.data.pageMode || 'create';
    seasonSelectedValue = this.data.seasonSelectionValue;
    disciplinaryBoardFilesList: DisciplinaryBoardFileModel[] = this.data.disciplinaryBoardFilesList;
    leaguesList: LeaguesModel[] = this.data.leaguesList;
    teamsList: TeamsModel[] = this.data.teamsList;
    disciplinaryBoardDecisionInfo = this.data.disciplinaryBoardDecisionInfo;
    disciplinaryBoardDecisionsSubmitForm: FormGroup;
    disciplinaryBelongingToList = disciplinaryBelongingToList;
    disciplinaryPenalTypeList = disciplinaryPenalTypeList;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Data,
        public dialogRef: MatDialogRef<AdminDisciplinaryBoardDecisionsCreateModal>,
        public disciplinaryBoardDecisionsService: DisciplinaryBoardDecisionsService,
        private _datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.isLoading = true;

        this.disciplinaryBoardDecisionsSubmitForm = new FormGroup({
            id: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.id : null, {validators: []}),
            createdAt: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.createdAt : null, {validators: []}),
            createdBy: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.createdBy : null, {validators: []}),
            updatedAt: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.updatedAt : null, {validators: []}),
            updatedBy: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.updatedBy : null, {validators: []}),
            disciplinaryBoardFileId: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.disciplinaryBoardFileId : null, {validators: [Validators.required]}),
            leagueId: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.leagueId : null, {validators: [Validators.required]}),
            teamId: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.teamId : null, {validators: [Validators.required]}),
            fullName: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.fullName : null, {validators: [Validators.maxLength(200)]}),
            licenseNo: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.licenseNo : null, {validators: [Validators.maxLength(200)]}),
            belongingTo: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.belongingTo : null, {validators: [Validators.maxLength(200)]}),
            penalType: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.penalType : null, {validators: [Validators.maxLength(200)]}),
            duration: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.duration : null, {validators: [Validators.maxLength(200)]}),
            explanation: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.explanation : null, {validators: [Validators.maxLength(200)]})
        });


        this.isLoading = false;
    }

    onSubmitForm() {
        let currentDate = this._datePipe.transform((new Date), 'yyyy-MM-ddTHH:mm');

        if (this.disciplinaryBoardDecisionsSubmitForm.valid) {
            this.isLoading = true;
            if (this.pageMode === 'create') {
                this.disciplinaryBoardDecisionsSubmitForm.get('createdAt').setValue(currentDate);
                this.disciplinaryBoardDecisionsService.createDisciplinaryBoardDecision(this.disciplinaryBoardDecisionsSubmitForm.value);
            } else {
                this.disciplinaryBoardDecisionsSubmitForm.get('updatedAt').setValue(currentDate);
                this.disciplinaryBoardDecisionsService.updateDisciplinaryBoardDecision(this.disciplinaryBoardDecisionsSubmitForm.value);
            }
            this.isLoading = false;
            this.dialogRef.close();
        } else {

        }
    }

    onDelete(fileId: number) {
        this.isLoading = true;
        this.disciplinaryBoardDecisionsService.deleteDisciplinaryBoardDecision(fileId);
        this.isLoading = false;
        this.dialogRef.close();
    }
}
