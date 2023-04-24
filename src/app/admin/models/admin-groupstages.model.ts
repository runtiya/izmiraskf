export interface GroupStagesModel {
  id: number,
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  leagueId: number,
  groupName: string,
  periodSystem: number, // 1 Devreli - 2 Devreli - 3 Devreli
  orderNo: number
}
