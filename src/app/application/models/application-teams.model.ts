export interface TeamsModel {
  id: number,
  TFFClubCode: string,
  officialName: string,
  shortName: string,
  logoImage: File,
  city: string,
  town: string,
  address: string,
  longitude: number,
  latitude: number,
  phoneNumber: string,
  faxNumber: string,
  stadiumId: number,
  presidentName: string,
  colorCodes: string,
  websiteURL: string,
  isASKFMember: boolean,
  isVisible: boolean
}
