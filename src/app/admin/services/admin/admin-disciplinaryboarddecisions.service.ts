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

    getDisciplinaryBoardDecisions(disciplinaryBoardFileId: number) {
        try {
            this.http
                .get<{error: boolean, message: string, disciplinaryBoardDecisionList: DisciplinaryBoardDecisionModel[]}>(
                    'http://localhost:3000/admin/disiplin-kurulu-kararlari/' + disciplinaryBoardFileId
                )
                .subscribe((data) => {
                    if (!data.error) {
                        this.disciplinaryBoardDecisionList = data.disciplinaryBoardDecisionList;
                        !!this.disciplinaryBoardDecisionList ? this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]) : this.disciplinaryBoardDecisionListSub.next([]);
                    } else {
                        console.log(data.message);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    getDisciplinaryBoardDecisionsUpdateListener() {
        return this.disciplinaryBoardDecisionListSub.asObservable();
    }

    createDisciplinaryBoardDecision(disciplinaryBoardDecisionInfo: DisciplinaryBoardDecisionModel) {
        try {
            this.http
                .post<{error: boolean, message: string, disciplinaryBoardDecisionId: number}>(
                    'http://localhost:3000/admin/disiplin-kurulu-kararlari', disciplinaryBoardDecisionInfo
                )
                .subscribe((data) => {
                    if (!data.error) {
                        disciplinaryBoardDecisionInfo.id = data.disciplinaryBoardDecisionId;
                        this.disciplinaryBoardDecisionList.push(disciplinaryBoardDecisionInfo);
                        this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]);
                    } else {
                        console.log(data.message);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    updateDisciplinaryBoardDecision(disciplinaryBoardDecisionInfo: DisciplinaryBoardDecisionModel) {
        try {
            this.http
                .put<{error: boolean, message: string}>(
                    'http://localhost:3000/admin/disiplin-kurulu-kararlari/' + disciplinaryBoardDecisionInfo.id, disciplinaryBoardDecisionInfo
                )
                .subscribe((data) => {
                    if (!data.error) {
                        this.disciplinaryBoardDecisionList.forEach((item, i) => {
                            if (item.id == disciplinaryBoardDecisionInfo.id) {
                                this.disciplinaryBoardDecisionList[i] = disciplinaryBoardDecisionInfo;
                            }
                        });
                        this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]);
                    } else {
                        console.log(data.message);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    deleteDisciplinaryBoardDecision(disciplinaryBoardDecisionId: number) {
        try {
            this.http
                .delete<{error: boolean, message: string}>(
                    'http://localhost:3000/admin/disiplin-kurulu-kararlari/' + disciplinaryBoardDecisionId
                )
                .subscribe((data) => {
                    if (!data.error) {
                        const filteredDisciplinaryBoardDecisionList = this.disciplinaryBoardDecisionList.filter(decision => decision.id !== disciplinaryBoardDecisionId);
                        this.disciplinaryBoardDecisionList = filteredDisciplinaryBoardDecisionList;
                        this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]);
                    } else {
                        console.log(data.message);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    clearDisciplinaryBoardDecisions(disciplinaryBoardFileId: number) {
        try {
            this.http
                .delete<{error: boolean, message: string}>(
                    'http://localhost:3000/admin/disiplin-kurulu-kararlari/temizle/' + disciplinaryBoardFileId
                )
                .subscribe((data) => {
                    if (!data.error) {
                        console.log(data.message)
                        this.disciplinaryBoardDecisionList = [];
                        this.disciplinaryBoardDecisionListSub.next([...this.disciplinaryBoardDecisionList]);
                    } else {
                        console.log(data.message);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }
}