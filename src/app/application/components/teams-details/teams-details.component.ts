import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { TeamsModel } from "../../models/application-teams.model";
import { TeamsService } from "../../services/application-teams.service";

import { Router } from "express";
import { ParamMap } from "@angular/router";

@Component({
  selector: 'app-application-teams-details',
  templateUrl: './teams-details.component.html',
  styleUrls: ['../../../app.component.css', './teams-details.component.css']
})
export class ApplicationTeamDetails implements OnInit, OnDestroy {
  headerTitle = "";
  isLoading = false;
  team: TeamsModel;
  private teamSub: Subscription;
  url_teamId: number;

  constructor(
    private teamsService: TeamsService, 
    public dialog: MatDialog, 
    private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.paramMap
      .subscribe(params => {
        this.url_teamId = Number(params.get('id'));

        this.teamsService.getTeamById(this.url_teamId);
        this.teamSub = this.teamsService.getTeamByIdUpdateListener()
          .subscribe({
            next: (data: TeamsModel) => {
              this.team = data;
              console.log(this.team);
            },
            error: (error) => {

            }
          });
      })
  }

  ngOnDestroy(): void {

  }
}
