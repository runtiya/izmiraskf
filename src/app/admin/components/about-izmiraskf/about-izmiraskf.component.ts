import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AboutIASKFModel } from "../../models/admin-aboutizmiraskf.model";
import { AboutIASKFService } from "../../services/admin-aboutiaskf.service";

import { globalFunctions } from "../../../functions/global.function";
import { imageUploadValidator } from "../../validators/image-upload.validator";

@Component({
  selector: 'app-admin-izmiraskf',
  templateUrl: './about-izmiraskf.component.html',
  styleUrls: ['../../../app.component.css', './about-izmiraskf.component.css']
})
export class AdminIzmirASKF implements OnInit, OnDestroy {
  toolbarTitle = "İZMİR AMATÖR SPOR KULÜPLERİ FEDERASYONU";
  isLoading: boolean = false;
  aboutIASKFform: FormGroup;
  aboutcontent: AboutIASKFModel;
  private aboutcontentSubscription: Subscription;

  latitude = 38.4377387;
  longitude = 27.1409411;
  zoom = 18;
  center: google.maps.LatLngLiteral = null;
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    public aboutiaskfService : AboutIASKFService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.aboutiaskfService.getAboutContent();
    this.aboutcontentSubscription = this.aboutiaskfService.getAboutContentListener()
      .subscribe((data: AboutIASKFModel) => {
        this.aboutIASKFform = new FormGroup({
          updatedAt: new FormControl(data.updatedAt, {validators: []}),
          updatedBy: new FormControl(data.updatedBy, {validators: []}),
          imagePath: new FormControl(data.imagePath, {validators: []}),
          imageAttachment: new FormControl(null, {validators: [], asyncValidators: [imageUploadValidator]}),
          aboutText: new FormControl(data.aboutText, {validators: [Validators.maxLength(4000)]}),
          address: new FormControl(data.address, {validators: [Validators.maxLength(2000)]}),
          phoneNumber: new FormControl(data.phoneNumber, {validators: [Validators.maxLength(100)]}),
          faxNumber: new FormControl(data.faxNumber, {validators: [Validators.maxLength(100)]}),
          email: new FormControl(data.email, {validators: [Validators.maxLength(100)]}),
          latitude: new FormControl(data.latitude, {validators: []}),
          longitude: new FormControl(data.longitude, {validators: []})
        });
        this.latitude = this.aboutIASKFform.get('latitude').value;
        this.longitude = this.aboutIASKFform.get('longitude').value;
        this.center = {lat: this.latitude, lng: this.longitude};
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

  onFilePicked(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files[0];
      this.aboutIASKFform.patchValue({imageAttachment: file});
      this.aboutIASKFform.get('imageAttachment').updateValueAndValidity();
      const reader = new FileReader();
      reader.onloadend = () => {
        let _imagePath = this.aboutIASKFform.get('imageAttachment').valid ? reader.result as string : null;
        this.aboutIASKFform.get('imagePath').setValue(_imagePath);
      };
      reader.onload = () => {
        this.aboutIASKFform.get('imagePath').setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    } catch (error) {

    }

  }

  filePickerRemove() {
    this.aboutIASKFform.get('imageAttachment').setValue(null);
    this.aboutIASKFform.get('imagePath').setValue(null);
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  onUpdateAboutText() {
    if (this.aboutIASKFform.valid) {
      this.aboutiaskfService.updateAboutContent(this.aboutIASKFform.value);
    }
    else {
      return null;
    };

  }

  ngOnDestroy(): void {
    this.aboutcontentSubscription.unsubscribe();
  }
}
