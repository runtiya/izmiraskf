import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { DisciplinaryBoardDecisionModel } from "../../models/admin-disciplinaryboarddecisions.model";
import { DisciplinaryBoardDecisionsService } from "../../services/admin-disciplinaryboarddecisions.service";
import { GlobalDisciplinaryBoardDecisionExportModel } from "../../../models/global-disciplinaryboarddecisions-export.model";

import { DisciplinaryBoardFileModel } from "../../models/admin-disciplinaryboardfiles.model";
import { DisciplinaryBoardFilesService } from "../../services/admin-disciplinaryboardfiles.service";

import { SeasonsService } from "../../services/admin-seasons.service";
import { SeasonsModel } from "../../models/admin-seasons.model";

import { LeaguesModel } from "../../models/admin-leagues.model";
import { LeaguesService } from "../../services/admin-leagues.service";

import { TeamsModel } from "../../models/admin-teams.model";
import { TeamsService } from "../../services/admin-teams.service";

import { AdminDisciplinaryBoardDecisionsCreateModal } from "../disciplinary-board-decisions-create/disciplinary-board-decisions-create.component";

import { disciplinaryPenalTypeList } from "../../../assets/lists/disciplinary-penaltype.list";
import { disciplinaryBelongingToList } from "../../../assets/lists/disciplinary-belongingto.list";
import { disciplinaryCommitteesList } from "../../../assets/lists/disciplinary-committees.list";

import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";
import { globalFunctions } from "../../../functions/global.function";
import { environment } from "../../../../environments/environment";
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-admin-disciplinary-board-decisions-list',
    templateUrl: './disciplinary-board-decisions-list.component.html',
    styleUrls: ['../../../app.component.css', './disciplinary-board-decisions-list.component.css']
})
export class AdminDisciplinaryBoardDecisionsList implements OnInit, OnDestroy {
  toolbarTitle = null;
  isLoading: boolean = false;

  seasonsList: SeasonsModel[] = [];
  private seasonsListSubscription: Subscription;

  leaguesList: LeaguesModel[] = [];
  private leaguesListSubscription: Subscription;

  teamsList: TeamsModel[] = [];
  private teamsListSubscription: Subscription;

  disciplinaryBoardFilesList: DisciplinaryBoardFileModel[] = [];
  private disciplinaryBoardFilesListSubscription: Subscription;

  disciplinaryBoardDecisionsList: DisciplinaryBoardDecisionModel[] = [];
  private disciplinaryBoardDecisionsListSubscription: Subscription;

  disciplinaryPenalTypeList = disciplinaryPenalTypeList;
  disciplinaryBelongingToList = disciplinaryBelongingToList;
  disciplinaryCommitteesList = disciplinaryCommitteesList;

  disciplinaryBoardDecisionsSubmitForm: FormGroup;

  url_caseType: string = null;
  environment = environment;

  @Input() seasonSelectionId: number;
  @Input() disciplinaryBoardFileSelectionId: number;

  tableColumns: string[] = [
                              "leagueName",
                              "teamName",
                              "licenseNo",
                              "fullName",
                              "belongingTo",
                              "penalType",
                              "duration",
                              "explanation",
                              "actions"
                            ];


