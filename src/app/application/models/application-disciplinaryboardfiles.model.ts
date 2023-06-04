export interface DisciplinaryBoardFileModel {
    id: number,
    seasonId: number,
    caseNo: string,
    caseDate: Date,
    title: string,
    participants: Array<number>,
    explanation: string
}