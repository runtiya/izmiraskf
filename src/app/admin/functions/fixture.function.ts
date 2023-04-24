import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class fixtureFunctions {

    constructor() {}

    static setMatchNo(_seasonId: number, _leagueId: number, _groupstageId: number, _weekNumber: number, _orderNo: number): string {
        const matchNo = ('35' + _seasonId.toString().padStart(2, "0") + _leagueId.toString().padStart(2, "0") + _groupstageId.toString().padStart(2, "0") + '-' + _weekNumber.toString().padStart(2, "0") + _orderNo.toString().padStart(2, "0"));
        return matchNo;
    }

    
}

