import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Observable, pipe, Subscription } from "rxjs";
import { map, startWith } from 'rxjs/operators';
import { FormControl } from "@angular/forms";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { GroupStagesModel } from "../../models/admin-groupstages.model";
import { LeaguesModel } from "../../models/admin-leagues.model";
import { SeasonsModel } from "../../models/admin-seasons.model";
import { TeamsModel } from "../../models/admin-teams.model";
import { TeamsInGroupstagesModel } from "../../models/admin-teams-in-groupstages.model";

import { GroupStagesService } from "../../services/admin-groupstages.service";
import { LeaguesService } from "../../services/admin-leagues.service";
import { SeasonsService } from "../../services/admin-seasons.service";
import { TeamsInGroupstagesService } from "../../services/admin-teams-in-groupstages.service";

import { townList } from "../../../assets/lists/town-list-izmir";

@Component({
  selector: 'app-admin-teams-in-groupstages',
  templateUrl: './teams-in-groupstages.component.html',
  styleUrls: ['../../../app.component.css', './teams-in-groupstages.component.css']
})
export class AdminTeamsInGroupstages implements OnInit, OnDestroy {
  headerTitle = "GRUP-TAKIM EŞLEŞMESİ";
  isLoading = false;
  seasonList: SeasonsModel[] = [];
  private seasonListSub: Subscription;
  leagueList: LeaguesModel[] = [];
  private leagueListSub: Subscription;
  groupstageList: GroupStagesModel[] = [];
  private groupstageListSub: Subscription;
  teamsList: TeamsModel[] = [];
  private teamsListSub: Subscription;
  teamsingroupstagesList: TeamsInGroupstagesModel[] = [];
  private teamsingroupstagesListSub: Subscription;

  @Input() seasonSelectionId: number;
  @Input() leagueSelectionId: number;
  @Input() groupstageSelectionId: number;

  searchControl = new FormControl<string | TeamsModel>('');
  filteredOptions: Observable<TeamsModel[]>;
  filteredTeamsList: TeamsModel[] = [];

  townList = townList;

  constructor(public seasonsService: SeasonsService,
              public leaguesService: LeaguesService,
              public groupstagesService: GroupStagesService,
              public teamsingroupstagesService: TeamsInGroupstagesService,
              private _snackBar: MatSnackBar
            ) {}

