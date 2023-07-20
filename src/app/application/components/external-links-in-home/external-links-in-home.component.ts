import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Router } from "@angular/router";

import { ExternalLinksModel } from "../../models/application-externallinks.model";
import { ExternalLinksService } from "../../services/application-externallinks.service";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-application-external-links-in-home',
  templateUrl: './external-links-in-home.component.html',
  styleUrls: ['../../../app.component.css', './external-links-in-home.component.css']
})
export class ApplicationExternalLinksInHome implements OnInit, OnDestroy {

  extLinksRelatedLinks: ExternalLinksModel[] = [];
  extLinksSocialMediaLinks: ExternalLinksModel[] = [];
  private extLinksSubscription: Subscription;

  constructor(
    private externalLinksService: ExternalLinksService,
    private globalFunctions: globalFunctions,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.extLinksSubscription = this.externalLinksService.getExternalRelatedLinksUpdateListener()
      .subscribe({
        next: (data: ExternalLinksModel[]) => {
          this.extLinksRelatedLinks = data;
        },
        error: (error) => {

        }
      });
  }

  ngOnDestroy(): void {

  }
}

