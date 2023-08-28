import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { globalFunctions } from "./functions/global.function";

import { AuthService } from "./admin/authentication/auth.service";
import { GlobalIzmirASKFService } from "./services/global-izmiraskf.service";
import { ExternalLinksService } from "./application/services/application-externallinks.service";
import { UserModel } from "../app/admin/models/admin-users.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'izmiraskf';
  snackBarDuration = 3000; //milisecond
  showSpinner: boolean;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  authenticatedUser: UserModel = <UserModel>{};
  private authenticatedUserSub: Subscription;

  constructor(
    private globalFunctions: globalFunctions,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
  ) {

  }

  ngOnInit() {
    this.globalFunctions.snackBar.subscribe(message => {
      this._snackBar.open(message, 'Tamam', {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: this.snackBarDuration
      });
    });

    // <mat-spinner> subscription
    this.globalFunctions.showSpinner
      .subscribe((_displaySpinner: boolean) => {
        this.showSpinner = _displaySpinner;
      });

    // Auto Authentication Control
    this.authService.autoAuthUser();

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        setTimeout(() => {
          this.userIsAuthenticated = isAuthenticated;
        }, 0);
      });

  }

}