  constructor(
    public disciplinaryBoardDecisionsService: DisciplinaryBoardDecisionsService,
    public disciplinaryBoardFilesService: DisciplinaryBoardFilesService,
    public seasonsService: SeasonsService,
    public leaguesService: LeaguesService,
    public teamsService: TeamsService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions,
    private router: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.router.paramMap
      .subscribe(params => {
        this.url_caseType = params.get('casetype').toUpperCase();
        this.toolbarTitle = disciplinaryCommitteesList.find(c => c.name == this.url_caseType).pageDecisionTitle;
        this.globalFunctions.setToolbarTitle(this.toolbarTitle);
        this.seasonsService.getSeasons();
      });

    this.seasonsListSubscription = this.seasonsService.getSeasonsListUpdateListener()
      .subscribe({
        next: (data: SeasonsModel[]) => {
          if (data.length > 0) {
            this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
            this.seasonSelectionId = this.seasonsList[0]["id"];
            this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(this.seasonSelectionId, this.url_caseType);
            this.leaguesService.getLeagues(this.seasonSelectionId);
            this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
          } else {
            this.seasonsList = [];
            this.leaguesList = [];
            this.disciplinaryBoardFilesList = [];
            this.disciplinaryBoardDecisionsList = [];

            this.seasonSelectionId = null;
            this.disciplinaryBoardFileSelectionId = null;

            this.isLoading = false;
          }
        }
      });

    this.disciplinaryBoardFilesListSubscription = this.disciplinaryBoardFilesService.getDisciplinaryBoardFilesUpdateListener()
      .subscribe({
        next: (data: DisciplinaryBoardFileModel[]) => {
          if (data.length > 0) {
            this.disciplinaryBoardFilesList = data.sort((a, b) => b.caseDate.toString().localeCompare(a.caseDate.toString()));
            this.disciplinaryBoardFileSelectionId = this.disciplinaryBoardFilesList[0]["id"];
            this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
          } else {
            this.disciplinaryBoardFilesList = [];

            this.disciplinaryBoardFileSelectionId = null;

            this.isLoading = false;
          }
        }
      });

    this.leaguesListSubscription = this.leaguesService.getLeagueListUpdateListener()
      .subscribe({
        next: (data: LeaguesModel[]) => {
          this.leaguesList = data.sort((a, b) => a.orderNo - b.orderNo);
        }
      });

    this.teamsService.getTeams();
    this.teamsListSubscription = this.teamsService.getTeamsListUpdateListener()
      .subscribe({
        next: (data: {teamsList: TeamsModel[], teamsCount: number}) => {
          this.teamsList = data.teamsList.sort((a, b) => a.officialName.localeCompare(b.officialName));
          this.teamsList.map(t => {
            if (t.imagePath !== null) {
              t.imagePath = `${environment.serverUrl}${t.imagePath}`;
            }
          });
        }
      })

    this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisionsUpdateListener()
      .subscribe({
        next: (data: DisciplinaryBoardDecisionModel[]) => {
          if (data.length > 0) {
            const filteredDisciplinaryBoardDecisionsList = data.filter(decision => decision.disciplinaryBoardFileId === this.disciplinaryBoardFileSelectionId);
            this.disciplinaryBoardDecisionsList = filteredDisciplinaryBoardDecisionsList.sort((a, b) => a.leagueId - b.leagueId);
          } else {
            this.disciplinaryBoardDecisionsList = [];
          }
          this.isLoading = false;
        }
      });
  }

  onSeasonChange() {
    this.isLoading = true;
    this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(this.seasonSelectionId, this.url_caseType);
    this.leaguesService.getLeagues(this.seasonSelectionId);
    this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
  }

  onFileNoChange() {
    this.isLoading = true;
    this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
  }

  findDisciplinaryBoardFileId(disciplinaryBoardFileName: string): number {
    return this.disciplinaryBoardFilesList.find(f => f.caseNo == disciplinaryBoardFileName).id || null;
  }

  findDisciplinaryBoardCaseNoValue(fileId: number): string {
    return this.disciplinaryBoardFilesList.find(f => f.id == fileId).caseNo || null;
  }

  findLeagueName(leagueId: number): string {
    const league = this.leaguesList.find(l => l.id == leagueId);
    return !!league ? league.leagueName : null;
  }

  findLeagueId(leagueName: string): number {
    const league = this.leaguesList.find(l => l.leagueName == leagueName);
    return !!league ? league.id : null;
  }

  findTeamName(teamId: number): string {
    const team = this.teamsList.find(t => t.id == teamId);
    return !!team ? team.officialName : null;
  }

  findTeamId(teamName: string): number {
    const team = this.teamsList.find(t => t.officialName == teamName);
    return !!team ? team.id : null;
  }

  findPenalType(penalType: string): string {
    return penalType ? this.disciplinaryPenalTypeList.find(p => p.name == penalType).value : null;
  }

  findPenalTypeName(penalTypeValue: string): string {
    return penalTypeValue ? this.disciplinaryPenalTypeList.find(p => p.value == penalTypeValue).name : null;
  }

  findBelongingTo(belongingTo: string): string {
    return belongingTo ? this.disciplinaryBelongingToList.find(b => b.name == belongingTo).value : null;
  }

  findBelongingToName(belongingToValue: string): string {
    return belongingToValue ? this.disciplinaryBelongingToList.find(b => b.value == belongingToValue).name : null;
  }

