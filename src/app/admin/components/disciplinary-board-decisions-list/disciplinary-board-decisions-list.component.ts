import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { DisciplinaryBoardDecisionModel } from "../../models/admin-disciplinaryboarddecisions.model";
import { DisciplinaryBoardDecisionsService } from "../../services/admin-disciplinaryboarddecisions.service";

import { DisciplinaryBoardFileModel } from "../../models/admin-disciplinaryboardfiles.model";
import { DisciplinaryBoardFilesService } from "../../services/admin-disciplinaryboardfiles.service";

import { SeasonsService } from "../../services/admin-seasons.service";
import { SeasonsModel } from "../../models/admin-seasons.model";

import { LeaguesModel } from "../../models/admin-leagues.model";
import { LeaguesService } from "../../services/admin-leagues.service";

import { TeamsModel } from "../../models/admin-teams.model";
import { TeamsService } from "../../services/admin-teams.service";

import { AdminDisciplinaryBoardDecisionsCreateModal } from "../disciplinary-board-decisions-create/disciplinary-board-decisions-create.component";

import { disciplinaryPenalTypeList } from "../../../assets/lists/disciplinary-penaltype-list";
import { disciplinaryBelongingToList } from "../../../assets/lists/disciplinary-belongingto-list";

@Component({
    selector: 'app-admin-disciplinary-board-decisions-list',
    templateUrl: './disciplinary-board-decisions-list.component.html',
    styleUrls: ['../../../app.component.css', './disciplinary-board-decisions-list.component.css']
})
export class AdminDisciplinaryBoardDecisionsList implements OnInit, OnDestroy {

    headerTitle = "DİSİPLİN KURULU KARARLARI";
    isLoading = false;

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
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.seasonsService.getSeasons();
        this.seasonsListSubscription = this.seasonsService.getSeasonsListSubListener()
            .subscribe((data: SeasonsModel[]) => {
                this.seasonsList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
                this.seasonSelectionId = this.seasonsList[0]["id"];
                this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(this.seasonSelectionId);
                this.leaguesService.getLeagues(this.seasonSelectionId);
                this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
                this.isLoading = false;
            });

        this.isLoading = true;
        this.disciplinaryBoardFilesListSubscription = this.disciplinaryBoardFilesService.getDisciplinaryBoardFilesUpdateListener()
            .subscribe((data: DisciplinaryBoardFileModel[]) => {
                this.disciplinaryBoardFilesList = data.sort((a, b) => b.caseDate.toString().localeCompare(a.caseDate.toString()));
                this.disciplinaryBoardFileSelectionId = this.disciplinaryBoardFilesList[0]["id"];
                this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
                this.isLoading = false;
            });

        this.isLoading = true;
        this.leaguesListSubscription = this.leaguesService.getLeagueListUpdateListener()
            .subscribe((data: LeaguesModel[]) => {
                this.leaguesList = data.sort((a, b) => a.orderNo - b.orderNo);
                this.isLoading = false;
            });

        this.isLoading = true;
        this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisionsUpdateListener()
            .subscribe((data: DisciplinaryBoardDecisionModel[]) => {
                const filteredDisciplinaryBoardDecisionsList = data.filter(decision => decision.disciplinaryBoardFileId === this.disciplinaryBoardFileSelectionId);
                this.disciplinaryBoardDecisionsList = filteredDisciplinaryBoardDecisionsList.sort((a, b) => a.leagueId - b.leagueId);
                this.isLoading = false;
            });

        this.isLoading = true;
        this.teamsService.getTeams();
        this.teamsListSubscription = this.teamsService.getTeamListSubListener()
            .subscribe((data: TeamsModel[]) => {
                this.teamsList = data.sort((a, b) => a.officialName.localeCompare(b.officialName));
                this.isLoading = false;
            });

    }

    onSeasonChange() {
        this.isLoading = true;
        this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(this.seasonSelectionId);
        this.leaguesService.getLeagues(this.seasonSelectionId);
        this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
        this.isLoading = false;
    }

    onFileNoChange() {
        this.isLoading = true;
        this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
        this.isLoading = false;
    }

    findLeagueName(leagueId: number): string {
        return this.leaguesList.find(l => l.id == leagueId).leagueName || null;
    }

    findTeamName(teamId: number): string {
        return this.teamsList.find(t => t.id == teamId).shortName || this.teamsList.find(t => t.id == teamId).officialName || null;
    }

    findPenalType(penalType: string): string {
        return penalType ? this.disciplinaryPenalTypeList.find(p => p.name == penalType).value : null;
    }

    findBelongingTo(belongingTo: string): string {
        return belongingTo ? this.disciplinaryBelongingToList.find(b => b.name == belongingTo).value : null;

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
        this.isLoading = true;
        this.disciplinaryBoardDecisionsService.deleteDisciplinaryBoardDecision(disciplinaryBoardDecisionId);
        this.isLoading = false;
    }

    onClear() {
        this.isLoading = true;
        this.disciplinaryBoardDecisionsService.clearDisciplinaryBoardDecisions(this.disciplinaryBoardFileSelectionId);
        this.isLoading = false;
    }

    onExport() {

    }

    onImport() {

    }

    ngOnDestroy(): void {
        this.seasonsListSubscription.unsubscribe();
        this.leaguesListSubscription.unsubscribe();
        this.teamsListSubscription.unsubscribe();
        this.disciplinaryBoardFilesListSubscription.unsubscribe();
        //this.disciplinaryBoardDecisionsListSubscription.unsubscribe();
    }
}
