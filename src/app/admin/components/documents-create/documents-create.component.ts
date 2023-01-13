import { Component, Inject, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";

import { DocumentsService } from "../../services/admin/admin-documents.service";
import { documentCategoryList } from "../../assets/lists/documents-category-list";

import { fileUploadValidator } from "../../validators/file-upload.validator";


@Component({
  selector: 'app-admin-documents-statuses-create',
  templateUrl: './documents-create.component.html',
  styleUrls: ['../../../app.component.css', './documents-create.component.css']
})
export class AdminDocumentCreateModal {
  isLoading = false;
  pageMode: string = this.data.pageMode || 'create';
  documentInfo = this.data.documentInfo;
  documentSubmitForm: FormGroup;
  documentCategoryList = documentCategoryList;
  documentPreview: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, public dialogRef: MatDialogRef<AdminDocumentCreateModal>, public documentService: DocumentsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.documentSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.documentInfo.id : null, {validators: []}),
      docName: new FormControl(this.pageMode == 'edit' ? this.documentInfo.docName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      content: new FormControl(this.pageMode == 'edit' ? this.documentInfo.content : null, {validators: [Validators.required], asyncValidators: [fileUploadValidator]}),
      mimeType: new FormControl(this.pageMode == 'edit' ? this.documentInfo.mimeType : null, {validators: []}),
      category: new FormControl(this.pageMode == 'edit' ? this.documentInfo.documentCategory : this.data.documentCategory, {validators: [Validators.required]}),
      orderNo: new FormControl(this.pageMode == 'edit' ? this.documentInfo.orderNo : 1, {validators: [Validators.required, Validators.min(1), Validators.max(999)]}),
    });
    this.isLoading = false;
  }

  onFilePicked(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files[0];
      this.documentSubmitForm.patchValue({content: file});
      this.documentSubmitForm.get('content').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.documentPreview = file.name;
        if(this.documentSubmitForm.get('content').valid) {
          this.documentSubmitForm.get('name').setValue(file.name);
          this.documentSubmitForm.get('mimeType').setValue(file.type);
        }

      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  }

  onSubmitForm() {
    if (this.documentSubmitForm.valid) {
      this.isLoading = true;
      if (this.pageMode === 'create') {
        this.documentService.createDocument(this.documentSubmitForm.value);
      } else {
        this.documentService.updateDocument(this.documentSubmitForm.value);
      }
      this.isLoading = false;
      this.dialogRef.close();
    } else {
      console.log(this.documentSubmitForm.value);
    }
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.documentService.deleteDocument(id);
    this.isLoading  = false;

    this.dialogRef.close();
  }
}
