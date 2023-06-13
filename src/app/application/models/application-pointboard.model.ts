export interface PointBoardModel {
  teamId: number,
  teamOfficialName: string,
  teamShortName: string,
  teamLogo: File,
  matchPlayed: number,
  matchWin: number,
  matchDraw: number,
  matchLose: number,
  goalScored: number,
  goalConceded: number,
  goalAverage: number,
  pointTotal: number
}
