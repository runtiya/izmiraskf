import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";
import { SafeResourceUrl } from '@angular/platform-browser';

import { StadiumsService } from "../../services/admin-stadiums.service";

import { townList } from "../../../assets/lists/town-izmir.list";
import { floorTypeList } from "../../../assets/lists/floor-type.list";
import { imageUploadValidator } from "../../validators/image-upload.validator";
import { globalFunctions } from "../../../functions/global.function";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-admin-stadiums-update-modal',
  templateUrl: './stadiums-create.component.html',
  styleUrls: ['../../../app.component.css', './stadiums-create.component.css']
})
export class AdminStadiumsCreateModal {
  isLoading: boolean = false;
  stadiumsCreateForm: FormGroup;
  pageMode : string = this.data.pageMode || 'create';
  stadiumInfo = this.data.stadiumInfo;
  townListArray = townList;
  floorTypeListArray = floorTypeList;

  private mapSafeSrc: SafeResourceUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Data,
    private dialogRef: MatDialogRef<AdminStadiumsCreateModal>,
    private dialog: MatDialog,
    private stadiumService: StadiumsService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.stadiumsCreateForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.id : null, {validators: []}),
      createdAt: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.createdAt : null, {validators: []}),
      createdBy: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.createdBy : null, {validators: []}),
      updatedAt: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.updatedAt : null, {validators: []}),
      updatedBy: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.updatedBy : null, {validators: []}),
      stadiumName: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.stadiumName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      city: new FormControl('IZMIR', {validators: [Validators.required, Validators.maxLength(200)]}),
      town: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.town : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      address: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.address : null, {validators: [Validators.maxLength(2000)]}),
      phoneNumber: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.phoneNumber : null, {validators: [Validators.maxLength(200)]}),
      imagePath: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.imagePath : null, {validators: []}),
      imageAttachment: new FormControl(null, {validators: [], asyncValidators: [imageUploadValidator]}),
      audienceCapacity: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.audienceCapacity : null, {validators: [Validators.min(0), Validators.max(99999)]}),
      sizeLength: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.sizeLength : null, {validators: [Validators.min(0), Validators.max(999)]}),
      sizeWidth: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.sizeWidth : null, {validators: [Validators.min(0), Validators.max(999)]}),
      floorType: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.floorType : null, {validators: [Validators.maxLength(200)]}),
      hasLightning: new FormControl(this.pageMode == 'edit' ? ((this.stadiumInfo.hasLightning != null) ? !!this.stadiumInfo.hasLightning : null) : null, {validators: []}),
      hasSeating: new FormControl(this.pageMode == 'edit' ? ((this.stadiumInfo.hasSeating != null) ? !!this.stadiumInfo.hasSeating : null) : null, {validators: []}),
      hasDisabledTribune: new FormControl(this.pageMode == 'edit' ? ((this.stadiumInfo.hasDisabledTribune != null) ? !!this.stadiumInfo.hasDisabledTribune : null) : null, {validators: []}),
      hasClosedCircuitCameraSystem: new FormControl(this.pageMode == 'edit' ? ((this.stadiumInfo.hasClosedCircuitCameraSystem != null) ? !!this.stadiumInfo.hasClosedCircuitCameraSystem : null) : null, {validators: []}),
      longitude: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.longitude : null, {validators: []}),
      latitude: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.latitude : null, {validators: []}),
      mapUrl: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.mapUrl : null, {validators: [Validators.maxLength(4000)]})
    });

    this.mapSafeSrc = this.pageMode == 'create' ? null : this.globalFunctions.getSafeResourceUrl(this.stadiumInfo.mapUrl);
    this.isLoading = false;
  }

  onMapSrcChange(url: string) {
    this.mapSafeSrc = this.globalFunctions.getSafeResourceUrl(url);
  }

  onFilePicked(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files[0];
      this.stadiumsCreateForm.patchValue({imageAttachment: file});
      this.stadiumsCreateForm.get('imageAttachment').updateValueAndValidity();
      const reader = new FileReader();
      reader.onloadend = () => {
        let _imagePath = this.stadiumsCreateForm.get('imageAttachment').valid ? reader.result as string : null;
        this.stadiumsCreateForm.get('imagePath').setValue(_imagePath);
      };
      reader.readAsDataURL(file);
    } catch (error) {

    }
  }

  filePickerRemove() {
    this.stadiumsCreateForm.get('imageAttachment').setValue(null);
    this.stadiumsCreateForm.get('imagePath').setValue(null);
  }

  onSubmitForm() {
    if (this.stadiumsCreateForm.valid) {
      this.isLoading = true;
      if (this.pageMode === "create") {
        this.stadiumService.createStadium(this.stadiumsCreateForm.value);
      }
      else {
        this.stadiumService.updateStadium(this.stadiumsCreateForm.value);
      }
      this.isLoading = false;
      this.dialogRef.close();
    }
    else {
      return null;
    }
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
            this.stadiumService.deleteStadium(id);
            this.dialogRef.close();
          }
        }
      });
  }

}
