import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs";

import { AboutITFFModel } from "../../models/admin-izmirtff.model";
import { AboutITFFService } from "../../services/admin-aboutitff.service";

@Component({
  selector: 'app-admin-izmirtff',
  templateUrl: './about-izmirtffiltemsilciligi.component.html',
  styleUrls: ['../../../app.component.css', './about-izmirtffiltemsilciligi.component.css']
})
export class AdminIzmirTFFIlTemsilciligi implements OnInit, OnDestroy {
  headerTitle = 'İZMİR TFF İL TEMSİLCİLİĞİ';
  isLoading = false;
  aboutITFFform: FormGroup;
  aboutcontent: AboutITFFModel;
  private aboutcontentSubscription: Subscription;

  constructor(public aboutitffService: AboutITFFService) {}

  ngOnInit() {
    this.isLoading = true;
    this.aboutitffService.getAboutContent();
    this.aboutcontentSubscription = this.aboutitffService.getAboutContentListener()
      .subscribe((data: AboutITFFModel) => {
        this.aboutITFFform = new FormGroup({
          aboutText: new FormControl(data.aboutText, {validators: [Validators.maxLength(4000)]}),
          address: new FormControl(data.address, {validators: [Validators.maxLength(2000)]}),
          phoneNumber: new FormControl(data.phoneNumber, {validators: [Validators.maxLength(100)]}),
          faxNumber: new FormControl(data.faxNumber, {validators: [Validators.maxLength(100)]}),
          email: new FormControl(data.email, {validators: [Validators.maxLength(100)]}),
          longitude: new FormControl(data.longitude, {validators: []}),
          latitude: new FormControl(data.latitude, {validators: []}),
        });
        this.isLoading = false;
      });
  }

  onUpdateAboutText() {
    if (this.aboutITFFform.valid) {

      this.isLoading = true;
      this.aboutitffService.updateAboutContent(this.aboutITFFform.value);
      this.isLoading = false;
    } else {
      return null;
    }
  }

  ngOnDestroy(): void {
    this.aboutcontentSubscription.unsubscribe();
  }
}
