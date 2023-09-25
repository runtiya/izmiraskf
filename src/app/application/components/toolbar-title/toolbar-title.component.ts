import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-application-toolbar-title',
  templateUrl: './toolbar-title.component.html',
  styleUrls: ['../../../app.component.css', './toolbar-title.component.css'],

})
export class ApplicationToolbarTitle implements OnInit, OnDestroy {
  toolbarTitle: string = null;
  toolbarTitleSubscription: Subscription;

  constructor(
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {

    this.globalFunctions.getToolbarTitle
      .subscribe(_toolbarTitle => {
        setTimeout(()=> {
          this.toolbarTitle = _toolbarTitle;
        }, 0)

      });
  }

  ngOnDestroy(): void {
    this.toolbarTitle = null;
  }
}
