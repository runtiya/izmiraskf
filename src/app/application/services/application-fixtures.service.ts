import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { FixtureModel } from "../models/application-fixture.model";
import { FixtureSearchModel } from "../models/application-fixture-search-index.model";

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
    this.http
      .put<{data: FixtureModel[]}>(
        'http://localhost:3000/fikstur/arama', fixtureSearchIndex
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

}
