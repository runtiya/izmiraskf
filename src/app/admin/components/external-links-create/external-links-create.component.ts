import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";


import { ExternalLinksModel } from "../../models/admin-externallinks.model";
import { ExternalLinksService } from "../../services/admin-externallinks.service";
import { imageUploadValidator } from "../../validators/image-upload.validator";
import { faBrandList } from "../../../assets/lists/font-awesome-brand-list";


@Component({
  selector: 'app-admin-external-links-create',
  templateUrl: './external-links-create.component.html',
  styleUrls: ['../../../app.component.css', './external-links-create.component.css']
})
export class AdminExternalLinksCreateModal implements OnInit {
  isLoading = false;
  pageMode: string = this.data.pageMode || 'create';
  linkType: string = this.data.linkType || 'RELATEDLINK';
  linkInfo = this.data.linkInfo;
  imagePreview: string;
  extLinkSubmitForm: FormGroup;
  faBrandList = faBrandList;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<AdminExternalLinksCreateModal>,
    public extLinkService: ExternalLinksService
  ) {}

  ngOnInit(): void {

    this.extLinkSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.linkInfo.id : null, {validators: []}),
      linkName: new FormControl(this.pageMode == 'edit' ? this.linkInfo.linkName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      url: new FormControl(this.pageMode == 'edit' ? this.linkInfo.url : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      linkType: new FormControl(this.pageMode == 'edit' ? this.linkInfo.linkType : this.linkType, {validators: []}),
      iconImage: new FormControl(this.pageMode == 'edit' ? this.linkInfo.iconImage : null, {validators: [], asyncValidators: [imageUploadValidator]}),
      faBrand: new FormControl(this.pageMode == 'edit' ? this.linkInfo.faBrand : null, {validators: [this.linkType == "SOCIALMEDIA" ? Validators.required : Validators.maxLength(1)]}),
      orderNo: new FormControl(this.pageMode == 'edit' ? this.linkInfo.orderNo : 1, {validators: [Validators.required, Validators.min(1), Validators.max(999)]}),
      isActive: new FormControl(this.pageMode == 'edit' ? !!this.linkInfo.isActive : true, {validators: [Validators.required, Validators.maxLength(3)]}),
    });
  }

  onFilePicked(event: Event) {
    try {

      const file = (event.target as HTMLInputElement).files[0];
      this.extLinkSubmitForm.patchValue({iconImage: file});
      this.extLinkSubmitForm.get('iconImage').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    } catch (error) {

    }
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
    this.isLoading = true;
    this.extLinkService.deleteLink(id);
    this.isLoading = false;

    this.dialogRef.close();
  }

}
