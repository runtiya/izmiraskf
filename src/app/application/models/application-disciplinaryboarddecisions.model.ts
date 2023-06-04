export interface DisciplinaryBoardDecisionModel {
    id: number,
    disciplinaryBoardFileId: number,
    leagueId: number,
    teamId: number,
    fullName: string,
    licenseNo: string,
    belongingTo: string,
    penalType: string,
    duration: string,
    explanation: string,
}