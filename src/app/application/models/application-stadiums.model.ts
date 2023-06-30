export interface StadiumsModel {
  id: number,
  stadiumName: string,
  city: string,
  town: string,
  address: string,
  phoneNumber: string,
  imagePath: string,
  longitude: number,
  latitude: number,
  audienceCapacity: number,
  sizeLength: number,
  sizeWidth: number,
  floorType: string,
  hasLightning: boolean,
  hasSeating: boolean,
  hasDisabledTribune: boolean,
  hasClosedCircuitCameraSystem: boolean
}
