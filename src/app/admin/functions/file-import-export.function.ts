import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import * as XLSX from 'xlsx';

import { globalFunctions } from "../../functions/global.function";

import { FixtureModel } from "../models/admin-fixture.model";
import { GlobalFixtureExportModel } from '../../models/global-fixture-export.model';
import { GlobalScoreBoardExportModel } from 'src/app/models/global-scoreboard-export.model';
import { GlobalWeeklyMatchListExportModel } from 'src/app/models/global-weeklymatchlist-export.model';
import { TeamsModel } from '../models/admin-teams.model';
import { StadiumsModel } from '../models/admin-stadiums.model';

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
        globalFixtureExport.Tarih_Saat = this.globalFunctions.getDateTime(match["matchDate"]) || 'Belirtilmemiş';
        globalFixtureExport.Saha = match["stadiumName"] || 'Belirtilmemiş';

        fileData.push(globalFixtureExport);
      }
    }
    return fileData;
  }

  exportExcelScoreBoard(fixtureList: FixtureModel[], teamsList: TeamsModel[], stadiumsList: StadiumsModel[]) {
    let teamsNameList: Array<any> = [];
    let stadiumsNameList: Array<any> = [];

    teamsNameList = teamsList.map(row => {
      const rowData: {[key: string]: string} = {};
      teamsList.forEach((key, index) => {
        rowData["Takım Adı"] = row["officialName"];
      });
      return rowData;
    });

    stadiumsNameList = stadiumsList.map(row => {
      const rowData: {[key: string]: string} = {};
      teamsList.forEach((key, index) => {
        rowData["Saha Adı"] = row["stadiumName"];
      });
      return rowData;
    });

    var fileData: GlobalScoreBoardExportModel[] = this.setFileDataForScoreBoardExport(fixtureList);

    const fileName = `skortablosu-export-${this.globalFunctions.getDate(new Date()).replaceAll('.', '').replaceAll(' ', '-')}`;
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(fileData);
    const workSheetTeams: XLSX.WorkSheet = XLSX.utils.json_to_sheet(teamsNameList);
    const workSheetStadiums: XLSX.WorkSheet = XLSX.utils.json_to_sheet(stadiumsNameList);
    const workBook: XLSX.WorkBook = {Sheets: { 'Fikstür': workSheet, 'Takımlar': workSheetTeams, 'Sahalar': workSheetStadiums}, SheetNames: ['Fikstür', 'Takımlar', 'Sahalar']};
    const excelBuffer: any = XLSX.write(workBook, { bookType: 'xlsx', type: 'array'});
    const file: Blob = new Blob( [excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

    this.globalFunctions.downloadFile(file, fileName);
  }

  setFileDataForScoreBoardExport(fixtureList: FixtureModel[]): GlobalScoreBoardExportModel[] {
    var fileData: GlobalScoreBoardExportModel[] = [];
    for (let f = 0; f < fixtureList.length; f++) {
      const match = fixtureList[f];

      let globalScoreBoardExport = <GlobalScoreBoardExportModel>{};
      globalScoreBoardExport['Müsabaka No'] = match["matchNo"];
      globalScoreBoardExport['Tarih Saat'] = this.globalFunctions.getDateTime(match["matchDate"]);
      globalScoreBoardExport['Saha'] = match["stadiumName"];
      globalScoreBoardExport['Ev Sahibi Takım'] = match["homeTeamOfficialName"];
      globalScoreBoardExport['Ev Sahibi Takım Skor'] = match["homeTeamScore"];
      globalScoreBoardExport['Ev Sahibi Takım Puan'] = match["homeTeamPoint"];
      globalScoreBoardExport['Misafir Takım'] = match["awayTeamOfficialName"];
      globalScoreBoardExport['Misafir Takım Skor'] = match["awayTeamScore"];
      globalScoreBoardExport['Misafir Takım Puan'] = match["awayTeamPoint"];
      globalScoreBoardExport['Müsabaka Durumu'] = this.globalFunctions.getMatchStatusValue(match["matchStatus"]);
      globalScoreBoardExport['Hükmen Galip'] = match["isHomeTeamWinByForfeit"] ? 'Ev Sahibi Takım' : (match["isAwayTeamWinByForfeit"] ? 'Misafir Takım' : null);
      globalScoreBoardExport['Açıklama'] = match["explanation"];

      fileData.push(globalScoreBoardExport);
    }
    return fileData;
  }

  exportExcelWeeklyMatchList(fixtureList: FixtureModel[], weeklyMatchProgramId: number) {
    var tableData: GlobalWeeklyMatchListExportModel[] = this.setFileDataForWeeklyMatchListExport(fixtureList);

    const fileName = `haftalikbulten-export-${weeklyMatchProgramId}`;
    const woorkSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tableData);
    const workBook: XLSX.WorkBook = {Sheets: { 'Bülten': woorkSheet}, SheetNames: ['Bülten']};
    const excelBuffer: any = XLSX.write(workBook, { bookType: 'xlsx', type: 'array'});
    const file: Blob = new Blob( [excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

    this.globalFunctions.downloadFile(file, fileName);
  }

  setFileDataForWeeklyMatchListExport(fixtureList: FixtureModel[]): GlobalWeeklyMatchListExportModel[] {
    var tableData: GlobalWeeklyMatchListExportModel[] = [];
    for (let f = 0; f < fixtureList.length; f++) {
      const match = fixtureList[f];

      let globalWeeklyMatchProgramExport = <GlobalWeeklyMatchListExportModel>{};
      globalWeeklyMatchProgramExport.Maç_No = match["matchNo"];
      globalWeeklyMatchProgramExport.Lig = match["leagueName"];
      globalWeeklyMatchProgramExport.Tarih_Saat = this.globalFunctions.getDateTime(match["matchDate"]);
      globalWeeklyMatchProgramExport.Saha = match["stadiumName"];
      globalWeeklyMatchProgramExport.Ev_Sahibi_Takım = match["homeTeamOfficialName"] || 'BAY';
      globalWeeklyMatchProgramExport.Misafir_Takım = match["awayTeamOfficialName"] || 'BAY';
      globalWeeklyMatchProgramExport.Açıklama = match["explanation"];

      tableData.push(globalWeeklyMatchProgramExport);
    }
    return tableData;
  }

  importExcelScoreBoard() {

  }

  parseExcelDataToJSON(fileData: any): any {
    var _fileData: any[] = null;
    try {
      const workBook: XLSX.WorkBook = XLSX.read(fileData, { type: 'binary' });
      const sheetName: string = workBook.SheetNames[0];
      const workSheet: XLSX.WorkSheet = workBook.Sheets[sheetName];
      const fileDataJSON: any  = XLSX.utils.sheet_to_json(workSheet, { header: 1, raw: true, defval: null}).filter(r => r[0] != null);
      const header = fileDataJSON[0];
      const rows = fileDataJSON.slice(1);
      const result = rows.map(row => {
        const rowData = {};
        header.forEach((key, index) => {
          rowData[key] = row[index];
        });
        return rowData;
      });
      _fileData = result;
    } catch (error) {
      _fileData = null;
    } finally {
      return _fileData;
    }

  }

}

