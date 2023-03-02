import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DisciplinaryBoardDecisionModel } from "../../models/admin-disciplinaryboarddecisions.model";

@Injectable({providedIn: 'root'})
export class DisciplinaryBoardDecisionsService {
    
    private disciplinaryBoardDecisionList: DisciplinaryBoardDecisionModel[] = [];
    private disciplinaryBoardDecisionListSub = new Subject<DisciplinaryBoardDecisionModel[]>();


    constructor(private http: HttpClient) {

    }

    getDisciplinaryBoardDecisions(fileId: number, caseNo: string) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    getDisciplinaryBoardDecisionsUpdateListener() {
        return this.disciplinaryBoardDecisionListSub.asObservable();
    }

    createDisciplinaryBoardDecision(disciplinaryBoardDecisionInfo: DisciplinaryBoardDecisionModel) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    updateDisciplinaryBoardDecision(disciplinaryBoardDecisionInfo: DisciplinaryBoardDecisionModel) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    deleteDisciplinaryBoardDecision(disciplinaryBoardDecisionId: number) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
}