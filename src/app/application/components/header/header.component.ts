import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../../../admin/authentication/auth.service";


@Component({
  selector: 'app-application-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class ApplicationHeaderComponent {

  @Output() public sidenavToggle = new EventEmitter();

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(){
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }


}
