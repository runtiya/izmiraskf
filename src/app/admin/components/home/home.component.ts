import { Component, OnInit } from "@angular/core";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../app.component.css', './home.component.css']
})
export class AdminHome implements OnInit {
  toolbarTitle = "ANA SAYFA";

  constructor(
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
  }


}