  ngOnInit(): void {

    this.seasonsService.getSeasons();
    this.seasonListSub = this.seasonsService.getSeasonsListSubListener()
      .subscribe((data: SeasonsModel[]) => {
        this.isLoading = true;
        if (data.length > 0) {
          this.seasonList = data.sort((a, b) => b.seasonYear.localeCompare(a.seasonYear));
          this.seasonSelectionId = this.seasonList[0]["id"];
          this.leaguesService.getLeagues(this.seasonSelectionId);
        } else {
          this.seasonList = [];
        }

        this.isLoading = false;
      });

    this.leagueListSub = this.leaguesService.getLeagueListUpdateListener()
      .subscribe((data: LeaguesModel[]) => {
        this.isLoading = true;
        if (data.length > 0) {
          this.leagueList = data.sort((a, b) => a.orderNo - b.orderNo);
          this.leagueSelectionId = this.leagueList[0]["id"];
          this.groupstagesService.getGroupstages(this.leagueSelectionId);
        } else {
          this.leagueList = [];
        }

        this.isLoading = false;
      });

    this.groupstageListSub = this.groupstagesService.getGroupStageListUpdateListener()
      .subscribe((data: GroupStagesModel[]) => {
        this.isLoading = true;
        if (data.length > 0) {
          this.groupstageList = data.sort((a, b) => a.orderNo - b.orderNo);
          this.groupstageSelectionId = this.groupstageList[0]["id"];
          this.teamsingroupstagesService.getTeamsInGroupstages(this.groupstageSelectionId);
        } else {
          this.groupstageList = []
        }

        this.isLoading = false;
      });


    this.teamsingroupstagesListSub = this.teamsingroupstagesService.getTeamsInGroupstagesUpdateListener()
      .subscribe((data: TeamsInGroupstagesModel[]) => {
        this.isLoading = true;
        if (data.length > 0) {
          this.teamsingroupstagesList = data.sort((a, b) => a.orderNo - b.orderNo);
        } else {
          this.teamsingroupstagesList = []
        }
        this.isLoading = false;
      });

    this.teamsingroupstagesService.getTeams();
    this.teamsListSub = this.teamsingroupstagesService.getTeamsUpdateListener()
      .subscribe((data: TeamsModel[]) => {
        this.isLoading = true;
        this.teamsList = data.sort((a, b) => a.officialName.localeCompare(b.officialName));
        this.filteredTeamsList = this.teamsList;
        this.isLoading = false;
      });


    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const team = typeof value === 'string' ? value : value?.officialName;
        return team ? this._filter(team as string) : this.teamsList.slice();
      }),
    );

    this.filteredOptions.subscribe((data: TeamsModel[]) => {
      this.isLoading = true;
      this.filteredTeamsList = data;
      this.isLoading = false;
    });
  }

  displayFn(team: TeamsModel): string {
    return team && team.officialName ? team.officialName : '';
  }

  private _filter(value: string): TeamsModel[] {
    const filterValue = value.toLowerCase();
    return this.teamsList.filter(team => team.officialName.toLowerCase().includes(filterValue));
  }

  onSeasonChange(seasonSelectionId: number) {
    this.isLoading = true;
    this.leaguesService.getLeagues(seasonSelectionId);
    this.isLoading = false;
  }

  onLeagueChange(leagueSelectionId: number) {
    this.isLoading = true;
    this.groupstagesService.getGroupstages(leagueSelectionId);
    this.isLoading = false;
  }

  onGroupstageChange(groupstageSelectionId: number) {
    this.isLoading = true;
    this.teamsingroupstagesService.getTeamsInGroupstages(groupstageSelectionId);
    this.isLoading = false;
  }

  onAddList(teamId: number) {
    if (!!this.groupstageSelectionId) {
      const selectedTeam = this.teamsList.find(team => team.id == teamId);

      var castTeam = <TeamsInGroupstagesModel>{};
      castTeam.id = null;
      castTeam.teamId = selectedTeam.id;
      castTeam.teamOfficialName = selectedTeam.officialName;
      castTeam.teamShortName = selectedTeam.shortName;
      castTeam.groupstageId = this.groupstageSelectionId;
      castTeam.isExpelled = false;
      castTeam.isReceded = false;
      castTeam.weekofExpelledorReceded = null;
      castTeam.explanation = null;
      castTeam.orderNo = null;

      this.teamsingroupstagesList.push(castTeam);
    } else {
      this._snackBar.open('Grup seçiniz!', 'Tamam', {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 3000
      });
    }

  }

  onSaveTeamsInGroupstages(teams: TeamsInGroupstagesModel[]) {
    teams.forEach((team, i) => team.orderNo = i+1);
    this.teamsingroupstagesService.createTeamsInGroupstages(teams, this.groupstageSelectionId);
  }

  onRemoveList(teamId: number) {
    this.teamsingroupstagesList = this.teamsingroupstagesList.filter(team => team.teamId !== teamId);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.teamsingroupstagesList, event.previousIndex, event.currentIndex);
  }

  findTown(town: string) {
    return townList.find(t => t.name == town).value
  }

  matchList(teamId: number): boolean {
    // Check if the team with "teamId" is in the "teamsingroupstagesList" to define mat-row-actions
    const team = this.teamsingroupstagesList.find(team => team.teamId == teamId);
    return !!team;
  }

  ngOnDestroy(): void {
    this.seasonListSub.unsubscribe();
    this.leagueListSub.unsubscribe();
    this.groupstageListSub.unsubscribe();
    this.teamsingroupstagesListSub.unsubscribe();
  }
}
