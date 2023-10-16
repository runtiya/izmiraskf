import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SafeResourceUrl } from '@angular/platform-browser';

import { AboutITFFModel } from "../../models/application-aboutizmirtff.model";
import { AboutITFFService } from "../../services/application-aboutizmirtff.service";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-application-izmirtff',
  templateUrl: './about-tffizmiriltemsilciligi.component.html',
  styleUrls: ['../../../app.component.css', './about-tffizmiriltemsilciligi.component.css']
})
export class ApplicationIzmirTFFIlTemsilciligi implements OnInit, OnDestroy {
  toolbarTitle = "İZMİR TFF İL TEMSİLCİLİĞİ";
  isLoading: boolean = false;
  aboutcontent = <AboutITFFModel>{};
  private aboutcontentSubscription: Subscription;
  public mapSafeSrc: SafeResourceUrl;

  constructor(
    public aboutitffService : AboutITFFService,
    private globalFunctions: globalFunctions,

  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.aboutitffService.getAboutContent();
    this.aboutcontentSubscription = this.aboutitffService.getAboutContentListener()
      .subscribe({
        next: (data: AboutITFFModel) => {
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
