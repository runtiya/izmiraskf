export interface LeaguesModel {
  id: number,
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  seasonId: number,
  leagueName: string,
  category: string,
  leagueType: string,
  isActive: boolean,
  orderNo: number
}
