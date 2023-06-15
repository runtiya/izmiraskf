import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../../authentication/auth.service";
import { UserModel } from "../../models/admin-users.model";

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../app.component.css', './header.component.css']
})
export class AdminHeader implements OnInit, OnDestroy {

  authenticatedUser: UserModel = <UserModel>{};
  private authenticatedUserSub: Subscription;
  @Output() public sidenavToggle = new EventEmitter();


  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.authenticatedUserSub = this.authService.getAuthenticatedUserListener()
      .subscribe((data: UserModel) => {
        this.authenticatedUser = data;
      });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  ngOnDestroy(): void {

  }


}
