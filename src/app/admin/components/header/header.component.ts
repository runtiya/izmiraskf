import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../../authentication/auth.service";


@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AdminHeader implements OnInit, OnDestroy {

  @Output() public sidenavToggle = new EventEmitter();



  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {

  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  ngOnDestroy(): void {

  }


}
