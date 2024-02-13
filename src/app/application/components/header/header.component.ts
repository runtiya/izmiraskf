import { Component, EventEmitter, Output, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { GlobalIzmirASKFService } from "../../../services/global-izmiraskf.service";
import { GlobalITFFService } from "../../../services/global-tffizmiriltemsilciligi.service";
import { ExternalLinksModel } from "../../models/application-externallinks.model";
import { ExternalLinksService } from "../../services/application-externallinks.service";

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
  izmirAskfLogoPath: string = null;
  private izmirAskfLogoPathSubscription: Subscription;
  tffizmirLogoPath: string = null;
  private tffIzmirLogoPathSubscription: Subscription;

  constructor(
    private globalIzmirASKFService: GlobalIzmirASKFService,
    private globalITFFService: GlobalITFFService,
    private externalLinksService: ExternalLinksService,
  ){}

  ngOnInit(): void {
    this.externalLinksService.getLinks('SOCIALMEDIA');
    this.externalLinksListSub = this.externalLinksService.getExternalLinksUpdateListener()
      .subscribe({
        next: (data: ExternalLinksModel[]) => {
          this.externalLinksList = data.length > 0 ? data.sort((a, b) => {return a.orderNo - b.orderNo}) : [];
        }
      });

    /*
    this.globalIzmirASKFService.getLogoPath();
    this.izmirAskfLogoPathSubscription = this.globalIzmirASKFService.getLogoPathUpdateListener()
      .subscribe({
        next: (data: string) => {
          this.izmirAskfLogoPath = data;
        }
      });

    this.globalITFFService.getLogoPath();
    this.tffIzmirLogoPathSubscription = this.globalITFFService.getLogoPathUpdateListener()
      .subscribe({
        next: (data: string) => {
          this.tffizmirLogoPath = data;
        }
      });
    */
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
    this.izmirAskfLogoPathSubscription.unsubscribe();
    this.tffIzmirLogoPathSubscription.unsubscribe();
    this.externalLinksListSub.unsubscribe();
  }
}
