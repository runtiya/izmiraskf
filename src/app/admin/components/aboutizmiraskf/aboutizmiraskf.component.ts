import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AboutIASKFModel } from "../../models/admin-izmiraskf.model";
import { AboutIASKFService } from "../../services/admin/admin-aboutiaskf.service";


@Component({
  selector: 'app-admin-izmiraskf',
  templateUrl: './aboutizmiraskf.component.html',
  styleUrls: ['../../../app.component.css', './aboutizmiraskf.component.css']
})
export class AdminIzmirASKF implements OnInit, OnDestroy {
  headerTitle = 'İZMİR AMATÖR SPOR KULÜPLERİ FEDERASYONU';
  isLoading = false;
  aboutIASKFform: FormGroup;
  aboutcontent: AboutIASKFModel;
  private aboutcontentSubscription: Subscription;

  constructor(public aboutiaskfService : AboutIASKFService) {}


  ngOnInit() {
    this.isLoading = true;
    this.aboutiaskfService.getAboutContent();
    this.aboutcontentSubscription = this.aboutiaskfService.getAboutContentListener()
      .subscribe((data: AboutIASKFModel) => {
        this.aboutIASKFform = new FormGroup({
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

    if (this.aboutIASKFform.valid) {

      this.isLoading = true;
      this.aboutiaskfService.updateAboutContent(this.aboutIASKFform.value);
      this.isLoading = false;
    }
    else {
      return null;
    };

  }

  ngOnDestroy(): void {
    this.aboutcontentSubscription.unsubscribe();
  }
}
