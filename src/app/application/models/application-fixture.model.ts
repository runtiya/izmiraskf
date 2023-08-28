export interface FixtureModel {
  id: number,
  seasonId: number,
  seasonName: string,
  leagueId: number,
  leagueName: string,
  groupstageId: number,
  groupstageName: string,
  matchNo: string,
  matchWeek: number,
  matchDate: Date | string,
  matchStatus: string,
  stadiumId: number,
  stadiumName: string,
  stadiumTown: string,
  homeTeamId: number,
  homeTeamOfficialName: string,
  homeTeamShortName: string,
  homeTeamImagePath: string,
  homeTeamScore: number,
  isHomeTeamWinByForfeit: boolean,
  homeTeamPoint: number,
  homeTeamIsExpelled: boolean,
  homeTeamIsReceded: boolean,
  homeTeamWeekOfExpelledOrReceded: number,
  homeTeamExpelledOrRecededExplanation: string,
  awayTeamId: number,
  awayTeamOfficialName: string,
  awayTeamShortName: string,
  awayTeamImagePath: string,
  awayTeamScore: number,
  isAwayTeamWinByForfeit: boolean,
  awayTeamPoint: number,
  awayTeamIsExpelled: boolean,
  awayTeamIsReceded: boolean,
  awayTeamWeekOfExpelledOrReceded: number,
  awayTeamExpelledOrRecededExplanation: string,
  explanation: string,
  orderNo: number
}
