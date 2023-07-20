export interface WeeklyMatchListModel {
  id: number,
  createdAt: Date | string,
  createdBy: number,
  updatedAt: Date | string,
  updatedBy: number,
  weeklyMatchProgramId: number,
  matchId: number,
  matchNo: string,
  isInList: boolean
}
