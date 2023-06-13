import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AuthService } from "../../../admin/authentication/auth.service";
import { ExternalLinksModel } from "../../models/application-externallinks.model";
import { ExternalLinksService } from "../../services/application-externallinks.service";

import { globalFunctions } from "../../../functions/global.function";
import { faBrandList } from "../../../assets/lists/font-awesome-brand-list";
import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon-list";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";


@Component({
  selector: 'app-application-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../../../app.component.css', './footer.component.css']
})
export class ApplicationFooter implements OnInit, OnDestroy {
  externalLinksList: ExternalLinksModel[] = [];
  private externalLinksListSub: Subscription;
  faBrandList = faBrandList;
  fontAwesomeIconList = fontAwesomeIconList;

  constructor(
    private externalLinksService: ExternalLinksService,
    private router: Router,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.externalLinksListSub = this.externalLinksService.getExternalLinksSubListener()
      .subscribe({
        next: (data: ExternalLinksModel[]) => {
          this.externalLinksList = data;
        },
        error: (error) => {

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

  ngOnDestroy(): void {

  }
}
