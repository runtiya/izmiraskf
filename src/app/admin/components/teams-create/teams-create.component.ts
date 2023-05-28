import { Dialog, DialogModule, DialogRef } from "@angular/cdk/dialog";
import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";
import { Subscription } from "rxjs";

import { TeamsService } from "../../services/admin-teams.service";
import { StadiumsService } from "../../services/admin-stadiums.service";
import { imageUploadValidator } from "../../validators/image-upload.validator";
import { townList } from "../../../assets/lists/town-list-izmir";

import { StadiumsModel } from "../../models/admin-stadiums.model";



@Component({
  selector: 'app-admin-teams-create',
  templateUrl: './teams-create.component.html',
  styleUrls: ['../../../app.component.css', './teams-create.component.css']
})

export class AdminTeamsCreateModal implements OnInit {
  isLoading = false;
  pageMode: string = this.data.pageMode || 'create';
  teamInfo = this.data.teamInfo;
  teamSubmitForm: FormGroup;
  imagePreview: string;
  townListArray = townList;
  stadiumsList: StadiumsModel[] = [];
  private stadiumListSub: Subscription;


  constructor(@Inject(MAT_DIALOG_DATA) public data: Data,
              public dialogRef: MatDialogRef<AdminTeamsCreateModal>,
              public teamService: TeamsService,
              public stadiumService: StadiumsService
            ) {}

  ngOnInit() {

    this.isLoading = true;
    this.stadiumService.getStadiums();
    this.stadiumListSub = this.stadiumService.getStadiumListUpdateListener()
      .subscribe((data: StadiumsModel[]) => {
        this.stadiumsList = data;

        this.teamSubmitForm = new FormGroup({
          id: new FormControl(this.pageMode == 'edit' ? this.teamInfo.id : null, {validators: []}),
          TFFClubCode: new FormControl(this.pageMode == 'edit' ? this.teamInfo.TFFClubCode : null, {validators: [Validators.maxLength(200)]}),
          officialName: new FormControl(this.pageMode == 'edit' ? this.teamInfo.officialName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
          shortName: new FormControl(this.pageMode == 'edit' ? this.teamInfo.shortName : null, {validators: [Validators.maxLength(200)]}),
          logoImage: new FormControl(this.pageMode == 'edit' ? this.teamInfo.logoImage : null, {validators: [], asyncValidators: [imageUploadValidator]}),
          city: new FormControl('IZMIR', {validators: [Validators.required, Validators.maxLength(200)]}),
          town: new FormControl(this.pageMode == 'edit' ? this.teamInfo.town : null, {validators: [Validators.required, Validators.maxLength(200)]}),
          address: new FormControl(this.pageMode == 'edit' ? this.teamInfo.address : null, {validators: [Validators.maxLength(2000)]}),
          longitude: new FormControl(this.pageMode == 'edit' ? this.teamInfo.longitude : null, {validators: []}),
          latitude: new FormControl(this.pageMode == 'edit' ? this.teamInfo.latitude : null, {validators: []}),
          phoneNumber: new FormControl(this.pageMode == 'edit' ? this.teamInfo.phoneNumber : null, {validators: [Validators.maxLength(200)]}),
          faxNumber: new FormControl(this.pageMode == 'edit' ? this.teamInfo.faxNumber : null, {validators: [Validators.maxLength(200)]}),
          stadiumId: new FormControl(this.pageMode == 'edit' ? this.teamInfo.stadiumId : null, {validators: [Validators.required]}),
          presidentName: new FormControl(this.pageMode == 'edit' ? this.teamInfo.presidentName : null, {validators: [Validators.maxLength(200)]}),
          colorCodes: new FormControl({value: this.pageMode == 'edit' ? this.teamInfo.colorCodes : '#FF0000;#FFFFFF', disabled: true},  {validators: [Validators.required]}),
          websiteURL: new FormControl(this.pageMode == 'edit' ? this.teamInfo.websiteURL : null, {validators: [Validators.maxLength(200)]}),
          isASKFMember: new FormControl(this.pageMode == 'edit' ? !!this.teamInfo.isMember : false, {validators: []}),
          isVisible: new FormControl(this.pageMode == 'edit' ? !!this.teamInfo.isVisible : true, {validators: []}),
        });

        this.isLoading = false;
      })

  }

  onDelete(id: number) {
    this.isLoading = true;
    this.teamService.deleteTeam(id);
    this.isLoading = false;

    this.dialogRef.close();
  }

  onFilePicked(event: Event) {

    try {

      const file = (event.target as HTMLInputElement).files[0];
      this.teamSubmitForm.patchValue({logoImage: file, fileName: 'test'});
      this.teamSubmitForm.get('logoImage').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }

  }

  onSubmitForm() {

    if (this.teamSubmitForm.valid) {
      this.isLoading = true;
      this.teamSubmitForm.get('colorCodes').enable();
      if (this.pageMode === "create") {
        this.teamService.createTeam(this.teamSubmitForm.value);
      }
      else {
        this.teamService.updateTeam(this.teamSubmitForm.value);
      }
      this.teamSubmitForm.get('colorCodes').disable();
      this.isLoading = false;

      this.dialogRef.close();
    }
    else {
      return null;
    }

  }

  onOfficialNameChange(event: any) {
    this.teamSubmitForm.get('shortName').setValue(event.target.value);
  }

  getColorCodeHex() {
    this.teamSubmitForm.get('colorCodes').enable();
    const color0 = (<HTMLInputElement>document.getElementById('colorCode0')).value.toUpperCase();
    const color1 = (<HTMLInputElement>document.getElementById('colorCode1')).value.toUpperCase();
    const colorCodes = color0 + ';' + color1;
    this.teamSubmitForm.get('colorCodes').setValue(colorCodes);
    this.teamSubmitForm.get('colorCodes').disable();
  }

}
