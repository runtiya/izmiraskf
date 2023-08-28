import { Component, Inject, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";

import { StaffITFFService } from "../../services/admin-staffitff.service";
import { imageUploadValidator } from "../../validators/image-upload.validator";
import { globalFunctions } from "../../../functions/global.function";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-admin-staffizmirtff-create',
  templateUrl: './staff-izmirtff-create.component.html',
  styleUrls: ['../../../app.component.css', './staff-izmirtff-create.component.css']
})
export class AdminCreateStaffIzmirTFFModal {
  isLoading: boolean = false;
  pageMode: string = this.data.mode || 'create';
  staffITFFSubmitForm: FormGroup;
  imagePreview: string;
  staffInfo = this.data.staffInfo;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private dialogRef: MatDialogRef<AdminCreateStaffIzmirTFFModal>,
    private dialog: MatDialog,
    private staffService: StaffITFFService,
    private globalFunctions: globalFunctions
  ) {}


  ngOnInit() {

    this.staffITFFSubmitForm = new FormGroup({
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
      this.staffITFFSubmitForm.patchValue({imageAttachment: file});
      this.staffITFFSubmitForm.get('imageAttachment').updateValueAndValidity();
      const reader = new FileReader();
      reader.onloadend = () => {
        let _imagePath = this.staffITFFSubmitForm.get('imageAttachment').valid ? reader.result as string : null;
        this.staffITFFSubmitForm.get('imagePath').setValue(_imagePath);
      };
      reader.readAsDataURL(file);
    } catch (error) {

    }
  }

  filePickerRemove() {
    this.staffITFFSubmitForm.get('imageAttachment').setValue(null);
    this.staffITFFSubmitForm.get('imagePath').setValue(null);
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
