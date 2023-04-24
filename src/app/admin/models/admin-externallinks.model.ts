export interface ExternalLinksModel {
  id: number,
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  linkName: string,
  url: string,
  linkType: string,
  iconImage: File,
  faBrand: string,
  orderNo: number,
  isActive: boolean
}
