export interface StaffITFFModel {
  id: number,
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  title: string,
  fullName: string,
  phone: string,
  email: string,
  profileImage: File,
  isVisible: boolean,
  orderNo: number
}
