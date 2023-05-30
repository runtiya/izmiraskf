import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AboutITFFModel } from "../../models/application-aboutizmirtff.model";
import { AboutITFFService } from "../../services/application-aboutizmirtff.service";

import { GoogleMapsModel } from "../../../models/google-maps.model";

import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon-list";

@Component({
  selector: 'app-application-izmiraskf',
  templateUrl: './about-tffizmiriltemsilciligi.component.html',
  styleUrls: ['../../../app.component.css', './about-tffizmiriltemsilciligi.component.css']
})
export class ApplicationIzmirTFFIlTemsilciligi implements OnInit, OnDestroy {
  headerTitle = "İZMİR TFF İL TEMSİLCİLİĞİ";
  isLoading = false;
  //aboutcontent: AboutITFFModel;
  aboutcontent = <AboutITFFModel>{};
  private aboutcontentSubscription: Subscription;

  LatLngLiteral = <GoogleMapsModel>{};

  fontAwesomeIconList = fontAwesomeIconList;

  latitude = 38.4377387;
  longitude = 27.1409411;
  zoom = 15;

  center: google.maps.LatLngLiteral = {lat: this.latitude, lng: this.longitude};
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    public aboutitffService : AboutITFFService,
  ) {}

  ngOnInit(): void {
    this.aboutitffService.getAboutContent();

    this.aboutcontentSubscription = this.aboutitffService.getAboutContentListener()
      .subscribe({
        next: (data: AboutITFFModel) => {
          this.aboutcontent = data;

        },
        error: (error) => {

        }
      });

  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.markerPositions.push(event.latLng.toJSON());
    }
  }

  autoAdjustRows(): number {
    const textarea = document.getElementById('input-abouttext') as HTMLTextAreaElement;
    const lines = textarea.value.split('\n');
    //textarea.setAttribute('rows', String(lines.length * 3));

    return lines.length * 2;
  }

  ngOnDestroy(): void {

  }
}
