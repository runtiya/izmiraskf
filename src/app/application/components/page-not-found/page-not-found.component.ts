import { Component, OnInit } from '@angular/core';

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-admin-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['../../../app.component.css', './page-not-found.component.css']
})
export class PageNotFound implements OnInit {
  toolbarTitle = "404 - SAYFA BULUNAMADI!";

  constructor(
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
  }
}
