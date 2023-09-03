import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { UserModel } from "../models/admin-users.model";
import { environment } from "../../../environments/environment";

import { globalFunctions } from "../../functions/global.function";


@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userName: string;
  private userType: string;
  private userProfileImage: string;
  private userFullName: string;
  private authStatusListener = new Subject<boolean>();

  private usersList: UserModel[] = [];
  private usersListSub = new Subject<UserModel[]>();
  private authenticatedUser: UserModel;
  private authenticatedUserListener = new Subject<UserModel>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private globalFunctions: globalFunctions
  ) {}


  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserName() {
    return this.userName;
  }

  getUserType() {
    return this.userType;
  }

  getUserProfileImage() {
    return this.userProfileImage;
  }

  getUserFullName() {
    return this.userFullName;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUsersListListener() {
    return this.usersListSub.asObservable();
  }

  getAuthenticatedUserListener() {
    return this.authenticatedUserListener.asObservable();
  }

  getUsersList() {
    this.http
      .get<{data: UserModel[]}>(
        'http://localhost:3000/admin/kullanicilar'
      )
      .subscribe({
        next: (data) => {
          this.usersList = data.data;
          this.usersListSub.next([...this.usersList]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  createUser(userInfo: UserModel) {
    const formData = new FormData();
    formData.append('image', userInfo.imageAttachment);
    formData.append('userInfo', JSON.stringify(userInfo));

    this.http
      .post<{ data: UserModel }>(
        'http://localhost:3000/admin/kullanicilar/signup', formData
      )
      .subscribe({
        next: (data) => {
          this.usersList.push(data.data);
          this.usersListSub.next([...this.usersList]);
          this.globalFunctions.showSnackBar('system.success.create');
        },
        error: (error) => {
          this.authStatusListener.next(false);
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateUser(userInfo: UserModel) {
    const formData = new FormData();
    formData.append('image', userInfo.imageAttachment);
    formData.append('userInfo', JSON.stringify(userInfo));

    this.http
      .put<{data: {error: boolean, message: string, snackBarMessage: string, userInfo: UserModel} }>(
        'http://localhost:3000/admin/kullanicilar/profileupdate/' + userInfo.id, formData
      )
      .subscribe({
        next: (data) => {
          if (!data.data.error) {
            this.usersList.forEach((item, i) => {
              if (item.id == userInfo.id) {
                this.usersList[i] = data.data.userInfo;
              }
            });
            this.usersListSub.next([...this.usersList]);
          } else {

          }
          this.globalFunctions.showSnackBar(data.data.snackBarMessage);

        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  login(userForm: UserModel) {
    this.http
      .post<{data: {snackBarMessage: String, token: string, expiresIn: number, user: UserModel}}>(
        'http://localhost:3000/admin/kullanicilar/login', userForm
      )
      .subscribe({
        next: (data) => {
          this.token = data.data.token;
          if (this.token) {
            const expiresInDuration = data.data.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userName = data.data.user.userName.toString();
            this.userType = data.data.user.userType.toString();
            this.userProfileImage = data.data.user.imagePath.toString();
            this.userFullName = data.data.user.fullName.toString();
            this.authStatusListener.next(true);
            this.authenticatedUser = data.data.user;
            this.authenticatedUserListener.next(data.data.user);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(this.token, expirationDate, this.userName, this.userType);
            this.globalFunctions.showSnackBar('login.success');
            this.router.navigate(['/admin/anasayfa']);
          } else {
            this.authStatusListener.next(false);
            this.authenticatedUser = null;
            this.authenticatedUserListener.next(null);
            this.globalFunctions.showSnackBar('login.failure');
          }
        },
        error: (error) => {
          this.authStatusListener.next(false);
          this.authenticatedUser = null;
          this.authenticatedUserListener.next(null);
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      this.logout();
    }

    const now = new Date();
    const expiresIn = authInformation ? authInformation.expirationDate.getTime() - now.getTime() : null;
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userName = authInformation.userName;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.authenticatedUser = <UserModel>{};
    this.authenticatedUserListener.next(this.authenticatedUser);
    this.userName = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();

    let url = this.router.url;
    if (url.includes('admin')) {
      this.router.navigate(["/admin/kullanici-giris"]);
    } else {

    }

  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userName: string, userType: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userName", userName);
    localStorage.setItem("userType", userType)
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userName");
    localStorage.removeItem("userType");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userName = localStorage.getItem("userName");
    const userType = localStorage.getItem("userType");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userName: userName,
      userType: userType
    };
  }

  deleteUser(_id: number) {
    this.http
      .delete<{ }>(
        'http://localhost:3000/admin/kullanicilar/' + _id
      )
      .subscribe({
        next: (data) => {
          const filteredUsersList = this.usersList.filter(user => user.id !== _id);
          this.usersList = filteredUsersList;
          this.usersListSub.next([...this.usersList]);
          this.globalFunctions.showSnackBar('system.success.delete');
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }
}
