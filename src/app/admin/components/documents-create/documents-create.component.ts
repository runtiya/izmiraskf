import { Component, Inject, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "@angular/router";

import { DocumentsService } from "../../services/admin-documents.service";
import { documentCategoryList } from "../../../assets/lists/documents-category.list";
import { documentTransferFileTypeList } from "../../../assets/lists/documents-transferfiles-type.list";

import { fileUploadValidator } from "../../validators/file-upload.validator";
import { globalFunctions } from "../../../functions/global.function";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-admin-documents-statuses-create',
  templateUrl: './documents-create.component.html',
  styleUrls: ['../../../app.component.css', './documents-create.component.css']
})
export class AdminDocumentCreateModal {
  isLoading: boolean = false;
  pageMode: string = this.data.pageMode || 'create';
  documentCategory = this.data.documentCategory;
  documentInfo = this.data.documentInfo;
  documentSubmitForm: FormGroup;
  documentCategoryList = documentCategoryList;
  documentTransferFileTypeList = documentTransferFileTypeList;
  documentPreview: string = 'File Name';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Data,
    private dialogRef: MatDialogRef<AdminDocumentCreateModal>,
    private dialog: MatDialog,
    private documentService: DocumentsService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.documentSubmitForm = new FormGroup({
      id: new FormControl(this.pageMode == 'edit' ? this.documentInfo.id : null, {validators: []}),
      createdAt: new FormControl(this.pageMode == 'edit' ? this.documentInfo.createdAt : null, {validators: []}),
      createdBy: new FormControl(this.pageMode == 'edit' ? this.documentInfo.createdBy : null, {validators: []}),
      updatedAt: new FormControl(this.pageMode == 'edit' ? this.documentInfo.updatedAt : null, {validators: []}),
      updatedBy: new FormControl(this.pageMode == 'edit' ? this.documentInfo.updatedBy : null, {validators: []}),
      documentName: new FormControl(this.pageMode == 'edit' ? this.documentInfo.documentName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      fileName: new FormControl(this.pageMode == 'edit' ? this.documentInfo.fileName : null, {validators: [Validators.required, Validators.maxLength(200)]}),
      fileMimeType: new FormControl(this.pageMode == 'edit' ? this.documentInfo.fileMimeType : null, {validators: [Validators.required]}),
      fileSize: new FormControl(this.pageMode == 'edit' ? this.documentInfo.fileSize : null, {validators: [Validators.required, Validators.max(5 * 1024 * 1024)]}),
      filePath: new FormControl(this.pageMode == 'edit' ? this.documentInfo.filePath : null, {validators: []}),
      fileAttachment: new FormControl(null, {validators: [], asyncValidators: [fileUploadValidator]}),
      fileCategory: new FormControl(this.pageMode == 'edit' ? this.documentInfo.fileCategory : this.data.documentCategory, {validators: [Validators.required]}),
      fileType: new FormControl(this.pageMode == 'edit' ? this.documentInfo.fileType :  this.data.fileType, {validators: [Validators.required]}),
      orderNo: new FormControl(this.pageMode == 'edit' ? this.documentInfo.orderNo : 1, {validators: [Validators.required, Validators.min(1), Validators.max(999)]}),
    });
    this.isLoading = false;
  }

  onFilePicked(event: Event) {
    try {
      const file = (event.target as HTMLInputElement).files[0];
      this.documentSubmitForm.patchValue({fileAttachment: file, fileMimeType: file.type, fileName: file.name, fileSize: file.size});
      this.documentSubmitForm.get('fileAttachment').updateValueAndValidity();
      const reader = new FileReader();
      /*
      reader.onloadend = () => {
        let _filePath = this.documentSubmitForm.get('fileAttachment').valid ? reader.result as string : null;
        this.documentSubmitForm.get('filePath').setValue(_filePath);
      };
      */
      reader.readAsDataURL(file);
    } catch (error) {

    }
  }

  filePickerRemove() {
    this.documentSubmitForm.get('fileAttachment').setValue(null);
    this.documentSubmitForm.get('filePath').setValue(null);
    this.documentSubmitForm.get('fileName').setValue(null);
    this.documentSubmitForm.get('fileMimeType').setValue(null);
    this.documentSubmitForm.get('fileSize').setValue(null);
  }

  findMimeTypeIcon(_mimeType: string): IconDefinition {
    return this.globalFunctions.getMimeTypeIcon(_mimeType);
  }

  getFileSize(size: number): string {
    return this.globalFunctions.setFileSize(size);
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
            this.documentService.deleteDocument(id);
            this.dialogRef.close();
          }
        }
      });

  }
}
