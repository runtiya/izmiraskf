import { Component, EventEmitter, Output, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../../authentication/auth.service";
import { GlobalIzmirASKFService } from "../../../services/global-izmiraskf.service";
import { UserModel } from "../../models/admin-users.model";

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../app.component.css', './header.component.css']
})
export class AdminHeader implements OnInit, OnDestroy {
  authenticatedUser: UserModel = <UserModel>{};
  title: string = null;
  private authenticatedUserSub: Subscription;

  userName: string = null;
  userProfileImage: string = null;
  userFullName: string = null;

  logoPath: string = null;
  private logoPathSubscription: Subscription;
  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private authService: AuthService,
    private globalIzmirASKFService: GlobalIzmirASKFService
  ){}

  ngOnInit(): void {
    this.authenticatedUser = this.authService.getAuthenticatedUser() || JSON.parse(localStorage.getItem("userInfo"));

    this.globalIzmirASKFService.getLogoPath();
    this.logoPathSubscription = this.globalIzmirASKFService.getLogoPathUpdateListener()
      .subscribe({
        next: (data: string) => {
          this.logoPath = data;
        }
      });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  ngOnDestroy(): void {
    this.logoPathSubscription.unsubscribe();
  }

}
