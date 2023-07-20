import { Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";

import { AuthService } from "../../authentication/auth.service";
import { UserModel } from "../../models/admin-users.model";

import { userAuthorityList } from "../../assets/lists/user-authority.list";
import { imageUploadValidator } from "../../validators/image-upload.validator";

@Component({
  selector: 'app-admin-users-create',
  templateUrl: './users-create.component.html',
  styleUrls:['../../../app.component.css', './users-create.component.css']
})
export class AdminUsersCreateModal implements OnInit, OnDestroy {
  isLoading: boolean = false;
  userSubmitForm: FormGroup;
  userAuthorityList = userAuthorityList;
  imagePreview: string;
  pageMode: string = this.data.pageMode || 'create';
  userInfo = this.data.userInfo;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<AdminUsersCreateModal>,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.userInfo.id : null, {validators: []}),
      createdAt: new FormControl(this.pageMode == 'edit' ? this.userInfo.createdAt : null, {validators: []}),
      createdBy: new FormControl(this.pageMode == 'edit' ? this.userInfo.createdBy : null, {validators: []}),
      updatedAt: new FormControl(this.pageMode == 'edit' ? this.userInfo.updatedAt : null, {validators: []}),
      updatedBy: new FormControl(this.pageMode == 'edit' ? this.userInfo.updatedBy : null, {validators: []}),
      fullName: new FormControl(this.pageMode == 'edit' ? this.userInfo.fullName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      userName: new FormControl(this.pageMode == 'edit' ? this.userInfo.userName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      userPassword: new FormControl(this.pageMode == 'edit' ? null : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      profilePhoto: new FormControl(this.pageMode == 'edit' ? this.userInfo.profilePhoto : null, {validators: [], asyncValidators: [imageUploadValidator]}),
      userType: new FormControl(this.pageMode == 'edit' ? this.userInfo.userType : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      isActive: new FormControl(this.pageMode == 'edit' ? !!this.userInfo.isActive : null, {validators: [Validators.required]}),
    });
  }

  onFilePicked(event: Event) {

    try {

      const file = (event.target as HTMLInputElement).files[0];
      this.userSubmitForm.patchValue({profilePhoto: file, fileName: 'test'});
      this.userSubmitForm.get('profilePhoto').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    } catch (error) {

    }

  }

  onSubmitForm() {
    if (this.userSubmitForm.valid) {
      if (this.pageMode === "create") {
        this.authService.createUser(this.userSubmitForm.value);
      } else {
        this.authService.updateUser(this.userSubmitForm.value);
      }

      this.dialogRef.close();
    } else {
      return null;
    }
  }

  ngOnDestroy(): void {

  }
}
