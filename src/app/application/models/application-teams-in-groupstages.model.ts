export interface TeamsInGroupstagesModel {
  id: number,
  groupstageId: number,
  teamId: number,
  teamOfficialName: string,
  teamShortName: string,
  teamStadiumId: number,
  isExpelled: boolean,
  isReceded: boolean,
  weekofExpelledorReceded: number,
  explanation: string,
  orderNo: number
}
