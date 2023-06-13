import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";
import { Subscription } from "rxjs";
import { DatePipe } from "@angular/common";

import { DisciplinaryBoardFileModel } from "../../models/application-disciplinaryboardfiles.model";
import { DisciplinaryBoardDecisionModel } from "../../models/application-disciplinaryboarddecisions.model";

import { globalFunctions } from "../../../functions/global.function";

import { disciplinaryBelongingToList } from "../../../assets/lists/disciplinary-belongingto-list";
import { disciplinaryPenalTypeList } from "../../../assets/lists/disciplinary-penaltype-list";

@Component({
    selector: 'app-application-disciplinary-board-decisions-details',
    templateUrl: './disciplinary-board-decisions-details.component.html',
    styleUrls: ['../../../app.component.css', './disciplinary-board-decisions-details.component.css']
})
export class ApplicationDisciplinaryBoardDecisionsDetailsModal implements OnInit {
  isLoading = false;
  disciplinaryBoardFileInfo = this.data.disciplinaryBoardFileInfo;
  disciplinaryBoardFile: DisciplinaryBoardFileModel = <DisciplinaryBoardFileModel>{};

  disciplinaryBoardDecisionInfo = this.data.disciplinaryBoardDecisionInfo;
  disciplinaryBoardDecision: DisciplinaryBoardDecisionModel = <DisciplinaryBoardDecisionModel>{};

  disciplinaryPenalTypeList = disciplinaryPenalTypeList;
  disciplinaryBelongingToList = disciplinaryBelongingToList;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<ApplicationDisciplinaryBoardDecisionsDetailsModal>,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.disciplinaryBoardFile = this.disciplinaryBoardFileInfo;
    this.disciplinaryBoardDecision = this.disciplinaryBoardDecisionInfo;
  }

  findPenalType(penalType: string): string {
    return penalType ? this.disciplinaryPenalTypeList.find(p => p.name == penalType).value : null;
  }

  findBelongingTo(belongingTo: string): string {
    return belongingTo ? this.disciplinaryBelongingToList.find(b => b.name == belongingTo).value : null;
  }

}
