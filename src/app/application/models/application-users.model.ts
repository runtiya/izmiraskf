export interface UserModel {
  id: number,
  fullName: string,
  userName: string,
  userPassword: string,
  profilePhoto: File,
  userType: string,
  isActive: boolean
}
