export interface TeamsInGroupstagesModel {
  id: number,
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
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
