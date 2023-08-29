import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AboutIASKFModel } from "../../models/admin-aboutizmiraskf.model";
import { AboutIASKFService } from "../../services/admin-aboutiaskf.service";

import { globalFunctions } from "../../../functions/global.function";
import { imageUploadValidator } from "../../validators/image-upload.validator";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  private mapSafeSrc: SafeResourceUrl;

  constructor(
    public aboutiaskfService : AboutIASKFService,
    private globalFunctions: globalFunctions,
    private sanitizer: DomSanitizer
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
          longitude: new FormControl(data.longitude, {validators: []}),
          mapUrl: new FormControl(data.mapUrl, {validators: [Validators.maxLength(4000)]})
        });
        this.isLoading = false;
        // this.mapSafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aboutIASKFform.get('mapUrl').value);
        this.mapSafeSrc = this.globalFunctions.getSafeResourceUrl(data.mapUrl);
      });
      
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
    //console.log(this.aboutIASKFform.get('mapUrl'));

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





  