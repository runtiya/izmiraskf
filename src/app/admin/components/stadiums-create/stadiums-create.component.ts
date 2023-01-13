import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";


import { StadiumsModel } from "../../models/admin-stadiums.model";
import { StadiumsService } from "../../services/admin/admin-stadiums.service";
import { townList } from "../../assets/lists/town-list-izmir";
import { floorTypeList } from "../../assets/lists/floor-type-list";



@Component({
  selector: 'app-admin-stadiums-update-modal',
  templateUrl: './stadiums-create.component.html',
  styleUrls: ['../../../app.component.css', './stadiums-create.component.css']
})
export class StadiumsCreateModal {

  isLoading = false;
  stadiumsCreateForm: FormGroup;
  pageMode : string = this.data.pageMode || 'create';
  stadiumInfo = this.data.stadiumInfo;
  townListArray = townList;
  floorTypeListArray = floorTypeList;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, public dialogRef: MatDialogRef<StadiumsCreateModal>, public stadiumService: StadiumsService) {}

  ngOnInit() {
    console.log(this.stadiumInfo);

    this.stadiumsCreateForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.id : null, {validators: []}),
      stadiumName: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.stadiumName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      city: new FormControl('IZMIR', {validators: [Validators.required, Validators.maxLength(200)]}),
      town: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.town : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      address: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.address : null, {validators: [Validators.maxLength(2000)]}),
      phoneNumber: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.phoneNumber : null, {validators: [Validators.maxLength(200)]}),
      stadiumImage: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.stadiumImage : null, {validators: [], asyncValidators: []}),
      longitude: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.longitude : null, {validators: []}),
      latitude: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.latitude : null, {validators: []}),
      audienceCapacity: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.audienceCapacity : null, {validators: [Validators.min(0), Validators.max(99999)]}),
      sizeLength: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.sizeLength : null, {validators: [Validators.min(0), Validators.max(999)]}),
      sizeWidth: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.sizeWidth : null, {validators: [Validators.min(0), Validators.max(999)]}),
      floorType: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.floorType : null, {validators: []}),
      hasLightning: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.hasLightning : null, {validators: []}),
      hasSeating: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.hasSeating : null, {validators: []}),
      hasDisabledTribune: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.hasDisabledTribune : null, {validators: []}),
      hasClosedCircuitCameraSystem: new FormControl(this.pageMode == 'edit' ? this.stadiumInfo.hasClosedCircuitCameraSystem : null, {validators: []})
    });
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.stadiumService.deleteStadium(id);
    this.isLoading = false;
    this.dialogRef.close();
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

}
