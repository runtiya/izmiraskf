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

  createFixture(fixtures: FixtureModel[], groupstageId: number) {
    try {
      this.http
        .post<{error: boolean, message: string, fixtureList: FixtureModel[]}>(
          'http://localhost:3000/admin/fikstur/' + groupstageId, fixtures
        )
        .subscribe((data) => {
          if (!data.error) {
            console.log(data.fixtureList)
            this.fixtureList = fixtures;
            !!this.fixtureList ? this.fixtureListSub.next([...this.fixtureList]) : this.fixtureListSub.next([]);
            //!!data.fixtureList ? data.fixtureList.forEach(f => f.matchNo = (f.matchNo + f.id).toString()) : null;
          } else {
            console.log(data.message);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }
}
