export interface LeaguesModel {
  id: number,
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  seasonId: number,
  seasonName: string,
  leagueName: string,
  category: string,
  leagueType: string,
  isActive: boolean,
  orderNo: number
}
