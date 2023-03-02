import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Data } from "@angular/router";
import { MatDatepicker, MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatSnackBar } from '@angular/material/snack-bar';

import { FixtureModel } from "../../models/admin-fixture.model";
import { StadiumsModel } from "../../models/admin-stadiums.model";
import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";

import { FixtureService } from "../../services/admin/admin-fixtures.service";

import { matchStatusList } from "../../assets/lists/match-status-list";
import { DatePipe } from "@angular/common";


@Component({
  selector: 'app-admin-fixture-edit',
  templateUrl: './fixture-edit.component.html',
  styleUrls: ['../../../app.component.css', './fixture-edit.component.css']
})
export class FixtureEditModal implements OnInit {
  isLoading = false;
  pageMode: string = this.data.pageMode || 'create';
  fixtureInfo: FixtureModel = this.data.fixtureInfo;
  stadiumList: StadiumsModel[] = this.data.stadiumList;
  teamsingroupstagesList: TeamsInGroupstagesModel[] = this.data.teamsingroupstagesList;
  fixtureSubmitForm: FormGroup;

  seasonSelectionId: number = this.data.seasonSelectionId;
  leagueSelectionId: number = this.data.leagueSelectionId;
  groupstageSelectionId: number = this.data.groupstageSelectionId;
  preMatchWeek: number = this.data.fixtureInfo.matchWeek || null;
  preOrderNo: number = this.data.fixtureInfo.orderNo || null;

  matchStatusList: Array<any> = matchStatusList;

