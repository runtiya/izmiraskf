export interface StaffIzmirAskfModel {
  id: number,
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  title: string,
  fullName: string,
  phone: string,
  email: string,
  imagePath: string,
  imageAttachment: File,
  isVisible: boolean,
  orderNo: number
}
