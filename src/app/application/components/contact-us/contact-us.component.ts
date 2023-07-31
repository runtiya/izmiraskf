import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AboutIASKFModel } from "../../models/application-aboutizmiraskf.model";
import { AboutIASKFService } from "../../services/application-aboutiaskf.service";

import { globalFunctions } from "../../../functions/global.function";

import { GoogleMapsModel } from "../../../models/google-maps.model";

import { fontAwesomeIconList } from "../../../assets/lists/font-awesome-icon.list";


@Component({
  selector: 'app-application-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['../../../app.component.css', './contact-us.component.css']
})
export class ApplicationContactUs implements OnInit, OnDestroy {
  toolbarTitle = "İLETİŞİM";
  aboutcontent = <AboutIASKFModel>{};
  private aboutcontentSubscription: Subscription;
  fontAwesomeIconList = fontAwesomeIconList;
  LatLngLiteral = <GoogleMapsModel>{};
  latitude = 38.4377387;
  longitude = 27.1409411;
  zoom = 18;
  center: google.maps.LatLngLiteral = {lat: this.latitude, lng: this.longitude};
  markerPositions: google.maps.LatLngLiteral[] = [];
  contactUsForm: FormGroup;

  constructor(
    private aboutiaskfService: AboutIASKFService,
    private globalFunctions: globalFunctions,
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

    this.contactUsForm = new FormGroup({
      fullName: new FormControl(null, {validators: [Validators.required, Validators.maxLength(200)]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.maxLength(200)]}),
      messageContent: new FormControl(null, {validators: [Validators.required, Validators.maxLength(2000)]}),
    })

  }

  onSubmitContactForm() {
    if (this.contactUsForm.valid) {
      const contactUsForm = document.getElementById('submitContactForm') as HTMLFormElement;
      contactUsForm.submit();
      this.globalFunctions.showSnackBar('Mesajınız iletilmiştir!');
    } else {

    }
  }

  ngOnDestroy(): void {
    this.aboutcontentSubscription.unsubscribe();
  }

}
