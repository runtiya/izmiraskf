import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { globalFunctions } from "../functions/global.function";

@Injectable({providedIn: 'root'})
export class GlobalIzmirASKFService {
  private logoPath: string = null;
  private logoPathSubject = new Subject<string>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}


  getLogoPath() {
    return this.http
      .get<{ data: string}>(
        'http://localhost:3000/izmiraskf/hakkimizda/getlogo'
      )
      .subscribe({
        next: (data) => {
          this.logoPath = data.data;
          this.logoPathSubject.next(this.logoPath);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getLogoPathUpdateListener() {
    return this.logoPathSubject.asObservable();
  }

}
