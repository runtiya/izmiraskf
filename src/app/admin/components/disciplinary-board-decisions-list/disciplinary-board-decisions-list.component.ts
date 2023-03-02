import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { DisciplinaryBoardDecisionModel } from "../../models/admin-disciplinaryboarddecisions.model";
import { DisciplinaryBoardDecisionsService } from "../../services/admin/admin-disciplinaryboarddecisions.service";

import { DisciplinaryBoardFileModel } from "../../models/admin-disciplinaryboardfiles.model";
import { DisciplinaryBoardFilesService } from "../../services/admin/admin-disciplinaryboardfiles.service";

import { SeasonsService } from "../../services/admin/admin-seasons.service";
import { SeasonsModel } from "../../models/admin-seasons.model";

import { LeaguesModel } from "../../models/admin-leagues.model";
import { LeaguesService } from "../../services/admin/admin-leagues.service";

import { TeamsModel } from "../../models/admin-teams.model";
import { TeamsService } from "../../services/admin/admin-teams.service";

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

    @Input() seasonSelectionId: number;
    @Input() disciplinaryBoardFileSelectionCaseNo: string;
    displayedColumns: string[] = ["caseNo", "leagueName", "teamName", "licenseNo", "fullName", "belongingTo", "penalType", "duration", "explanation", "actions"];


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
                this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.seasonSelectionId, this.disciplinaryBoardFileSelectionCaseNo);
                this.isLoading = false;
            });
        
        this.isLoading = true;
        this.disciplinaryBoardFilesListSubscription = this.disciplinaryBoardFilesService.getDisciplinaryBoardFilesUpdateListener()
            .subscribe((data: DisciplinaryBoardFileModel[]) => {
                this.disciplinaryBoardFilesList = data.sort((a, b) => b.caseDate.toString().localeCompare(a.caseDate.toString()));
                this.disciplinaryBoardFileSelectionCaseNo = this.disciplinaryBoardFilesList[0]["caseNo"];
                let fileId = this.disciplinaryBoardFilesList.find(f => f.caseNo == this.disciplinaryBoardFileSelectionCaseNo).id;
                this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(fileId, this.disciplinaryBoardFileSelectionCaseNo);
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
                this.disciplinaryBoardDecisionsList = data.sort((a, b) => a.leagueId - b.leagueId);
                this.isLoading = false;
            });

        this.isLoading = true;
        this.teamsService.getTeams();
        this.teamsListSubscription = this.teamsService.getTeamListSubListener()
            .subscribe((data: TeamsModel[]) => {
                this.teamsList = data.sort((a, b) => b.officialName.localeCompare(a.officialName));
                this.isLoading = false;
            });
        
    }

    onSeasonChange() {
        this.isLoading = true;
        this.disciplinaryBoardFilesService.getDisciplinaryBoardFiles(this.seasonSelectionId);
        this.leaguesService.getLeagues(this.seasonSelectionId);
        this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(this.seasonSelectionId, this.disciplinaryBoardFileSelectionCaseNo);
        this.isLoading = false;
    }

    onCaseNoChange() {
        this.isLoading = true;
        let fileId = this.disciplinaryBoardFilesList.find(f => f.caseNo == this.disciplinaryBoardFileSelectionCaseNo).id;
        this.disciplinaryBoardDecisionsService.getDisciplinaryBoardDecisions(fileId, this.disciplinaryBoardFileSelectionCaseNo);
        this.isLoading = false;
    }

    findLeagueName(leagueId: number): string {
        return this.leaguesList.find(l => l.id == leagueId).leagueName || null;
    }

    findTeamName(teamId: number): string {
        return this.teamsList.find(t => t.id == teamId).shortName || this.teamsList.find(t => t.id == teamId).officialName || null;
    }

    findPenalType(penalType: string): string {
        return ''
    }

    findBelongingTo(belongingTo: string): string {
        return ''
    }

    onCreate() {

    }

    onEdit(disciplinaryBoardDecision: DisciplinaryBoardDecisionModel) {

    }

    onDelete(disciplinaryBoardDecisionId: number) {

    }

    ngOnDestroy(): void {
        this.seasonsListSubscription.unsubscribe();
        this.leaguesListSubscription.unsubscribe();
        this.teamsListSubscription.unsubscribe();
        this.disciplinaryBoardFilesListSubscription.unsubscribe();
        this.disciplinaryBoardDecisionsListSubscription.unsubscribe();   
    }
}