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

  getFixtureBySearchIndex(fixtureSearchIndex: FixtureSearchModel) {
    try {
      this.globalFunctions.showSpinner.next(true);
      // Not known why http.get doesn't work!
      this.http
        .put<{error: boolean, message: string, fixtureList: FixtureModel[]}>(
          'http://localhost:3000/fikstur/arama', fixtureSearchIndex
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

}
