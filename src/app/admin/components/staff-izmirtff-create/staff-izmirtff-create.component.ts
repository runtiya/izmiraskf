import { Component, Inject, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";

import { StaffITFFModel } from "../../models/admin-staffizmirtff.model";
import { StaffITFFService } from "../../services/admin-staffitff.service";
import { imageUploadValidator } from "../../validators/image-upload.validator";


@Component({
  selector: 'app-admin-staffizmirtff-create',
  templateUrl: './staff-izmirtff-create.component.html',
  styleUrls: ['../../../app.component.css', './staff-izmirtff-create.component.css']
})
export class AdminCreateStaffIzmirTFFModal {
  isLoading = false;
  pageMode: string = this.data.mode || 'create';
  staffITFFSubmitForm: FormGroup;
  imagePreview: string;
  staffInfo = this.data.staffInfo;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, public dialogRef: MatDialogRef<AdminCreateStaffIzmirTFFModal>, public staffService: StaffITFFService) {}


  ngOnInit() {

    this.staffITFFSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.staffInfo.id : null, {validators: []}),
      title: new FormControl(this.pageMode == 'edit' ? this.staffInfo.title : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      fullName: new FormControl(this.pageMode == 'edit' ? this.staffInfo.fullName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      phone: new FormControl(this.pageMode == 'edit' ? this.staffInfo.phone : null, {validators: [Validators.maxLength(200)]}),
      email: new FormControl(this.pageMode == 'edit' ? this.staffInfo.email : null, {validators: [Validators.maxLength(200)]}),
      profileImage: new FormControl(this.pageMode == 'edit' ? this.staffInfo.profileImage : null, {validators: [], asyncValidators: [imageUploadValidator]}),
      isVisible: new FormControl(this.pageMode == 'edit' ? !!this.staffInfo.isVisible : true, {validators: [Validators.required]}),
      orderNo: new FormControl(this.pageMode == 'edit' ? this.staffInfo.orderNo : 1, {validators: [Validators.required, Validators.maxLength(3), Validators.min(1), Validators.max(999)]})
    });

  }

  onFilePicked(event: Event) {
    try {

      const file = (event.target as HTMLInputElement).files[0];
      this.staffITFFSubmitForm.patchValue({profileImage: file});
      this.staffITFFSubmitForm.get('profileImage').updateValueAndValidity();
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

    if (this.staffITFFSubmitForm.valid) {

      this.isLoading = true;
      if (this.pageMode === "create") {
        this.staffService.createStaff(this.staffITFFSubmitForm.value);
      }
      else {
        this.staffService.updateStaff(this.staffITFFSubmitForm.value);
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
