import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";

import { DisciplinaryBoardDecisionModel } from "../../models/admin-disciplinaryboarddecisions.model";
import { DisciplinaryBoardDecisionsService } from "../../services/admin-disciplinaryboarddecisions.service";

import { DisciplinaryBoardFileModel } from "../../models/admin-disciplinaryboardfiles.model";
import { LeaguesModel } from "../../models/admin-leagues.model";
import { TeamsModel } from "../../models/admin-teams.model";

import { disciplinaryBelongingToList } from "../../../assets/lists/disciplinary-belongingto.list";
import { disciplinaryPenalTypeList } from "../../../assets/lists/disciplinary-penaltype.list";

import { globalFunctions } from "../../../functions/global.function";

import * as XLSX from 'xlsx';

@Component({
    selector: 'app-admin-disciplinary-board-decisions-create',
    templateUrl: './disciplinary-board-decisions-create.component.html',
    styleUrls: ['../../../app.component.css', './disciplinary-board-decisions-create.component.css']
})

export class AdminDisciplinaryBoardDecisionsCreateModal implements OnInit {
    isLoading: boolean = false;
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
        private globalFunctions: globalFunctions,
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
          explanation: new FormControl(this.pageMode == 'edit' ? this.disciplinaryBoardDecisionInfo.explanation : null, {validators: [Validators.maxLength(2000)]})
      });

      this.isLoading = false;
    }

    findDisciplinaryBoardFileId(disciplinaryBoardFileName: string): number {
      return this.disciplinaryBoardFilesList.find(f => f.caseNo == disciplinaryBoardFileName).id || null;
    }

    findLeagueId(leagueName: string): number {
      return this.leaguesList.find(l => l.leagueName == leagueName).id || null;
    }

    findTeamId(teamName: string): number {
      return this.teamsList.find(t => t.officialName == teamName).id || null;
    }

    findPenalTypeName(penalTypeValue: string): string {
      return penalTypeValue ? this.disciplinaryPenalTypeList.find(p => p.value == penalTypeValue).name : null;
    }

    findBelongingToName(belongingToValue: string): string {
      return belongingToValue ? this.disciplinaryBelongingToList.find(b => b.value == belongingToValue).name : null;
    }

    onSubmitForm() {
        if (this.disciplinaryBoardDecisionsSubmitForm.valid) {
            this.isLoading = true;
            if (this.pageMode === 'create') {
                this.disciplinaryBoardDecisionsSubmitForm.get('createdAt').setValue(this.globalFunctions.getTimeStamp());
                this.disciplinaryBoardDecisionsService.createDisciplinaryBoardDecision(this.disciplinaryBoardDecisionsSubmitForm.value);
            } else {
                this.disciplinaryBoardDecisionsSubmitForm.get('updatedAt').setValue(this.globalFunctions.getTimeStamp());
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
