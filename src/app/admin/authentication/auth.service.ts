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
  private authStatusListener = new Subject<boolean>();

  private usersList: UserModel[] = [];
  private usersListSub = new Subject<UserModel[]>();

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

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUsersList() {
    try {
      this.http
        .get<{error: boolean, message: string, usersList: UserModel[]}>(
          'http://localhost:3000/admin/kullanicilar'
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.usersList = data.usersList;
              this.usersListSub.next([...this.usersList]);
            } else {

            }
          },
          error: (error) => {
          }
        })
    } catch (error) {

    }
  }

  getUsersListListener() {
    return this.usersListSub.asObservable();
  }

  createUser(userForm: UserModel) {
    try {
      this.globalFunctions.showSpinner.next(true);
      this.http
        .post<{error: boolean, message: string, user: UserModel}>(
          'http://localhost:3000/admin/kullanicilar/signup', userForm
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              //this.router.navigate(["/admin/giris"]);
              this.usersList.push(data.user);
              this.usersListSub.next([...this.usersList]);

            } else {
              this.authStatusListener.next(false);
              this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
            }
            this.globalFunctions.showSpinner.next(false);
          },
          error: (error) => {

          }
        });
    } catch (error) {
      this.authStatusListener.next(false);
      this.globalFunctions.showSpinner.next(false);
      this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
    }
  }

  login(userForm: UserModel) {
    try {
      this.globalFunctions.showSpinner.next(true);
      this.http
        .post<{error: boolean, message: string, snackBarMessage: string, token: string, expiresIn: number, user: UserModel}>(
          'http://localhost:3000/admin/kullanicilar/login', userForm
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.token = data.token;
              if (this.token) {
                const expiresInDuration = data.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.userName = data.user.userName.toString();
                this.userType = data.user.userType.toString();
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(
                  now.getTime() + expiresInDuration * 1000
                );
                this.saveAuthData(this.token, expirationDate, this.userName, this.userType);
                this.router.navigate(['/admin/anasayfa']);
              }
            } else {
              this.authStatusListener.next(false);
              this.globalFunctions.showSnackBar.next(data.snackBarMessage);
            }
            this.globalFunctions.showSpinner.next(false);
          },
          error: (error) => {

          }
        });
    } catch (error) {
      this.authStatusListener.next(false);
      this.globalFunctions.showSpinner.next(false);
      this.globalFunctions.showSnackBar.next('Bir hata oluştu!');
    }
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
    this.userName = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/admin/kullanici-giris"]);
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
    try {
      this.globalFunctions.showSpinner.next(true);
      this.http
        .delete<{error: boolean, message: string}>(
          'http://localhost:3000/admin/kullanicilar/' + _id
        )
        .subscribe({
          next: (data) => {
            if (!data.error) {
              const filteredUsersList = this.usersList.filter(user => user.id !== _id);
              this.usersList = filteredUsersList;
              this.usersListSub.next([...this.usersList]);
            } else {

            }
          },
          error: (error) => {

          }
        });
        this.globalFunctions.showSpinner.next(false);
    } catch (error) {
    }
  }
}
