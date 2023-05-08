import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class globalFunctions {


    constructor() {}

    public showSnackBar: Subject<string> = new Subject();
    public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    setSpinner(_displaySpinner: boolean) {
        this.showSpinner.next(_displaySpinner);
    }
}
