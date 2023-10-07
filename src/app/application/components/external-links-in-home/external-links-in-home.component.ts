import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { ExternalLinksModel } from "../../models/application-externallinks.model";
import { ExternalLinksService } from "../../services/application-externallinks.service";

import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-application-external-links-in-home',
  templateUrl: './external-links-in-home.component.html',
  styleUrls: ['../../../app.component.css', './external-links-in-home.component.css']
})
export class ApplicationExternalLinksInHome implements OnInit, OnDestroy {
  isLoading: boolean = false;
  extLinksRelatedLinks: ExternalLinksModel[] = [];
  extLinksSocialMediaLinks: ExternalLinksModel[] = [];
  private extLinksSubscription: Subscription;
  environment = environment;

  constructor(
    private externalLinksService: ExternalLinksService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.extLinksSubscription = this.externalLinksService.getExternalRelatedLinksUpdateListener()
      .subscribe({
        next: (data: ExternalLinksModel[]) => {
          this.extLinksRelatedLinks = data;
          this.extLinksRelatedLinks.map(l => {
            if (l.imagePath !== null) {
              l.imagePath = `${environment.serverUrl}${l.imagePath}`;
            }
          });
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.extLinksSubscription.unsubscribe();
  }
}

