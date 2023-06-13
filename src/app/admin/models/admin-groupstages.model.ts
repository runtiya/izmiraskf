export interface GroupStagesModel {
  id: number,
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  leagueId: number,
  leagueName: string,
  seasonId: number,
  seasonName: string,
  groupName: string,
  periodSystem: number, // 1 Devreli - 2 Devreli - 3 Devreli
  isActive: boolean,
  orderNo: number
}
