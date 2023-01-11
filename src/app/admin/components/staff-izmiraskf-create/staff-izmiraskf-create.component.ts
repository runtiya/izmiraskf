import { Dialog, DialogModule, DialogRef } from "@angular/cdk/dialog";
import { Component, Inject, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ɵInjectableAnimationEngine } from "@angular/platform-browser/animations";
import { Data } from "@angular/router";

import { StaffIzmirAskfModel } from "../../models/admin-staffizmiraskf.model";
import { StaffIASKFService } from "../../services/admin/admin-staffiaskf.service";
import { imageUploadValidator } from "../../validators/image-upload.validator";


@Component({
  selector: 'app-admin-staffizmiraskf-create',
  templateUrl: './staff-izmiraskf-create.component.html',
  styleUrls: ['../../../app.component.css', './staff-izmiraskf-create.component.css']
})
export class CreateAdminStaffIzmirAskfModal {
  isLoading = false;
  pageMode: string = this.data.mode || 'create';
  staffIASKFSubmitForm: FormGroup;
  imagePreview: string;
  staffInfo = this.data.staffInfo;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, public dialogRef: MatDialogRef<CreateAdminStaffIzmirAskfModal>, public staffService: StaffIASKFService) {}

  ngOnInit() {

    this.staffIASKFSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.staffInfo.id : null, {validators: []}),
      title: new FormControl(this.pageMode == 'edit' ? this.staffInfo.title : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      name: new FormControl(this.pageMode == 'edit' ? this.staffInfo.name : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      phone: new FormControl(this.pageMode == 'edit' ? this.staffInfo.phone : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      email: new FormControl(this.pageMode == 'edit' ? this.staffInfo.email : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      profileImage: new FormControl(this.pageMode == 'edit' ? this.staffInfo.profileImage : null, {validators: [], asyncValidators: [imageUploadValidator]}),
      isVisible: new FormControl(this.pageMode == 'edit' ? this.staffInfo.isVisible : true, {validators: [Validators.required]}),
      order: new FormControl(this.pageMode == 'edit' ? this.staffInfo.order : 1, {validators: [Validators.required, Validators.maxLength(3), Validators.min(1), Validators.max(999)]})
    });

  }

  onFilePicked(event: Event) {
    try {

      const file = (event.target as HTMLInputElement).files[0];
      this.staffIASKFSubmitForm.patchValue({profileImage: file});
      this.staffIASKFSubmitForm.get('profileImage').updateValueAndValidity();
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

    if (this.staffIASKFSubmitForm.valid) {

      this.isLoading = true;
      if (this.pageMode === "create") {
        this.staffService.createStaff(this.staffIASKFSubmitForm.value);
      }
      else {
        this.staffService.updateStaff(this.staffIASKFSubmitForm.value);
      }
      this.isLoading = false;
      this.dialogRef.close();

    } else {
      null;
    }
  }

  onDelete(id: number) {

    this.isLoading = true;
    this.staffService.deleteStaff(id);
    this.isLoading = false;

    this.dialogRef.close();

  }


}
