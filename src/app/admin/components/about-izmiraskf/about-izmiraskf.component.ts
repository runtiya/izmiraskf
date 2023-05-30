import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AboutIASKFModel } from "../../models/admin-aboutizmiraskf.model";
import { AboutIASKFService } from "../../services/admin-aboutiaskf.service";


@Component({
  selector: 'app-admin-izmiraskf',
  templateUrl: './about-izmiraskf.component.html',
  styleUrls: ['../../../app.component.css', './about-izmiraskf.component.css']
})
export class AdminIzmirASKF implements OnInit, OnDestroy {
  headerTitle = 'İZMİR AMATÖR SPOR KULÜPLERİ FEDERASYONU';
  isLoading = false;
  aboutIASKFform: FormGroup;
  aboutcontent: AboutIASKFModel;
  private aboutcontentSubscription: Subscription;

  latitude = 38.4377387;
  longitude = 27.1409411;
  zoom = 15;
  center: google.maps.LatLngLiteral = {lat: this.latitude, lng: this.longitude};
  markerPositions: google.maps.LatLngLiteral[] = [];

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
          latitude: new FormControl(data.latitude, {validators: []}),
          longitude: new FormControl(data.longitude, {validators: []})
        });
        this.isLoading = false;
      });
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.markerPositions = [];
      this.markerPositions.push(event.latLng.toJSON());

      this.aboutIASKFform.get('latitude').setValue(event.latLng.lat());
      this.aboutIASKFform.get('longitude').setValue(event.latLng.lng());
    }
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
