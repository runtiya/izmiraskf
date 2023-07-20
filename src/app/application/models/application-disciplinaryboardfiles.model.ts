export interface DisciplinaryBoardFileModel {
    id: number,
    seasonId: number,
    caseNo: string,
    caseDate: Date,
    caseType: string,
    title: string,
    participants: Array<number>,
    explanation: string
}
