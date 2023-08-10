import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { FixtureSearchModel } from "../models/admin-fixture-search-index.model";
import { MatchModel } from '../models/admin-match.model';
import { TeamsInGroupstagesModel } from '../models/admin-teams-in-groupstages.model';
import { FixtureModel } from '../models/admin-fixture.model';

import { globalFunctions } from "../../functions/global.function";

@Injectable({
    providedIn: 'root'
})
export class fixtureFunctions {


  constructor(
    private globalFunctions: globalFunctions
  ) {}

  setMatchNo(_seasonId: number, _leagueId: number, _groupstageId: number, _weekNumber: number, _orderNo: number): string {
      const matchNo = ('35' + _seasonId.toString().padStart(2, "0") + _leagueId.toString().padStart(2, "0") + _groupstageId.toString().padStart(2, "0") + '-' + _weekNumber.toString().padStart(2, "0") + _orderNo.toString().padStart(2, "0"));
      return matchNo;
  }

  setFixtureSearchModel(
    _seasonId: number,
    _leagueId: number,
    _groupstageId: number,
    _matchWeek: number,
    _matchNo: string,
    _stadiumId: number,
    _homeTeamId: number,
    _awayTeamId: number,
    _matchStatus: string,
    _town: string,
    _startDate: Date,
    _endDate: Date,
    _weeklyMatchProgramId: number
  ): FixtureSearchModel {
    let fixtureSearchIndex: FixtureSearchModel = <FixtureSearchModel>{};

    fixtureSearchIndex.seasonId = _seasonId;
    fixtureSearchIndex.leagueId = _leagueId;
    fixtureSearchIndex.groupstageId = _groupstageId;
    fixtureSearchIndex.matchWeek = _matchWeek;
    fixtureSearchIndex.matchNo = _matchNo;
    fixtureSearchIndex.stadiumId = _stadiumId;
    fixtureSearchIndex.homeTeamId = _homeTeamId;
    fixtureSearchIndex.awayTeamId = _awayTeamId;
    fixtureSearchIndex.matchStatus = _matchStatus;
    fixtureSearchIndex.town = _town;
    fixtureSearchIndex.startDate = _startDate;
    fixtureSearchIndex.endDate = _endDate;
    fixtureSearchIndex.weeklyMatchProgramId = _weeklyMatchProgramId;

    return fixtureSearchIndex;
  }

  setMatchDraft(
    _homeTeam: TeamsInGroupstagesModel,
    _awayTeam: TeamsInGroupstagesModel,
    _weekNumber: number,
    _orderNo: number,
    _seasonId: number,
    _leagueId: number,
    _groupstageId: number
  ): MatchModel {
    let _matchDraft = <MatchModel>{};
    _matchDraft.id = null;
    _matchDraft.groupstageId = _groupstageId;
    _matchDraft.matchNo = this.setMatchNo(_seasonId, _leagueId, _groupstageId, _weekNumber, _orderNo);
    _matchDraft.matchWeek = _weekNumber;
    _matchDraft.orderNo = _orderNo;
    _matchDraft.matchStatus = 'NOTPLAYED';
    _matchDraft.stadiumId = _homeTeam ? _homeTeam.teamStadiumId : null;
    _matchDraft.homeTeamId = _homeTeam ? _homeTeam.teamId : null;
    _matchDraft.homeTeamScore = null;
    _matchDraft.homeTeamPoint = null;
    _matchDraft.isHomeTeamWinByForfeit = false;
    _matchDraft.awayTeamId = _awayTeam ? _awayTeam.teamId : null;
    _matchDraft.awayTeamScore = null;
    _matchDraft.awayTeamPoint = null;
    _matchDraft.isAwayTeamWinByForfeit = false;

    return _matchDraft;
  }

  convertModelFixtureToMatch(fixtureList: FixtureModel[]): MatchModel[] {
    let matchList: MatchModel[] = [];

    for (let i = 0; i < fixtureList.length; i++) {
      const _fixture = fixtureList[i];

      let match: MatchModel = <MatchModel>{};
      match.id = _fixture.id;
      match.createdAt = _fixture.createdAt;
      match.createdBy = _fixture.createdBy;
      match.updatedAt = _fixture.updatedAt;
      match.updatedBy = _fixture.updatedBy;
      match.groupstageId = _fixture.groupstageId;
      match.matchNo = _fixture.matchNo;
      match.matchWeek = _fixture.matchWeek;
      match.matchDate = _fixture.matchDate;
      match.matchStatus = _fixture.matchStatus;
      match.stadiumId = _fixture.stadiumId;
      match.homeTeamId = _fixture.homeTeamId;
      match.homeTeamScore = _fixture.homeTeamScore;
      match.isHomeTeamWinByForfeit = _fixture.isHomeTeamWinByForfeit;
      match.homeTeamPoint = _fixture.homeTeamPoint;
      match.awayTeamId = _fixture.awayTeamId;
      match.awayTeamScore = _fixture.awayTeamScore;
      match.isAwayTeamWinByForfeit = _fixture.isAwayTeamWinByForfeit;
      match.awayTeamPoint = _fixture.awayTeamPoint;
      match.explanation = _fixture.explanation;
      match.orderNo = _fixture.orderNo;

      matchList.push(match);
    }

    return matchList;
  }


}