  onCreate() {
    const dialogRef = this.dialog.open(AdminDisciplinaryBoardDecisionsCreateModal, {
        data: {
            pageMode: 'create',
            seasonSelectionValue: this.seasonsList.find(s => s.id == this.seasonSelectionId).seasonName,
            disciplinaryBoardFilesList: this.disciplinaryBoardFilesList,
            leaguesList: this.leaguesList,
            teamsList: this.teamsList
        }
    });
  }

  onEdit(disciplinaryBoardDecision: DisciplinaryBoardDecisionModel) {
    const dialogRef = this.dialog.open(AdminDisciplinaryBoardDecisionsCreateModal, {
        data: {
            pageMode: 'edit',
            seasonSelectionValue: this.seasonsList.find(s => s.id == this.seasonSelectionId).seasonName,
            disciplinaryBoardFilesList: this.disciplinaryBoardFilesList,
            leaguesList: this.leaguesList,
            teamsList: this.teamsList,
            disciplinaryBoardDecisionInfo: disciplinaryBoardDecision
        }
    });
  }

  onDelete(disciplinaryBoardDecisionId: number) {
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
            this.disciplinaryBoardDecisionsService.deleteDisciplinaryBoardDecision(disciplinaryBoardDecisionId);
          }
        }
      });

  }

  onClear() {
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
            this.disciplinaryBoardDecisionsService.clearDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
          }
        }
      });
  }


  onFilePicked(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data: string = e.target.result;
        const workBook: XLSX.WorkBook = XLSX.read(data, {type: 'binary'});
        const sheetName: string = workBook.SheetNames[0];
        const workSheet: XLSX.WorkSheet = workBook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(workSheet, {header: 1, raw: true});

        // Filter to remove null rows. Get only filled rows
        const filteredData = jsonData.filter(r => r[0] != null || r[1] != null || r[2] != null || r[3] != null);
        this.buildDisciplinaryBoardDecisionSubmitFormGroup();
        this.patchFileToTable(filteredData);
      };

      reader.readAsBinaryString(file);
    } catch (error) {

    }
  }

  buildDisciplinaryBoardDecisionSubmitFormGroup() {
    this.disciplinaryBoardDecisionsSubmitForm = new FormGroup({
      id: new FormControl(null, {validators: []}),
      createdAt: new FormControl(null, {validators: []}),
      createdBy: new FormControl(null, {validators: []}),
      updatedAt: new FormControl(null, {validators: []}),
      updatedBy: new FormControl(null, {validators: []}),
      disciplinaryBoardFileId: new FormControl(null, {validators: [Validators.required]}),
      leagueId: new FormControl(null, {validators: [Validators.required]}),
      teamId: new FormControl(null, {validators: [Validators.required]}),
      fullName: new FormControl(null, {validators: [Validators.maxLength(200)]}),
      licenseNo: new FormControl(null, {validators: [Validators.maxLength(200)]}),
      belongingTo: new FormControl(null, {validators: [Validators.maxLength(200)]}),
      penalType: new FormControl(null, {validators: [Validators.maxLength(200)]}),
      duration: new FormControl(null, {validators: [Validators.maxLength(200)]}),
      explanation: new FormControl(null, {validators: [Validators.maxLength(2000)]})
  });
  }

  patchFileToTable(fileData: any[]) {
    var disciplinaryBoardDecisionImportedFormsList: DisciplinaryBoardDecisionModel[] = [];
    // Starts loop with 1 to skip header row in file!
    for (let i = 1; i < fileData.length; i++) {
      const row = fileData[i];

      let _disciplinaryBoardFileId = row[0] ? this.findDisciplinaryBoardFileId(row[0].toString()) : null;
      let _leagueId = row[1] ? this.findLeagueId(row[1].toString()) : null;
      let _teamId = row[2] ? this.findTeamId(row[2].toString()) : null;
      let _fullName = row[3] ? row[3].toString() : null;
      let _licenseNo = row[4] ? row[4].toString() : null;
      let _belongingTo = row[5] ? this.findBelongingToName(row[5].toString()) : null;
      let _penalType = row[6] ? this.findPenalTypeName(row[6].toString()) : null;
      let _duration = row[7] ? row[7].toString() : null;
      let _explanation = row[8] ? row[8].toString() : null;

      this.disciplinaryBoardDecisionsSubmitForm.get('createdAt').setValue(null);
      this.disciplinaryBoardDecisionsSubmitForm.get('disciplinaryBoardFileId').setValue(_disciplinaryBoardFileId);
      this.disciplinaryBoardDecisionsSubmitForm.get('leagueId').setValue(_leagueId);
      this.disciplinaryBoardDecisionsSubmitForm.get('teamId').setValue(_teamId);
      this.disciplinaryBoardDecisionsSubmitForm.get('fullName').setValue(_fullName);
      this.disciplinaryBoardDecisionsSubmitForm.get('licenseNo').setValue(_licenseNo);
      this.disciplinaryBoardDecisionsSubmitForm.get('belongingTo').setValue(_belongingTo);
      this.disciplinaryBoardDecisionsSubmitForm.get('penalType').setValue(_penalType);
      this.disciplinaryBoardDecisionsSubmitForm.get('duration').setValue(_duration);
      this.disciplinaryBoardDecisionsSubmitForm.get('explanation').setValue(_explanation);

      if (this.disciplinaryBoardDecisionsSubmitForm.valid) {
        disciplinaryBoardDecisionImportedFormsList.push(this.disciplinaryBoardDecisionsSubmitForm.value);
        this.disciplinaryBoardDecisionsSubmitForm.reset();
      } else {
        this.globalFunctions.showSnackBarDirectly('HATA! Yüklenen dosyada ' + (i+1) + '. satır hatalıdır!');
        disciplinaryBoardDecisionImportedFormsList = [];
        break;
      }
    }

    this.onImport(disciplinaryBoardDecisionImportedFormsList);
  }

  patchTableToFile(tableData: any[]): any[] {
    var fileData: any[] = [];
    for (let i = 0; i < tableData.length; i++) {
      const row = tableData[i];

      let globalDisciplinaryBoardDecisionsExport = <GlobalDisciplinaryBoardDecisionExportModel>{};
      globalDisciplinaryBoardDecisionsExport.Dosya_No = this.findDisciplinaryBoardCaseNoValue(this.disciplinaryBoardFileSelectionId);
      globalDisciplinaryBoardDecisionsExport.Lig_Adı = this.findLeagueName(row["leagueId"]);
      globalDisciplinaryBoardDecisionsExport.Takım_Adı = this.findTeamName(row["teamId"]);
      globalDisciplinaryBoardDecisionsExport.Lisans_No = row["licenseNo"];
      globalDisciplinaryBoardDecisionsExport.Ad_Soyad = row["fullName"];
      globalDisciplinaryBoardDecisionsExport.Görevi = this.findBelongingTo(row["belongingTo"]);
      globalDisciplinaryBoardDecisionsExport.Ceza_Türü = this.findPenalType(row["penalType"]);
      globalDisciplinaryBoardDecisionsExport.Süre = row["duration"];
      globalDisciplinaryBoardDecisionsExport.Açıklama = row["explanation"];

      fileData.push(globalDisciplinaryBoardDecisionsExport);
    }
    return fileData;
  }

  onExport() {
    const _fileData = this.patchTableToFile(this.disciplinaryBoardDecisionsList);
    const _exportTitle: string = this.disciplinaryCommitteesList.find(c => c.name == this.url_caseType).exportTitle;
    const _fileName = _exportTitle + "_" + this.findDisciplinaryBoardCaseNoValue(this.disciplinaryBoardFileSelectionId);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(_fileData);
    const workbook: XLSX.WorkBook = { Sheets: { 'Kurul_Kararlari': worksheet }, SheetNames: ['Kurul_Kararlari'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = `${_fileName}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }


  onImport(disciplinaryBoardDecisionImportedFormsList: DisciplinaryBoardDecisionModel[]) {
    if (disciplinaryBoardDecisionImportedFormsList.length > 0) {
      for (let i = 0; i < disciplinaryBoardDecisionImportedFormsList.length; i++) {
        const disciplinaryBoardDecisionInfo = disciplinaryBoardDecisionImportedFormsList[i];
        this.disciplinaryBoardDecisionsService.createDisciplinaryBoardDecision(disciplinaryBoardDecisionInfo);
      }
    }
  }

  ngOnDestroy(): void {
      this.seasonsListSubscription.unsubscribe();
      this.leaguesListSubscription.unsubscribe();
      this.teamsListSubscription.unsubscribe();
      this.disciplinaryBoardFilesListSubscription.unsubscribe();
      //this.disciplinaryBoardDecisionsListSubscription.unsubscribe();
  }
}
