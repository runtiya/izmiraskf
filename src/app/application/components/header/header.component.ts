import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../../../admin/authentication/auth.service";
import { GlobalIzmirASKFService } from "../../../services/global-izmiraskf.service";
import { ExternalLinksModel } from "../../models/application-externallinks.model";
import { ExternalLinksService } from "../../services/application-externallinks.service";

import { globalFunctions } from "../../../functions/global.function";
import { faBrandList } from "../../../assets/lists/font-awesome-brand.list";
import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon.list";
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
  fontAwesomeIconList = fontAwesomeIconList;
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

    this.externalLinksListSub = this.externalLinksService.getExternalLinksSubListener()
      .subscribe({
        next: (data: ExternalLinksModel[]) => {
          this.externalLinksList = data;
        },
        error: (error) => {

        }
      });

    this.logoPathSubscription = this.globalIzmirASKFService.getLogoPathUpdateListener()
      .subscribe({
        next: (data: string) => {
          this.logoPath = data;
        },
        error: (error) => {

        }
      });

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

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  ngOnDestroy(): void {
    this.externalLinksListSub.unsubscribe();
  }


}
