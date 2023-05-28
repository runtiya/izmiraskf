import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

//import {  } from "../../models/application-teams.model";

@Component({
  selector: 'app-application-teamslist',
  templateUrl: './teams-list.component.html',
  styleUrls: ['../../../app.component.css', './teams-list.component.css']
})
export class ApplicationTeamsList implements OnInit, OnDestroy {
  headerTitle = "TAKIMLAR";
  isLoading = false;
  //teamsList: TeamsModel[] = [];
  private teamsListSub: Subscription;

  constructor(
    //private teamsService: TeamsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
