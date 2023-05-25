import { Component, OnInit, OnDestroy, ViewChild, Input } from "@angular/core";
import { AuthService } from "../../authentication/auth.service";

@Component({
  selector: 'app-admin-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['../../../app.component.css', './logout.component.css']
})
export class AdminLogout implements OnInit {
  isLoading = false;

  constructor(
    public authService: AuthService
  ){}

  ngOnInit(): void {
    this.authService.logout();
  }
}
