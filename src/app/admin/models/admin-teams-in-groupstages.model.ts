export interface TeamsInGroupstagesModel {
  id: number,
  groupstagesId: number,
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
