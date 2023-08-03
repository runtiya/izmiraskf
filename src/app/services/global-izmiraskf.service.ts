import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GlobalIzmirASKFService {
  private logoPath: string = null;
  private logoPathSubject = new Subject<string>();

  constructor(
    private http: HttpClient
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
          }
        });
  }

  getLogoPathUpdateListener() {
    return this.logoPathSubject.asObservable();
  }

}
