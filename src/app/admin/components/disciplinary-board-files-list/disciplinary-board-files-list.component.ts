import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { DisciplinaryBoardFileModel } from "../../models/admin-disciplinaryboardfiles.model";
import { DisciplinaryBoardFilesService } from "../../services/admin-disciplinaryboardfiles.service";

import { SeasonsService } from "../../services/admin-seasons.service";
import { SeasonsModel } from "../../models/admin-seasons.model";

import { AdminDisciplinaryBoardCreateModal } from "../disciplinary-board-files-create/disciplinary-board-files-create.component";

import { globalFunctions } from "../../../functions/global.function";
import { disciplinaryBoardFunctions } from "../../functions/disciplinaryboard.function";
import { disciplinaryCommitteesList } from "../../../assets/lists/disciplinary-committees.list";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
    selector: 'app-admin-disciplinary-board-files-list',
    templateUrl: './disciplinary-board-files-list.component.html',
    styleUrls: ['../../../app.component.css', './disciplinary-board-files-list.component.css']
})
export class AdminDisciplinaryBoardFilesList implements OnInit, OnDestroy {

    toolbarTitle = null;
    isLoading: boolean = false;

    seasonsList: SeasonsModel[] = [];
    private seasonsListSubscription: Subscription;
    disciplinaryBoardFilesList: DisciplinaryBoardFileModel[] = [];
    private disciplinaryBoardFilesListSubscription: Subscription;

    url_caseType: string = null;
    disciplinaryCommitteesList = disciplinaryCommitteesList;

    @Input() seasonSelectionId: number;
    tableColumns: string[] = [
                                    "seasonName",
                                    "caseNo",
                                    "caseDate",
                                    "title",
                                    "explanation",
                                    "actions"
                                ];

    constructor(
        public disciplinaryBoardFilesService: DisciplinaryBoardFilesService,
        public seasonsService: SeasonsService,
        public dialog: MatDialog,
        private globalFunctions: globalFunctions,
        private disciplinaryBoardFunctions: disciplinaryBoardFunctions,
        private router: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.router.paramMap
          .subscribe(params => {
            this.url_caseType = params.get('casetype').toUpperCase();
            this.toolbarTitle = disciplinaryCommitteesList.find(c => c.name == this.url_caseType).pageFileTitle;
            this.globalFunctions.setToolbarTitle(this.toolbarTitle);
            this.seasonsService.getSeasons();
          });

        this.seasonsListSubscription = this.seasonsService.getSeasonsListUpdateListener()
            .subscribe((data: SeasonsModel[]) => {
              this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
              this.seasonSelectionId = this.seasonsList[0]["id"];
              this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(this.seasonSelectionId, this.url_caseType);
              this.isLoading = false;
            });

        this.isLoading = true;
        this.disciplinaryBoardFilesListSubscription = this.disciplinaryBoardFilesService.getDisciplinaryBoardFilesUpdateListener()
            .subscribe((data: DisciplinaryBoardFileModel[]) => {
              const filteredDisciplinaryBoardFilesList = data.filter(file => file.seasonId == this.seasonSelectionId && file.caseType == this.url_caseType);
              this.disciplinaryBoardFilesList = filteredDisciplinaryBoardFilesList.sort((a, b) => b.caseDate.toString().localeCompare(a.caseDate.toString()));
              this.isLoading = false;
            })
    }

    onSeasonChange(seasonChangedID: number) {
      this.isLoading = true;
      this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(seasonChangedID, this.url_caseType);
      this.isLoading = false;
    }

    findSeasonName(seasonId: number): string {
      let seasonName = this.seasonsList.find(season => season.id == seasonId).seasonName;
      return seasonName || 'Bilinmiyor';
    }

    onCreate() {
      const dialogRef = this.dialog.open(AdminDisciplinaryBoardCreateModal, {
        data: {
          pageMode: 'create',
          seasonList: this.seasonsList,
          seasonSelectionId: this.seasonSelectionId,
          caseType: this.url_caseType,
          disciplinaryBoardFileInfo: null
        }
      });

    }

    onEdit(disciplinaryBoardFile: DisciplinaryBoardFileModel) {
      const dialogRef = this.dialog.open(AdminDisciplinaryBoardCreateModal, {
          data: {
            pageMode: 'edit',
            seasonList: this.seasonsList,
            seasonSelectionId: this.seasonSelectionId,
            caseType: this.url_caseType,
            disciplinaryBoardFileInfo: disciplinaryBoardFile
          }
        });
    }

    onDelete(fileId: number) {
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
              this.disciplinaryBoardFilesService.deleteDisciplinaryBoardFile(fileId);
            }
          }
        });
    }

    onCreateNews(disciplinaryBoardFile: DisciplinaryBoardFileModel) {
      this.disciplinaryBoardFunctions.createNewsForDisciplinaryBoardAnnouncement(disciplinaryBoardFile);
    }

    ngOnDestroy(): void {
        this.seasonsListSubscription.unsubscribe();
    }
}
