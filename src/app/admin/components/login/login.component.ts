import { DatePipe } from "@angular/common";
import { Component, OnInit, OnDestroy, ViewChild, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE }  from "@angular/material/core";
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { UserModel } from "../../models/admin-users.model";
import { AuthService } from "../../authentication/auth.service";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../app.component.css', './login.component.css']
})
export class AdminLogin implements OnInit, OnDestroy {
  toolbarTitle = "SİSTEM GİRİŞ";
  isLoading: boolean = false;
  userForm: FormGroup;
  @Input() isPasswordVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);

    this.userForm = new FormGroup({
      id: new FormControl(null, {validators: []}),
      createdAt: new FormControl(null, {validators: []}),
      createdBy: new FormControl(null, {validators: []}),
      updatedAt: new FormControl(null, {validators: []}),
      updatedBy: new FormControl(null, {validators: []}),
      fullName: new FormControl(null, {validators: []}),
      userName: new FormControl(null, {validators: [Validators.required, Validators.maxLength(200), Validators.email]}),
      userPassword: new FormControl(null, {validators: [Validators.required, Validators.maxLength(200)]}),
      profilePhoto: new FormControl(null, {validators: []}),
      userType: new FormControl(null, {validators: []}),
      isActive: new FormControl(null, {validators: []})
    });

  }

  changePasswordType(): void {
    const field = document.getElementById('passwordField') as HTMLElement;
    if (this.isPasswordVisible) {
      field.setAttribute('type', 'password');
      this.isPasswordVisible = false;
    } else {
      field.setAttribute('type', 'text');
      this.isPasswordVisible = true;
    }

  }

  onLogin() {

    if (this.userForm.valid) {
      this.authService.login(this.userForm.value);
    } else {

    }

    /*
    this.userForm.get('fullName').setValue('RUNTIYA Yazılım');
    this.userForm.get('userName').setValue('runtiya@izmiraskf.com');
    this.userForm.get('userPassword').setValue('1234');
    this.userForm.get('userType').setValue('YONETICI');
    this.userForm.get('isActive').setValue(true);

    this.usersService.createUser(this.userForm.value);
    */
  }

  ngOnDestroy(): void {

  }
}
