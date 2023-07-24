export interface WeeklyMatchProgramModel {
  id: number,
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  seasonId: number,
  beginDate: Date,
  endDate: Date,
  isActive: boolean
}
