import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";

import { TeamsModel } from "../models/application-teams.model";

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private teamsList: TeamsModel[] = [];
  private teamsListSub = new Subject<TeamsModel[]>();

  constructor(private http: HttpClient) {

  }

  getTeams() {

  }
}