  @Input() inp_winnerByForfeit: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<FixtureEditModal>,
    public fixturesService: FixtureService,
    private _snackBar: MatSnackBar,
    private _datePipe: DatePipe

  ) {
    // no need if datetime-local used; this._adapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.fixtureSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.id : null, {validators: []}),
      groupstageId: new FormControl(this.fixtureInfo.groupstageId, {validators: [Validators.required]}),
      matchNo: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.matchNo : null, {validators: [Validators.maxLength(200)]}),
      matchWeek: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.matchWeek : 1, {validators: [Validators.required, Validators.min(1), Validators.max(999)]}),
      matchDate: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.matchDate : null, {validators: []}),
      matchStatus: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.matchStatus : 'NOTPLAYED', {validators: [Validators.required, Validators.maxLength(200)]}),
      stadiumId: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.stadiumId : null, {validators: []}),
      homeTeamId: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.homeTeamId : null, {validators: []}),
      homeTeamScore: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.homeTeamScore : null, {validators: [Validators.min(0), Validators.max(999)]}),
      isHomeTeamWinByForfeit: new FormControl(this.pageMode == 'edit' ? !!this.fixtureInfo.isHomeTeamWinByForfeit : false, {validators: [Validators.required]}),
      homeTeamPoint: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.homeTeamPoint : null, {validators: [Validators.min(0), Validators.max(999)]}),
      awayTeamId: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.awayTeamId : null, {validators: []}),
      awayTeamScore: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.awayTeamScore : null, {validators: [Validators.min(0), Validators.max(999)]}),
      isAwayTeamWinByForfeit: new FormControl(this.pageMode == 'edit' ? !!this.fixtureInfo.isAwayTeamWinByForfeit : false, {validators: [Validators.required]}),
      awayTeamPoint: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.awayTeamPoint : null, {validators: [Validators.min(0), Validators.max(999)]}),
      explanation: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.explanation : null, {validators: [Validators.maxLength(200)]}),
      orderNo: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.orderNo : 1, {validators: [Validators.required, Validators.min(1), Validators.max(999)]})
    });
    this.isLoading = false;
    
    // Set winnerByForfeit select-list
    this.inp_winnerByForfeit = this.fixtureSubmitForm.get('isHomeTeamWinByForfeit').value ? 'homeTeamWinByForfeit' : (this.fixtureSubmitForm.get('isAwayTeamWinByForfeit').value ? 'awayTeamWinByForfeit' : null);
    
  }

  onHomeTeamChange(teamId: number) {
    let team = this.teamsingroupstagesList.find(team => team.teamId == teamId);
    this.fixtureSubmitForm.get('stadiumId').setValue(team.teamStadiumId);
  }

  onSubmitForm() {
    let seasonId = this.seasonSelectionId;
    let leagueId = this.leagueSelectionId;
    let groupstageId = this.groupstageSelectionId;
    let matchWeek = this.fixtureSubmitForm.get('matchWeek').value;
    let orderNo = this.fixtureSubmitForm.get('orderNo').value;

    let submitCheck: boolean;

    if (this.fixtureSubmitForm.valid) {
      if (this.pageMode == 'create') {
        let matchNo = ('35' + seasonId.toString().padStart(2, "0") + leagueId.toString().padStart(2, "0") + groupstageId.toString().padStart(2, "0") + '-' + matchWeek.toString().padStart(2, "0") + orderNo.toString().padStart(2, "0"));
        submitCheck = this.fixturesService.createMatch(this.fixtureSubmitForm.value, matchNo);
      } else {
        let isSameMatch = (matchWeek == this.preMatchWeek && orderNo == this.preOrderNo);
        submitCheck = this.fixturesService.editMatch(this.fixtureSubmitForm.value, isSameMatch);
      }

      if (submitCheck) {
        this.dialogRef.close();
      } else {
        // Show snackbar
        this._snackBar.open('Hafta ve Sıra Numarasına sahip başka bir maç bulundu!', 'Tamam', {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 3000
        });
      }
      
    } else {
      null;
    }
    
  }

  matchStatusClassFind(status: string): string {
    return matchStatusList.find(s => s.name == status).class;
  }

  onScoresChange() {
    let homeTeamScore = this.fixtureSubmitForm.get('homeTeamScore').value;
    let awayTeamScore = this.fixtureSubmitForm.get('awayTeamScore').value;

    if (homeTeamScore !== null && awayTeamScore !== null) {
      this.setTeamPoints(homeTeamScore, awayTeamScore);
    }
  }

  onWinByForfeitChange(winnerByForfeit) {
    
    let val = winnerByForfeit;
    let homeTeamScore = this.fixtureSubmitForm.get('homeTeamScore').value;
    let awayTeamScore = this.fixtureSubmitForm.get('awayTeamScore').value;

    console.log(val)
    if (val == 'homeTeamWinByForfeit') {
      this.fixtureSubmitForm.get('isHomeTeamWinByForfeit').setValue(true);
      this.fixtureSubmitForm.get('isAwayTeamWinByForfeit').setValue(false);
    } else if (val == 'awayTeamWinByForfeit') {
      this.fixtureSubmitForm.get('isHomeTeamWinByForfeit').setValue(false);
      this.fixtureSubmitForm.get('isAwayTeamWinByForfeit').setValue(true);
    } else {
      this.fixtureSubmitForm.get('isHomeTeamWinByForfeit').setValue(false);
      this.fixtureSubmitForm.get('isAwayTeamWinByForfeit').setValue(false);
    }

    if (homeTeamScore == null && awayTeamScore == null) {
        if (val == 'homeTeamWinByForfeit') {
          this.fixtureSubmitForm.get('homeTeamScore').setValue(3);
          this.fixtureSubmitForm.get('awayTeamScore').setValue(0);
        } else if (val == 'awayTeamWinByForfeit') {
          this.fixtureSubmitForm.get('homeTeamScore').setValue(0);
          this.fixtureSubmitForm.get('awayTeamScore').setValue(3);
        }

        // Set points automatically
        this.setTeamPoints(
          this.fixtureSubmitForm.get('homeTeamScore').value,
          this.fixtureSubmitForm.get('awayTeamScore').value
        );
    }

  }

  setTeamPoints(homeTeamScore: number, awayTeamScore: number) {
    if (homeTeamScore !== null || awayTeamScore !== null) {
      if (homeTeamScore > awayTeamScore) {
        this.fixtureSubmitForm.get('homeTeamPoint').setValue(3);
        this.fixtureSubmitForm.get('awayTeamPoint').setValue(0);
      } else if (awayTeamScore > homeTeamScore) {
        this.fixtureSubmitForm.get('awayTeamPoint').setValue(3);
        this.fixtureSubmitForm.get('homeTeamPoint').setValue(0);
      } else if ( homeTeamScore == awayTeamScore) {
        this.fixtureSubmitForm.get('homeTeamPoint').setValue(1);
        this.fixtureSubmitForm.get('awayTeamPoint').setValue(1);
      }
    }
    
  }

  onDelete(matchNo: string) {
    this.isLoading = true;
    this.fixturesService.deleteMatch(matchNo);
    this.isLoading = false;
    this.dialogRef.close();
  }

}
