export interface FixtureSearchModel {
    seasonId: number,
    leagueId: number,
    groupstageId: number,
    matchWeek: number,
    matchNo: string,
    stadiumId: number,
    homeTeamId: number,
    awayTeamId: number,
    matchStatus: string,
    town: string,
    startDate: Date,
    endDate: Date,
    weeklyMatchProgramIds: Array<number>
}
