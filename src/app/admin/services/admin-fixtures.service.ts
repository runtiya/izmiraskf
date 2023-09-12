import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { FixtureModel } from "../models/admin-fixture.model";
import { FixtureSearchModel } from "../models/admin-fixture-search-index.model";
import { MatchModel } from "../models/admin-match.model";

import { globalFunctions } from "../../functions/global.function";
import { fixtureFunctions } from "../functions/fixture.function";

@Injectable({providedIn: 'root'})
export class FixtureService {
  private fixtureList: FixtureModel[] = [];
  private fixtureListSub = new Subject<FixtureModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions,
    private fixtureFunctions: fixtureFunctions
  ) {}

  getFixtureBySearchIndex(fixtureSearchIndex: FixtureSearchModel) {
    // Not known why http.get doesn't work!
    this.http
      .put<{data: FixtureModel[]}>(
        'http://localhost:3000/admin/fikstur/arama', fixtureSearchIndex
      )
      .subscribe({
        next: (data) => {
          this.fixtureList = data.data;
          !!this.fixtureList ? this.fixtureListSub.next([...this.fixtureList]) : this.fixtureListSub.next([]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getFixtureUpdateListener() {
    return this.fixtureListSub.asObservable();
  }

  createFixture(_matchList: MatchModel[], _fixtureSearchIndex: FixtureSearchModel) {
    const requestData = _matchList;

    this.http
      .post<{ }>(
        'http://localhost:3000/admin/fikstur/olustur', requestData
      )
      .subscribe({
        next: (responseData) => {
          if (_fixtureSearchIndex) {
            this.getFixtureBySearchIndex(_fixtureSearchIndex);
          }
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateFixture(_matchList: MatchModel[], _fixtureSearchIndex: FixtureSearchModel) {
    const requestData = _matchList;
    this.http
      .put<{ }>(
        'http://localhost:3000/admin/fikstur/guncelle', requestData
      )
      .subscribe({
        next: (responseData) => {
          if (_fixtureSearchIndex) {
            this.getFixtureBySearchIndex(_fixtureSearchIndex);
          }
          this.globalFunctions.showSnackBar("system.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }


  checkMatch(_matchDay: FixtureModel, _matchNo: string, _isSameMatch: boolean): boolean {
    let doesMatchExist: boolean = this.checkMatchExist(_matchDay);
    if (doesMatchExist) {
      if (_isSameMatch) {
        // Update
        return true;
      } else {
        // Error
        return false;
      }
    } else {
      // Create
      return true;
    }
  }

  checkMatchExist(matchDay: FixtureModel): boolean {
    let match = this.fixtureList.find(match => (match.matchWeek == matchDay.matchWeek && match.orderNo == matchDay.orderNo));
    return !!match;
  }


  deleteMatch(_id: number) {
    this.http
      .delete<{ }>(
        'http://localhost:3000/admin/fikstur/sil/' +_id
      )
      .subscribe({
        next: (data) => {
          this.fixtureList = this.fixtureList.filter(fixture => fixture.id !== _id);
          !!this.fixtureList ? this.fixtureListSub.next([...this.fixtureList]) : this.fixtureListSub.next([]);
          this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  clearFixture(groupstageId: number) {
    this.http
      .delete<{ }>(
        'http://localhost:3000/admin/fikstur/temizle/' + groupstageId
      )
      .subscribe({
        next: (data) => {
          this.fixtureList = [];
          !!this.fixtureList ? this.fixtureListSub.next([...this.fixtureList]) : this.fixtureListSub.next([]);
          this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }
}
