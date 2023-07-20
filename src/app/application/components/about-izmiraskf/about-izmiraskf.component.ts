import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AboutIASKFModel } from "../../models/application-aboutizmiraskf.model";
import { AboutIASKFService } from "../../services/application-aboutiaskf.service";

import { globalFunctions } from "../../../functions/global.function";

import { GoogleMapsModel } from "../../../models/google-maps.model";

import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon.list";

@Component({
  selector: 'app-application-izmiraskf',
  templateUrl: './about-izmiraskf.component.html',
  styleUrls: ['../../../app.component.css', './about-izmiraskf.component.css']
})
export class ApplicationIzmirASKF implements OnInit, OnDestroy {
  toolbarTitle = "İZMİR AMATÖR SPOR KULÜPLERİ FEDERASYONU";
  isLoading: boolean = false;
  //aboutcontent: AboutIASKFModel;
  aboutcontent = <AboutIASKFModel>{};
  private aboutcontentSubscription: Subscription;

  LatLngLiteral = <GoogleMapsModel>{};

  fontAwesomeIconList = fontAwesomeIconList;

  latitude = 38.4377387;
  longitude = 27.1409411;
  zoom = 18;

  center: google.maps.LatLngLiteral = {lat: this.latitude, lng: this.longitude};
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    public aboutiaskfService : AboutIASKFService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.aboutiaskfService.getAboutContent();
    this.aboutcontentSubscription = this.aboutiaskfService.getAboutContentListener()
      .subscribe({
        next: (data: AboutIASKFModel) => {
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
    this.aboutcontentSubscription.unsubscribe();
  }
}
