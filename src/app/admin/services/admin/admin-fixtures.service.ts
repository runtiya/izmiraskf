import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { FixtureModel } from "../../models/admin-fixture.model";

@Injectable({providedIn: 'root'})
export class FixtureService {
  private fixtureList: FixtureModel[] = [];
  private fixtureListSub = new Subject<FixtureModel[]>();

  constructor(private http: HttpClient) {}

  getFixture(groupstageId: number) {
    try {
      this.http
        .get<{error: boolean, message: string, fixtureList: FixtureModel[]}>(
          'http://localhost:3000/admin/fikstur/' + groupstageId
        )
        .subscribe((data) => {
          if (!data.error) {
            this.fixtureList = data.fixtureList;
            !!this.fixtureList ? this.fixtureListSub.next([...this.fixtureList]) : this.fixtureListSub.next([]);
          } else {
            console.log(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  getFixtureUpdateListener() {
    return this.fixtureListSub.asObservable();
  }

  buildFixtureAsObservable(_fixtureList: FixtureModel[]) {
    this.fixtureList = _fixtureList;
    this.fixtureListSub.next([...this.fixtureList]);
  }

  createFixture(fixtures: FixtureModel[], groupstageId: number) {
    try {
      this.http
        .post<{error: boolean, message: string, fixtureList: FixtureModel[]}>(
          'http://localhost:3000/admin/fikstur/' + groupstageId, fixtures
        )
        .subscribe((data) => {
          if (!data.error) {
            this.fixtureList = fixtures;
            !!this.fixtureList ? this.fixtureListSub.next([...this.fixtureList]) : this.fixtureListSub.next([]);
          } else {
            console.log(data.message);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  createMatch(matchDay: FixtureModel, matchNo: string): boolean {
    
    const doesMatchExist = this.checkMatchExist(matchDay);
    if (!doesMatchExist) {
      matchDay.matchNo = matchNo;
      this.fixtureList.push(matchDay);
      this.fixtureListSub.next([...this.fixtureList]);
      return true;
    } else {
      return false;
    }
    
  }

  editMatch(matchDay: FixtureModel, isSameMatch: boolean): boolean {

    let val_push: boolean = false;

    if (isSameMatch) {
      val_push = true;
    } else {
      const doesMatchExist = this.checkMatchExist(matchDay);
      if (!doesMatchExist) {
        val_push = true;
      } else {
        val_push = false;
      }
    }
    if (val_push) {
      let matchIndex = this.fixtureList.findIndex(fixture => fixture.matchNo == matchDay.matchNo);
      this.fixtureList[matchIndex] = matchDay;
      this.fixtureListSub.next([...this.fixtureList]);
    }

    return val_push;
    
  }

  checkMatchExist(matchDay: FixtureModel): boolean {
    let match = this.fixtureList.find(match => (match.matchWeek == matchDay.matchWeek && match.orderNo == matchDay.orderNo));
    return !!match;
  }

  deleteMatch(matchNo: string) {
    this.fixtureList = this.fixtureList.filter(fixture => fixture.matchNo !== matchNo);
    !!this.fixtureList ? this.fixtureListSub.next([...this.fixtureList]) : this.fixtureListSub.next([]);
  }
}
