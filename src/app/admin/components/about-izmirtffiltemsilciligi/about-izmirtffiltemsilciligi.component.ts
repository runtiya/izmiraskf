import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs";

import { AboutITFFModel } from "../../models/admin-aboutizmirtff.model";
import { AboutITFFService } from "../../services/admin-aboutitff.service";

import { globalFunctions } from "../../../functions/global.function";
import { imageUploadValidator } from "../../validators/image-upload.validator";

@Component({
  selector: 'app-admin-izmirtff',
  templateUrl: './about-izmirtffiltemsilciligi.component.html',
  styleUrls: ['../../../app.component.css', './about-izmirtffiltemsilciligi.component.css']
})
export class AdminIzmirTFFIlTemsilciligi implements OnInit, OnDestroy {
  toolbarTitle = "İZMİR TFF İL TEMSİLCİLİĞİ";
  isLoading: boolean = false;
  aboutITFFform: FormGroup;
  aboutcontent: AboutITFFModel;
  private aboutcontentSubscription: Subscription;

  latitude = 38.4377387;
  longitude = 27.1409411;
  zoom = 18;
  center: google.maps.LatLngLiteral = null;
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    public aboutitffService: AboutITFFService,
    private globalFunctions: globalFunctions
    ) {

    }

  ngOnInit() {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.aboutitffService.getAboutContent();
    this.aboutcontentSubscription = this.aboutitffService.getAboutContentListener()
      .subscribe((data: AboutITFFModel) => {
        this.aboutITFFform = new FormGroup({
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
          longitude: new FormControl(data.longitude, {validators: []}),
        });
        this.latitude = this.aboutITFFform.get('latitude').value;
        this.longitude = this.aboutITFFform.get('longitude').value;
        this.center = {lat: this.latitude, lng: this.longitude};
        this.isLoading = false;
      });
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.markerPositions = [];
      this.markerPositions.push(event.latLng.toJSON());

      this.aboutITFFform.get('latitude').setValue(event.latLng.lat());
      this.aboutITFFform.get('longitude').setValue(event.latLng.lng());
    }
  }

  onFilePicked(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files[0];
      this.aboutITFFform.patchValue({imageAttachment: file});
      this.aboutITFFform.get('imageAttachment').updateValueAndValidity();
      const reader = new FileReader();
      reader.onloadend = () => {
        let _imagePath = this.aboutITFFform.get('imageAttachment').valid ? reader.result as string : null;
        this.aboutITFFform.get('imagePath').setValue(_imagePath);
      };
      reader.readAsDataURL(file);
    } catch (error) {

    }

  }

  filePickerRemove() {
    this.aboutITFFform.get('imageAttachment').setValue(null);
    this.aboutITFFform.get('imagePath').setValue(null);
  }

  onUpdateAboutText() {
    if (this.aboutITFFform.valid) {
      this.aboutITFFform.get('updatedAt').setValue(this.globalFunctions.getTimeStamp());
      this.aboutitffService.updateAboutContent(this.aboutITFFform.value);
    } else {
      return null;
    }
  }

  ngOnDestroy(): void {
    this.aboutcontentSubscription.unsubscribe();
  }
}
