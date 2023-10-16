import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SafeResourceUrl } from '@angular/platform-browser';

import { AboutIASKFModel } from "../../models/application-aboutizmiraskf.model";
import { AboutIASKFService } from "../../services/application-aboutiaskf.service";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-application-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['../../../app.component.css', './contact-us.component.css']
})
export class ApplicationContactUs implements OnInit, OnDestroy {
  toolbarTitle = "İLETİŞİM";
  isLoading: boolean = false;
  aboutcontent = <AboutIASKFModel>{};
  public aboutcontentSubscription: Subscription;

  public mapSafeSrc: SafeResourceUrl;
  contactUsForm: FormGroup;

  constructor(
    private aboutiaskfService: AboutIASKFService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.aboutiaskfService.getAboutContent();
    this.aboutcontentSubscription = this.aboutiaskfService.getAboutContentListener()
      .subscribe({
        next: (data: AboutIASKFModel) => {
          this.aboutcontent = data;
          this.mapSafeSrc = this.globalFunctions.getSafeResourceUrl(this.aboutcontent.mapUrl);
          this.isLoading = false;
        }
      });

    this.contactUsForm = new FormGroup({
      fullName: new FormControl(null, {validators: [Validators.required, Validators.maxLength(200)]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.maxLength(200)]}),
      messageContent: new FormControl(null, {validators: [Validators.required, Validators.maxLength(2000)]}),
    });

  }

  onSubmitContactForm() {
    if (this.contactUsForm.valid) {
      const contactUsForm = document.getElementById('submitContactForm') as HTMLFormElement;
      contactUsForm.submit();
      this.globalFunctions.showSnackBar('Mesajınız iletilmiştir!');
    } else {

    }
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  ngOnDestroy(): void {
    this.aboutcontentSubscription.unsubscribe();
  }

}
