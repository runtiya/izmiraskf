export interface DisciplinaryBoardFileModel {
    id: number,
    createdAt: Date,
    createdBy: number,
    updatedAt: Date,
    updatedBy: number,
    seasonId: number,
    caseNo: string,
    caseDate: Date,
    caseType: string,
    title: string,
    participants: string,
    explanation: string
}
