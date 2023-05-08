export interface PointBoardModel {
  teamId: number,
  teamName: string,
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
