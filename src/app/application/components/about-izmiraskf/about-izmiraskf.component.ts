import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SafeResourceUrl } from '@angular/platform-browser';

import { AboutIASKFModel } from "../../models/application-aboutizmiraskf.model";
import { AboutIASKFService } from "../../services/application-aboutiaskf.service";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-application-izmiraskf',
  templateUrl: './about-izmiraskf.component.html',
  styleUrls: ['../../../app.component.css', './about-izmiraskf.component.css']
})
export class ApplicationIzmirASKF implements OnInit, OnDestroy {
  toolbarTitle = "İZMİR AMATÖR SPOR KULÜPLERİ FEDERASYONU";
  isLoading: boolean = false;
  aboutcontent = <AboutIASKFModel>{};
  private aboutcontentSubscription: Subscription;
  public mapSafeSrc: SafeResourceUrl;

  constructor(
    public aboutiaskfService : AboutIASKFService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.aboutiaskfService.getAboutContent();
    this.aboutcontentSubscription = this.aboutiaskfService.getAboutContentListener()
      .subscribe({
        next: (data: AboutIASKFModel) => {
          this.aboutcontent = data;
          this.mapSafeSrc = this.globalFunctions.getSafeResourceUrl(this.aboutcontent.mapUrl);
          this.isLoading = false;
        }
      });
  }

  autoAdjustRows(): number {
    const textarea = document.getElementById('input-abouttext') as HTMLTextAreaElement;
    const lines = textarea.value.split('\n');

    return lines.length * 2;
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  ngOnDestroy(): void {
    this.aboutcontentSubscription.unsubscribe();
  }
}
