import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import * as XLSX from 'xlsx';

import { globalFunctions } from "../../functions/global.function";

import { FixtureModel } from "../models/admin-fixture.model";
import { GlobalFixtureExportModel } from '../../models/global-fixture-export.model';
import { GlobalScoreBoardExportModel } from 'src/app/models/global-scoreboard-export.model';
import { GlobalWeeklyMatchListExportModel } from 'src/app/models/global-weeklymatchlist-export.model';

@Injectable({
    providedIn: 'root'
})
export class fileImportExportFunctions {

    constructor(
      private globalFunctions: globalFunctions
    ) {

    }

    exportExcelFixture(groupByFixture: any[]) {
      // groupByFixture is a fixtureList that grouped by week
      var fileData: GlobalFixtureExportModel[] = this.setFileDataForFixtureExport(groupByFixture);

      const fileNameSuffix: string = `${groupByFixture[0].matchList[0].seasonName} ${groupByFixture[0].matchList[0].leagueName} ${groupByFixture[0].matchList[0].groupstageName}`;
      const fileName = `fixture-export-${fileNameSuffix.replaceAll('.', '').replaceAll(' ', '-').toLowerCase()}`;
      const woorkSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(fileData);
      const workBook: XLSX.WorkBook = {Sheets: { 'Fikstür': woorkSheet}, SheetNames: ['Fikstür']};
      const excelBuffer: any = XLSX.write(workBook, { bookType: 'xlsx', type: 'array'});
      const file: Blob = new Blob( [excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

      this.globalFunctions.downloadFile(file, fileName);
    }

    setFileDataForFixtureExport(groupByFixture: any[]): GlobalFixtureExportModel[] {
      var fileData: GlobalFixtureExportModel[] = [];
      for (let w = 0; w < groupByFixture.length; w++) {
        const week = groupByFixture[w];

        for (let m = 0; m < week.matchList.length; m++) {
          const match = week.matchList[m];

          let globalFixtureExport = <GlobalFixtureExportModel>{};
          globalFixtureExport.Lig = match["leagueName"];
          globalFixtureExport.Hafta = `${w + 1}. HAFTA`;
          globalFixtureExport.Ev_Sahibi_Takım = match["homeTeamOfficialName"] || 'BAY';
          globalFixtureExport.Misafir_Takım = match["awayTeamOfficialName"] || 'BAY';
          globalFixtureExport.Tarih_Saat = this.globalFunctions.registerLocalDateTime(match["matchDate"]) || 'Belirtilmemiş';
          globalFixtureExport.Saha = match["stadiumName"] || 'Belirtilmemiş';

          fileData.push(globalFixtureExport);
        }
      }
      return fileData;
    }

    exportExcelScoreBoard(fixtureList: FixtureModel[]) {
      var fileData: GlobalScoreBoardExportModel[] = this.setFileDataForScoreBoardExport(fixtureList);

      const fileName = `skortablosu-export-${this.globalFunctions.registerLocalDate(new Date()).replaceAll('.', '').replaceAll(' ', '-')}`;
      const woorkSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(fileData);
      const workBook: XLSX.WorkBook = {Sheets: { 'Fikstür': woorkSheet}, SheetNames: ['Fikstür']};
      const excelBuffer: any = XLSX.write(workBook, { bookType: 'xlsx', type: 'array'});
      const file: Blob = new Blob( [excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

      this.globalFunctions.downloadFile(file, fileName);
    }

    setFileDataForScoreBoardExport(fixtureList: FixtureModel[]): GlobalScoreBoardExportModel[] {
      var fileData: GlobalScoreBoardExportModel[] = [];
      for (let f = 0; f < fixtureList.length; f++) {
        const match = fixtureList[f];

        let globalScoreBoardExport = <GlobalScoreBoardExportModel>{};
        globalScoreBoardExport.Maç_No = match["matchNo"];
        globalScoreBoardExport.Tarih_Saat = this.globalFunctions.registerLocalDateTime(match["matchDate"]);
        globalScoreBoardExport.Saha = match["stadiumName"];
        globalScoreBoardExport.Ev_Sahibi_Takım = match["homeTeamOfficialName"];
        globalScoreBoardExport.Ev_Sahibi_Takım_Skor = match["homeTeamScore"];
        globalScoreBoardExport.Ev_Sahibi_Takım_Puan = match["homeTeamPoint"];
        globalScoreBoardExport.Misafir_Takım = match["awayTeamOfficialName"];
        globalScoreBoardExport.Misafir_Takım_Skor = match["awayTeamScore"];
        globalScoreBoardExport.Misafir_Takım_Puan = match["awayTeamPoint"];
        globalScoreBoardExport.Müsabaka_Durumu = this.globalFunctions.getMatchStatusValue(match["matchStatus"]);
        globalScoreBoardExport.Hükmen_Galip = match["isHomeTeamWinByForfeit"] ? 'Ev Sahibi Takım' : (match["isAwayTeamWinByForfeit"] ? 'Misafir Takım' : null);
        globalScoreBoardExport.Açıklama = match["explanation"];

        fileData.push(globalScoreBoardExport);
      }
      return fileData;
    }

    exportExcelWeeklyMatchList(fixtureList: FixtureModel[], weeklyMatchProgramId: number) {
      var fileData: GlobalWeeklyMatchListExportModel[] = this.setFileDataForWeeklyMatchListExport(fixtureList);

      const fileName = `haftalikbulten-export-${weeklyMatchProgramId}`;
      const woorkSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(fileData);
      const workBook: XLSX.WorkBook = {Sheets: { 'Bülten': woorkSheet}, SheetNames: ['Bülten']};
      const excelBuffer: any = XLSX.write(workBook, { bookType: 'xlsx', type: 'array'});
      const file: Blob = new Blob( [excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

      this.globalFunctions.downloadFile(file, fileName);
    }

    setFileDataForWeeklyMatchListExport(fixtureList: FixtureModel[]): GlobalWeeklyMatchListExportModel[] {
      var fileData: GlobalWeeklyMatchListExportModel[] = [];
      for (let f = 0; f < fixtureList.length; f++) {
        const match = fixtureList[f];

        let globalWeeklyMatchProgramExport = <GlobalWeeklyMatchListExportModel>{};
        globalWeeklyMatchProgramExport.Maç_No = match["matchNo"];
        globalWeeklyMatchProgramExport.Lig = match["leagueName"];
        globalWeeklyMatchProgramExport.Tarih_Saat = this.globalFunctions.registerLocalDateTime(match["matchDate"]);
        globalWeeklyMatchProgramExport.Saha = match["stadiumName"];
        globalWeeklyMatchProgramExport.Ev_Sahibi_Takım = match["homeTeamOfficialName"] || 'BAY';
        globalWeeklyMatchProgramExport.Misafir_Takım = match["awayTeamOfficialName"] || 'BAY';
        globalWeeklyMatchProgramExport.Açıklama = match["explanation"];

        fileData.push(globalWeeklyMatchProgramExport);
      }
      return fileData;
    }

}

