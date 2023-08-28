import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";

import { ExternalLinksModel } from "../../models/admin-externallinks.model";
import { ExternalLinksService } from "../../services/admin-externallinks.service";
import { imageUploadValidator } from "../../validators/image-upload.validator";
import { faBrandList } from "../../../assets/lists/font-awesome-brand.list";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";


@Component({
  selector: 'app-admin-external-links-create',
  templateUrl: './external-links-create.component.html',
  styleUrls: ['../../../app.component.css', './external-links-create.component.css']
})
export class AdminExternalLinksCreateModal implements OnInit {
  isLoading: boolean = false;
  pageMode: string = this.data.pageMode || 'create';
  linkType: string = this.data.linkType || 'RELATEDLINK';
  linkInfo = this.data.linkInfo;
  imagePreview: string;
  extLinkSubmitForm: FormGroup;
  faBrandList = faBrandList;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Data,
    private dialogRef: MatDialogRef<AdminExternalLinksCreateModal>,
    private dialog: MatDialog,
    private extLinkService: ExternalLinksService
  ) {}

  ngOnInit(): void {

    this.extLinkSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.linkInfo.id : null, {validators: []}),
      linkName: new FormControl(this.pageMode == 'edit' ? this.linkInfo.linkName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      url: new FormControl(this.pageMode == 'edit' ? this.linkInfo.url : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      linkType: new FormControl(this.pageMode == 'edit' ? this.linkInfo.linkType : this.linkType, {validators: []}),
      imagePath: new FormControl(this.pageMode == 'edit' ? this.linkInfo.imagePath : null, {validators: []}),
      imageAttachment: new FormControl(null, {validators: [], asyncValidators: [imageUploadValidator]}),
      faBrand: new FormControl(this.pageMode == 'edit' ? this.linkInfo.faBrand : null, {validators: [this.linkType == "SOCIALMEDIA" ? Validators.required : Validators.maxLength(1)]}),
      orderNo: new FormControl(this.pageMode == 'edit' ? this.linkInfo.orderNo : 1, {validators: [Validators.required, Validators.min(1), Validators.max(999)]}),
      isActive: new FormControl(this.pageMode == 'edit' ? !!this.linkInfo.isActive : true, {validators: [Validators.required, Validators.maxLength(3)]}),
    });
  }

  onFilePicked(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files[0];
      this.extLinkSubmitForm.patchValue({imageAttachment: file});
      this.extLinkSubmitForm.get('imageAttachment').updateValueAndValidity();
      const reader = new FileReader();
      reader.onloadend = () => {
        let _imagePath = this.extLinkSubmitForm.get('imageAttachment').valid ? reader.result as string : null;
        this.extLinkSubmitForm.get('imagePath').setValue(_imagePath);
      };
      reader.readAsDataURL(file);
    } catch (error) {

    }
  }

  filePickerRemove() {
    this.extLinkSubmitForm.get('imageAttachment').setValue(null);
    this.extLinkSubmitForm.get('imagePath').setValue(null);
  }

  onSubmitForm() {
    if (this.extLinkSubmitForm.valid) {

      this.isLoading = true;
      if (this.pageMode === "create") {
        this.extLinkService.createLink(this.extLinkSubmitForm.value);
      }
      else {
        this.extLinkService.updateLink(this.extLinkSubmitForm.value);
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
            this.extLinkService.deleteLink(id);
            this.dialogRef.close();
          }
        }
      });
  }

}
