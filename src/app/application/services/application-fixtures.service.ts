import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { FixtureModel } from "../models/application-fixture.model";
import { FixtureSearchModel } from "../models/application-fixture-search.model";

import { globalFunctions } from "../../functions/global.function";
@Injectable({providedIn: 'root'})
export class FixtureService {
  private fixtureList: FixtureModel[] = [];
  private fixtureListSub = new Subject<FixtureModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getFixture(groupstageId: number) {
    try {
      this.globalFunctions.showSpinner.next(true);
      this.http
        .get<{error: boolean, message: string, fixtureList: FixtureModel[]}>(
          'http://localhost:3000/admin/fikstur/' + groupstageId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.fixtureList = data.fixtureList;
              !!this.fixtureList ? this.fixtureListSub.next([...this.fixtureList]) : this.fixtureListSub.next([]);
            } else {

            }
            this.globalFunctions.showSpinner.next(false);
          },
          error: (error) => {

          }
        });
    } catch (error) {
      this.globalFunctions.showSpinner.next(false);
      this.globalFunctions.showSnackBar.next('Bir hata oluştu!');

    }
  }

  getFixtureBySearchIndex(fixtureSearchIndex: FixtureSearchModel) {
    try {
      this.globalFunctions.showSpinner.next(true);
      // Not known why http.get doesn't work!
      this.http
        .put<{error: boolean, message: string, fixtureList: FixtureModel[]}>(
          'http://localhost:3000/admin/fikstur/arama', fixtureSearchIndex
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.fixtureList = data.fixtureList;
              !!this.fixtureList ? this.fixtureListSub.next([...this.fixtureList]) : this.fixtureListSub.next([]);
            } else {

            }
            this.globalFunctions.showSpinner.next(false);
          },
          error: (error) => {

          }
        });
    } catch (error) {
      this.globalFunctions.showSpinner.next(false);
      this.globalFunctions.showSnackBar.next('Bir hata oluştu!');

    }

  }

  getFixtureUpdateListener() {
    return this.fixtureListSub.asObservable();
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
}
