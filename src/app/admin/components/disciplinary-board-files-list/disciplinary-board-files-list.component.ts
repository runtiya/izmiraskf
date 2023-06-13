import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { DisciplinaryBoardFileModel } from "../../models/admin-disciplinaryboardfiles.model";
import { DisciplinaryBoardFilesService } from "../../services/admin-disciplinaryboardfiles.service";

import { SeasonsService } from "../../services/admin-seasons.service";
import { SeasonsModel } from "../../models/admin-seasons.model";

import { AdminDisciplinaryBoardCreateModal } from "../disciplinary-board-files-create/disciplinary-board-files-create.component";

import { globalFunctions } from "../../../functions/global.function";

@Component({
    selector: 'app-admin-disciplinary-board-files-list',
    templateUrl: './disciplinary-board-files-list.component.html',
    styleUrls: ['../../../app.component.css', './disciplinary-board-files-list.component.css']
})
export class AdminDisciplinaryBoardFilesList implements OnInit, OnDestroy {

    toolbarTitle = "DİSİPLİN KURULU DOSYALARI";
    isLoading = false;

    seasonsList: SeasonsModel[] = [];
    private seasonsListSubscription: Subscription;
    disciplinaryBoardFilesList: DisciplinaryBoardFileModel[] = [];
    private disciplinaryBoardFilesListSubscription: Subscription;

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
        private globalFunctions: globalFunctions
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.globalFunctions.setToolbarTitle(this.toolbarTitle);
        this.seasonsService.getSeasons();
        this.seasonsListSubscription = this.seasonsService.getSeasonsListSubListener()
            .subscribe((data: SeasonsModel[]) => {
                this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
                this.seasonSelectionId = this.seasonsList[0]["id"];
                this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(this.seasonSelectionId);
                this.isLoading = false;
            });

        this.isLoading = true;
        this.disciplinaryBoardFilesListSubscription = this.disciplinaryBoardFilesService.getDisciplinaryBoardFilesUpdateListener()
            .subscribe((data: DisciplinaryBoardFileModel[]) => {
                const filteredDisciplinaryBoardFilesList = data.filter(file => file.seasonId == this.seasonSelectionId);
                this.disciplinaryBoardFilesList = filteredDisciplinaryBoardFilesList.sort((a, b) => b.caseDate.toString().localeCompare(a.caseDate.toString()));
                this.isLoading = false;
            })
    }

    onSeasonChange(seasonChangedID: number) {
        this.isLoading = true;
        this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(seasonChangedID);
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
              disciplinaryBoardFileInfo: disciplinaryBoardFile
            }
          });
    }

    onDelete(fileId: number) {
        this.isLoading = true;
        this.disciplinaryBoardFilesService.deleteDisciplinaryBoardFile(fileId);
        this.isLoading = false;
    }


    ngOnDestroy(): void {
        this.seasonsListSubscription.unsubscribe();
    }
}
