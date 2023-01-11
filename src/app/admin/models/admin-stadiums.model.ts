export interface StadiumsModel {
  id: number,
  name: string,
  city: string,
  town: string,
  address: string,
  phoneNumber: string,
  stadiumImage: File,
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
