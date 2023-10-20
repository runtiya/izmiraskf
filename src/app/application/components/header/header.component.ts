import { Component, EventEmitter, Output, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../../../admin/authentication/auth.service";
import { GlobalIzmirASKFService } from "../../../services/global-izmiraskf.service";
import { ExternalLinksModel } from "../../models/application-externallinks.model";
import { ExternalLinksService } from "../../services/application-externallinks.service";

import { globalFunctions } from "../../../functions/global.function";
import { faBrandList } from "../../../assets/lists/font-awesome-brand.list";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-application-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../app.component.css', './header.component.css']
})
export class ApplicationHeader implements OnInit, OnDestroy {
  externalLinksList: ExternalLinksModel[] = [];
  private externalLinksListSub: Subscription;
  faBrandList = faBrandList;

  @Output() public sidenavToggle = new EventEmitter();
  logoPath: string = null;
  private logoPathSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private globalIzmirASKFService: GlobalIzmirASKFService,
    private externalLinksService: ExternalLinksService,
    private globalFunctions: globalFunctions
  ){}

  ngOnInit(): void {
    this.externalLinksService.getLinks('SOCIALMEDIA');
    this.externalLinksListSub = this.externalLinksService.getExternalLinksUpdateListener()
      .subscribe({
        next: (data: ExternalLinksModel[]) => {
          this.externalLinksList = data.length > 0 ? data.sort((a, b) => {return a.orderNo - b.orderNo}) : [];
        }
      });


    this.globalIzmirASKFService.getLogoPath();
    this.logoPathSubscription = this.globalIzmirASKFService.getLogoPathUpdateListener()
      .subscribe({
        next: (data: string) => {
          this.logoPath = data;
        }
      });

  }

  findIconFaIcon(_faBrand: string): IconDefinition {
    return this.faBrandList.find(b => b.name == _faBrand).faIcon;
  }

  findIconFaClass(_faBrand: string): string {
    return this.faBrandList.find(b => b.name == _faBrand).faClass
  }

  routeToURL(_url: string) {
    window.open(_url, '_blank')
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  ngOnDestroy(): void {
    this.logoPathSubscription.unsubscribe();
    this.externalLinksListSub.unsubscribe();
  }
}
