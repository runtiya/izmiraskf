import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class globalFunctions {


    constructor(
      private _datePipe: DatePipe
    ) {}

    public showSnackBar: Subject<string> = new Subject();
    public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public getToolbarTitle: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    setSpinner(_displaySpinner: boolean) {
      this.showSpinner.next(_displaySpinner);
    }

    setToolbarTitle(_toolbarTitle: string) {
      this.getToolbarTitle.next(_toolbarTitle);
    }

    registerLocalDateForLongDate(_date: Date): string {
      const formattedDate = _date !== null ? this._datePipe.transform(_date, 'longDate') : null;
      return formattedDate
    }

    registerLocalDateForShortTime(_date: Date): string {
      const formattedDate = _date !== null ? this._datePipe.transform(_date, 'shortTime') : null;
      return formattedDate;
    }

    getFullYear(): string {
      return new Date().getFullYear().toString();
    }
}
