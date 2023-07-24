import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { FixtureSearchModel } from "../models/application-fixture-search-index.model";
import { FixtureModel } from '../models/application-fixture.model';



@Injectable({
    providedIn: 'root'
})
export class fixtureFunctions {


  constructor(
  ) {

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
    _weeklyMatchProgramIds: Array<number>
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
    fixtureSearchIndex.weeklyMatchProgramIds = _weeklyMatchProgramIds;

    return fixtureSearchIndex;
  }

}

