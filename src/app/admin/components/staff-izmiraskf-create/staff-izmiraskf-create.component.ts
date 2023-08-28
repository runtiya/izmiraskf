import { Dialog, DialogModule, DialogRef } from "@angular/cdk/dialog";
import { Component, Inject, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ɵInjectableAnimationEngine } from "@angular/platform-browser/animations";
import { Data } from "@angular/router";

import { StaffIzmirAskfModel } from "../../models/admin-staffizmiraskf.model";
import { StaffIASKFService } from "../../services/admin-staffiaskf.service";
import { imageUploadValidator } from "../../validators/image-upload.validator";
import { globalFunctions } from "../../../functions/global.function";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-admin-staffizmiraskf-create',
  templateUrl: './staff-izmiraskf-create.component.html',
  styleUrls: ['../../../app.component.css', './staff-izmiraskf-create.component.css']
})
export class AdminCreateStaffIzmirAskfModal {
  isLoading: boolean = false;
  pageMode: string = this.data.mode || 'create';
  staffIASKFSubmitForm: FormGroup;
  staffInfo = this.data.staffInfo;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private dialogRef: MatDialogRef<AdminCreateStaffIzmirAskfModal>,
    private dialog: MatDialog,
    private staffService: StaffIASKFService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit() {

    this.staffIASKFSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.staffInfo.id : null, {validators: []}),
      createdAt: new FormControl(this.pageMode == 'edit' ? this.staffInfo.createdAt : null, {validators: []}),
      createdBy: new FormControl(this.pageMode == 'edit' ? this.staffInfo.createdBy : null, {validators: []}),
      updatedAt: new FormControl(this.pageMode == 'edit' ? this.staffInfo.updatedAt : null, {validators: []}),
      updatedBy: new FormControl(this.pageMode == 'edit' ? this.staffInfo.updatedBy : null, {validators: []}),
      title: new FormControl(this.pageMode == 'edit' ? this.staffInfo.title : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      fullName: new FormControl(this.pageMode == 'edit' ? this.staffInfo.fullName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      phone: new FormControl(this.pageMode == 'edit' ? this.staffInfo.phone : null, {validators: [Validators.maxLength(200)]}),
      email: new FormControl(this.pageMode == 'edit' ? this.staffInfo.email : null, {validators: [Validators.maxLength(200)]}),
      imagePath: new FormControl(this.pageMode == 'edit' ? this.staffInfo.imagePath : null, {validators: []}),
      imageAttachment: new FormControl(null, {validators: [], asyncValidators: [imageUploadValidator]}),
      isVisible: new FormControl(this.pageMode == 'edit' ? !!this.staffInfo.isVisible : true, {validators: [Validators.required]}),
      orderNo: new FormControl(this.pageMode == 'edit' ? this.staffInfo.orderNo : 1, {validators: [Validators.required, Validators.maxLength(3), Validators.min(1), Validators.max(999)]})
    });

  }

  onFilePicked(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files[0];
      this.staffIASKFSubmitForm.patchValue({imageAttachment: file});
      this.staffIASKFSubmitForm.get('imageAttachment').updateValueAndValidity();
      const reader = new FileReader();
      reader.onloadend = () => {
        let _imagePath = this.staffIASKFSubmitForm.get('imageAttachment').valid ? reader.result as string : null;
        this.staffIASKFSubmitForm.get('imagePath').setValue(_imagePath);
      };
      reader.readAsDataURL(file);
    } catch (error) {

    }
  }

  filePickerRemove() {
    this.staffIASKFSubmitForm.get('imageAttachment').setValue(null);
    this.staffIASKFSubmitForm.get('imagePath').setValue(null);
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
            this.staffService.deleteStaff(id);
            this.dialogRef.close();
          }
        }
      });
  }

}
