import { Dialog, DialogModule, DialogRef } from "@angular/cdk/dialog";
import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";
import { Subscription } from "rxjs";
import { SafeResourceUrl } from '@angular/platform-browser';

import { TeamsService } from "../../services/admin-teams.service";
import { StadiumsModel } from "../../models/admin-stadiums.model";
import { StadiumsService } from "../../services/admin-stadiums.service";

import { imageUploadValidator } from "../../validators/image-upload.validator";
import { townList } from "../../../assets/lists/town-izmir.list";
import { globalFunctions } from "../../../functions/global.function";

import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";


@Component({
  selector: 'app-admin-teams-create',
  templateUrl: './teams-create.component.html',
  styleUrls: ['../../../app.component.css', './teams-create.component.css']
})
export class AdminTeamsCreateModal implements OnInit {
  isLoading: boolean = false;
  pageMode: string = this.data.pageMode || 'create';
  teamInfo = this.data.teamInfo;
  teamSubmitForm: FormGroup;
  townListArray = townList;
  stadiumsList: StadiumsModel[] = [];
  private stadiumListSub: Subscription;

  private mapSafeSrc: SafeResourceUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private dialogRef: MatDialogRef<AdminTeamsCreateModal>,
    private dialog: MatDialog,
    public teamService: TeamsService,
    public stadiumService: StadiumsService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.stadiumService.getStadiums();
    this.stadiumListSub = this.stadiumService.getStadiumListUpdateListener()
      .subscribe({
        next: (data: {stadiumsList: StadiumsModel[], stadiumsCount: number}) => {
          this.stadiumsList = data.stadiumsList;
          this.teamSubmitForm = new FormGroup({
            id: new FormControl(this.pageMode == 'edit' ? this.teamInfo.id : null, {validators: []}),
            createdAt: new FormControl(this.pageMode == 'edit' ? this.teamInfo.createdAt : null, {validators: []}),
            createdBy: new FormControl(this.pageMode == 'edit' ? this.teamInfo.createdBy : null, {validators: []}),
            updatedAt: new FormControl(this.pageMode == 'edit' ? this.teamInfo.updatedAt : null, {validators: []}),
            updatedBy: new FormControl(this.pageMode == 'edit' ? this.teamInfo.updatedBy : null, {validators: []}),
            TFFClubCode: new FormControl(this.pageMode == 'edit' ? this.teamInfo.TFFClubCode : null, {validators: [Validators.maxLength(200)]}),
            officialName: new FormControl(this.pageMode == 'edit' ? this.teamInfo.officialName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
            shortName: new FormControl(this.pageMode == 'edit' ? this.teamInfo.shortName : null, {validators: [Validators.maxLength(200)]}),
            imagePath: new FormControl(this.pageMode == 'edit' ? this.teamInfo.imagePath : null, {validators: []}),
            imageAttachment: new FormControl(null, {validators: [], asyncValidators: [imageUploadValidator]}),
            city: new FormControl('IZMIR', {validators: [Validators.required, Validators.maxLength(200)]}),
            town: new FormControl(this.pageMode == 'edit' ? this.teamInfo.town : null, {validators: [Validators.required, Validators.maxLength(200)]}),
            address: new FormControl(this.pageMode == 'edit' ? this.teamInfo.address : null, {validators: [Validators.maxLength(2000)]}),
            phoneNumber: new FormControl(this.pageMode == 'edit' ? this.teamInfo.phoneNumber : null, {validators: [Validators.maxLength(200)]}),
            faxNumber: new FormControl(this.pageMode == 'edit' ? this.teamInfo.faxNumber : null, {validators: [Validators.maxLength(200)]}),
            stadiumId: new FormControl(this.pageMode == 'edit' ? this.teamInfo.stadiumId : null, {validators: [Validators.required]}),
            presidentName: new FormControl(this.pageMode == 'edit' ? this.teamInfo.presidentName : null, {validators: [Validators.maxLength(200)]}),
            colorCodes: new FormControl({value: this.pageMode == 'edit' ? this.teamInfo.colorCodes : '#FF0000;#FFFFFF', disabled: true},  {validators: [Validators.required]}),
            websiteURL: new FormControl(this.pageMode == 'edit' ? this.teamInfo.websiteURL : null, {validators: [Validators.maxLength(200)]}),
            isASKFMember: new FormControl(this.pageMode == 'edit' ? !!this.teamInfo.isASKFMember : false, {validators: []}),
            isVisible: new FormControl(this.pageMode == 'edit' ? !!this.teamInfo.isVisible : true, {validators: []}),
            longitude: new FormControl(this.pageMode == 'edit' ? this.teamInfo.longitude : null, {validators: []}),
            latitude: new FormControl(this.pageMode == 'edit' ? this.teamInfo.latitude : null, {validators: []}),
            mapUrl: new FormControl(this.pageMode == 'edit' ? this.teamInfo.mapUrl : null, {validators: [Validators.maxLength(4000)]})
          });
          this.mapSafeSrc = this.globalFunctions.getSafeResourceUrl(this.teamInfo.mapUrl);
          this.isLoading = false;
          }
      });

  }

  onMapSrcChange(url: string) {
    this.mapSafeSrc = this.globalFunctions.getSafeResourceUrl(url);
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(AdminConfirmationDialogModal, {
      data: {
        title: 'İŞLEMİ ONAYLIYOR MUSUNUZ?',
        message: 'Bu işlem verilerinizi kalıcı olarak silecektir, işleminizi onaylıyor musunuz?'
      }
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.teamService.deleteTeam(id);
            this.dialogRef.close();
          }
        }
      });

  }

  onFilePicked(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files[0];
      this.teamSubmitForm.patchValue({imageAttachment: file});
      this.teamSubmitForm.get('imageAttachment').updateValueAndValidity();
      const reader = new FileReader();
      reader.onloadend = () => {
        let _imagePath = this.teamSubmitForm.get('imageAttachment').valid ? reader.result as string : null;
        this.teamSubmitForm.get('imagePath').setValue(_imagePath);
      };
      reader.readAsDataURL(file);
    } catch (error) {

    }
  }

  filePickerRemove() {
    this.teamSubmitForm.get('imageAttachment').setValue(null);
    this.teamSubmitForm.get('imagePath').setValue(null);
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

  onSubmitForm() {

    if (this.teamSubmitForm.valid) {
      this.isLoading = true;
      this.teamSubmitForm.get('colorCodes').enable();
      alert(this.teamSubmitForm.get('createdAt').value)
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

}
