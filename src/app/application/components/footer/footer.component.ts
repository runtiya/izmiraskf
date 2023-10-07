import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { GlobalIzmirASKFService } from "../../../services/global-izmiraskf.service";
import { ExternalLinksModel } from "../../models/application-externallinks.model";
import { ExternalLinksService } from "../../services/application-externallinks.service";

import { globalFunctions } from "../../../functions/global.function";
import { faBrandList } from "../../../assets/lists/font-awesome-brand.list";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-application-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../../../app.component.css', './footer.component.css']
})
export class ApplicationFooter implements OnInit, OnDestroy {
  isLoading: boolean = false;
  externalLinksList: ExternalLinksModel[] = [];
  private externalLinksListSub: Subscription;
  logoPath: string = null;
  private logoPathSubscription: Subscription;
  faBrandList = faBrandList;
  environment = environment;

  constructor(
    private externalLinksService: ExternalLinksService,
    private globalIzmirASKFService: GlobalIzmirASKFService,
    private globalFunctions: globalFunctions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.externalLinksListSub = this.externalLinksService.getExternalLinksUpdateListener()
      .subscribe({
        next: (data: ExternalLinksModel[]) => {
          this.externalLinksList = data;
        }
      });

    this.logoPathSubscription = this.globalIzmirASKFService.getLogoPathUpdateListener()
      .subscribe({
        next: (data: string) => {
          this.logoPath = `${environment.serverUrl}${data}`;
        }
      });
  }

  getFullYear(): string {
    return this.globalFunctions.getFullYear();
  }

  findIconFaIcon(_faBrand: string): IconDefinition {
    return faBrandList.find(b => b.name == _faBrand).faIcon;
  }

  findIconFaClass(_faBrand: string): string {
    return faBrandList.find(b => b.name == _faBrand).faClass
  }

  routeToURL(_url: string) {
    window.open(_url, '_blank')
  }

  onRouteHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.externalLinksListSub.unsubscribe();
  }
}
