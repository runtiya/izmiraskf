import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";


import { FixtureModel } from "../../models/admin-fixture.model";
import { StadiumsModel } from "../../models/admin-stadiums.model";
import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";

import { FixtureService } from "../../services/admin-fixtures.service";

import { fixtureFunctions } from "../../functions/fixture.function";
import { globalFunctions } from "../../../functions/global.function";

import { matchStatusList } from "../../../assets/lists/match-status.list";
import { MatchModel } from "../../models/admin-match.model";
import { FixtureSearchModel } from "../../models/admin-fixture-search-index.model";


@Component({
  selector: 'app-admin-fixture-edit',
  templateUrl: './fixture-edit.component.html',
  styleUrls: ['../../../app.component.css', './fixture-edit.component.css']
})
export class AdminFixtureEditModal implements OnInit {
  isLoading: boolean = false;
  pageMode: string = this.data.pageMode || 'create';
  fixtureInfo: FixtureModel = this.data.fixtureInfo;
  stadiumList: StadiumsModel[] = this.data.stadiumList;
  teamsingroupstagesList: TeamsInGroupstagesModel[] = this.data.teamsingroupstagesList;
  fixtureSearchIndex: FixtureSearchModel = this.data.fixtureSearchIndex;
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
    public dialogRef: MatDialogRef<AdminFixtureEditModal>,
    public fixturesService: FixtureService,
    private globalFunctions: globalFunctions,
    private fixtureFunctions: fixtureFunctions
  ) {

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.fixtureSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.id : null, {validators: []}),
      createdAt: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.createdAt : null, {validators: []}),
      createdBy: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.createdBy : null, {validators: []}),
      updatedAt: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.updatedAt : null, {validators: []}),
      updatedBy: new FormControl(this.pageMode == 'edit' ? this.fixtureInfo.updatedBy : null, {validators: []}),
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
    try {
      let team = this.teamsingroupstagesList.find(team => team.teamId == teamId);
      this.fixtureSubmitForm.get('stadiumId').setValue(team.teamStadiumId);
    } catch (error) {
      this.fixtureSubmitForm.get('stadiumId').setValue(null);
    }


  }

  onSubmitForm() {
    this.isLoading = true;
    /*
    let fixtureSearchIndex: FixtureSearchModel = this.fixtureFunctions.setFixtureSearchModel(
      this.seasonSelectionId,
      this.leagueSelectionId,
      this.groupstageSelectionId,
      null, null, null, null, null, null, null, null, null, null
    );
    */

    let weekNumber = this.fixtureSubmitForm.get('matchWeek').value;
    let orderNo = this.fixtureSubmitForm.get('orderNo').value;

    var _matchList: MatchModel[] = [];
    let checkMatch: boolean;

    if (this.fixtureSubmitForm.valid) {
      // create
      if (this.pageMode == 'create') {
        let matchNo = this.fixtureFunctions.setMatchNo(this.seasonSelectionId, this.leagueSelectionId, this.groupstageSelectionId, weekNumber, orderNo);
        checkMatch = this.fixturesService.checkMatch(this.fixtureSubmitForm.value, matchNo, null);
        // create - checkMatch success
        if (checkMatch) {
          this.fixtureSubmitForm.get('matchNo').setValue(matchNo);
          _matchList.push(this.fixtureSubmitForm.value);
          this.fixturesService.createFixture(_matchList, this.fixtureSearchIndex);
          this.dialogRef.close();
        }
        // create - checkMatch not success
        else {
          this.globalFunctions.showSnackBar('fixture.sameweekandorderno');
        }
      }
      // update
      else {
        let isSameMatch = (weekNumber == this.preMatchWeek && orderNo == this.preOrderNo);
        checkMatch = this.fixturesService.checkMatch(this.fixtureSubmitForm.value, null, isSameMatch);
        // update - checkMatch success
        if (checkMatch) {
          _matchList.push(this.fixtureSubmitForm.value);
          this.fixturesService.updateFixture(_matchList, this.fixtureSearchIndex);
          this.dialogRef.close();
        }
        // update - checkMatch not success
        else {
          this.globalFunctions.showSnackBar('Hafta ve Sıra Numarasına sahip başka bir maç bulundu!');
        }
      }
      this.isLoading = false;

    } else {
      this.globalFunctions.showSnackBar('Gerekli alanları doldurunuz!')
    }

  }

  matchStatusClassFind(status: string): string {
    return matchStatusList.find(s => s.name == status).class;
  }

  onScoresChange() {
    let homeTeamScore = this.fixtureSubmitForm.get('homeTeamScore').value;
    let awayTeamScore = this.fixtureSubmitForm.get('awayTeamScore').value;
    let matchNo = this.fixtureSubmitForm.get('matchNo').value;

    this.setTeamPoints(homeTeamScore, awayTeamScore);

    if (homeTeamScore !== null && awayTeamScore !== null && matchNo !== null) {
      this.fixtureSubmitForm.get('matchStatus').setValue('PLAYED');
    } else if (homeTeamScore == null && awayTeamScore == null && matchNo !== null) {
      this.fixtureSubmitForm.get('matchStatus').setValue('NOTPLAYED');
    }
  }

  onWinByForfeitChange(_winnerByForfeit: string) {

    let homeTeamScore = this.fixtureSubmitForm.get('homeTeamScore').value;
    let awayTeamScore = this.fixtureSubmitForm.get('awayTeamScore').value;

    if (_winnerByForfeit == 'homeTeamWinByForfeit') {
      this.fixtureSubmitForm.get('isHomeTeamWinByForfeit').setValue(true);
      this.fixtureSubmitForm.get('isAwayTeamWinByForfeit').setValue(false);
      this.fixtureSubmitForm.get('matchStatus').setValue('BYFORFEIT');
      if (homeTeamScore == null && awayTeamScore == null) {

      }
    } else if (_winnerByForfeit == 'awayTeamWinByForfeit') {
      this.fixtureSubmitForm.get('isHomeTeamWinByForfeit').setValue(false);
      this.fixtureSubmitForm.get('isAwayTeamWinByForfeit').setValue(true);
      this.fixtureSubmitForm.get('matchStatus').setValue('BYFORFEIT');
    } else {
      this.fixtureSubmitForm.get('isHomeTeamWinByForfeit').setValue(false);
      this.fixtureSubmitForm.get('isAwayTeamWinByForfeit').setValue(false);

      if (homeTeamScore !== null && awayTeamScore !== null) {
        this.fixtureSubmitForm.get('matchStatus').setValue('PLAYED');
      } else if(homeTeamScore == null && awayTeamScore == null) {
        this.fixtureSubmitForm.get('matchStatus').setValue('NOTPLAYED');
      }

    }

    if (homeTeamScore == null && awayTeamScore == null) {
      if (_winnerByForfeit == 'homeTeamWinByForfeit') {
        this.fixtureSubmitForm.get('homeTeamScore').setValue(3);
        this.fixtureSubmitForm.get('awayTeamScore').setValue(0);
      } else if (_winnerByForfeit == 'awayTeamWinByForfeit') {
        this.fixtureSubmitForm.get('homeTeamScore').setValue(0);
        this.fixtureSubmitForm.get('awayTeamScore').setValue(3);
      }
    }

    // Set points automatically
    this.setTeamPoints(
      this.fixtureSubmitForm.get('homeTeamScore').value,
      this.fixtureSubmitForm.get('awayTeamScore').value
    );

  }

  setTeamPoints(homeTeamScore: number, awayTeamScore: number) {
    if (homeTeamScore !== null && awayTeamScore !== null) {
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
    } else if (homeTeamScore == null && awayTeamScore == null) {
      this.fixtureSubmitForm.get('homeTeamPoint').setValue(null);
      this.fixtureSubmitForm.get('awayTeamPoint').setValue(null);
    }

  }

  onDelete(id: number) {
    this.isLoading = true;
    this.fixturesService.deleteMatch(id);
    this.isLoading = false;
    this.dialogRef.close();
  }

}
