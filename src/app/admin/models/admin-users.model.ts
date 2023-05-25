export interface UserModel {
  id: number,
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  fullName: string,
  userName: string,
  userPassword: string,
  profilePhoto: File,
  userType: string,
  isActive: boolean
}
