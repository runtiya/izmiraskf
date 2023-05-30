import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { FixtureModel } from "../models/admin-fixture.model";
import { FixtureSearchModel } from "../models/admin-fixture-search.model";

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

  createFixture(_fixtureList: FixtureModel[], _groupstageId: number) {
    try {
      this.globalFunctions.showSpinner.next(false);
      this.http
        .post<{error: boolean, message: string, fixtureList: FixtureModel[]}>(
          'http://localhost:3000/admin/fikstur/olustur', _fixtureList
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.getFixture(_groupstageId);
            } else {
              this.globalFunctions.showSnackBar.next('Hata! Fikstür oluşturulamadı!');

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

  updateFixture(_fixtureList: FixtureModel[]) {
    try {
      this.globalFunctions.showSpinner.next(true);
      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/fikstur/guncelle', _fixtureList
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              // Replace updated object with the old one
              for (let f = 0; f < _fixtureList.length; f++) {
                let match = _fixtureList[f];
                let index = this.fixtureList.findIndex(m => m.id == match.id);
                this.fixtureList[index] = match;
              }
              this.fixtureListSub.next([...this.fixtureList]);
            } else {
              this.globalFunctions.showSnackBar.next('Hata! Müsabaka güncellenemedi');

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
    try {
      this.globalFunctions.showSpinner.next(true);
      this.http
        .delete<{error: boolean, message: string}>(
          'http://localhost:3000/admin/fikstur/sil/' +_id
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.fixtureList = this.fixtureList.filter(fixture => fixture.id !== _id);
              !!this.fixtureList ? this.fixtureListSub.next([...this.fixtureList]) : this.fixtureListSub.next([]);
            } else {
              this.globalFunctions.showSnackBar.next('Hata! Müsabaka silinemedi!');
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

  clearFixture(_groupstageId: number) {
    try {
      this.globalFunctions.showSpinner.next(true);
      this.http
        .delete<{error: boolean, message: string}>(
          'http://localhost:3000/admin/fikstur/temizle/' + _groupstageId
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.fixtureList = [];
              !!this.fixtureList ? this.fixtureListSub.next([...this.fixtureList]) : this.fixtureListSub.next([]);
            } else {
              this.globalFunctions.showSnackBar.next('Hata! Fikstür silinemedi!');

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
}
