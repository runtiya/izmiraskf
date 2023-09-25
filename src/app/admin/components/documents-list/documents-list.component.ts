import { Component } from "@angular/core";
import { Subscription } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { DocumentsModel } from "../../models/admin-documents.model";
import { DocumentsService } from "../../services/admin-documents.service";
import { AdminDocumentCreateModal } from "../documents-create/documents-create.component";
import { documentCategoryList } from "../../../assets/lists/documents-category.list";
import { documentTransferFileTypeList } from "../../../assets/lists/documents-transferfiles-type.list";
import { globalFunctions } from "../../../functions/global.function";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-admin-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['../../../app.component.css', './documents-list.component.css']
})
export class AdminDocumentList {
  toolbarTitle = null;
  isLoading: boolean = false;
  documents: DocumentsModel[] = [];
  private documentsSubscription: Subscription;
  documentCategoryList = documentCategoryList;
  documentTransferFileTypeList = documentTransferFileTypeList;
  url_category: string;
  documentCategory = null;
  tableColumns: string[] = [
                            "orderNo",
                            "fileName",
                            "fileMimeType",
                            "fileSize",
                            "actions"
                          ];

  constructor(
    private router: ActivatedRoute,
    public documentService: DocumentsService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.router.paramMap
      .subscribe(params => {
        this.url_category = params.get('category').toUpperCase();
        this.documentCategory = this.documentCategoryList.find(d => d.name == this.url_category);
        this.toolbarTitle = this.documentCategory.value;
        this.globalFunctions.setToolbarTitle(this.toolbarTitle);
        this.documentService.getDocuments(this.documentCategory.name);
      });

    this.documentsSubscription = this.documentService.getDocumentsListUpdateListener()
      .subscribe((data: DocumentsModel[]) => {
        this.documents = data.sort((a, b) => {return a.orderNo - b.orderNo});
        this.isLoading = false;
      });
  }

  findMimeTypeIcon(mimeType: string): IconDefinition {
    return this.globalFunctions.getMimeTypeIcon(mimeType);
  }

  findMimeType(mimeType: string): string {
    return this.globalFunctions.getMimeType(mimeType);
  }

  getFileSize(size: number): string {
    return this.globalFunctions.setFileSize(size);
  }

  onDownload(filePath: string, fileName: string) {
    const downloadLink = this.globalFunctions.getDownloadFileElement(filePath, fileName);
    downloadLink.click();
  }

  onCreate() {
    const dialogRef = this.dialog.open(AdminDocumentCreateModal, {
      data: {
        pageMode: 'create',
        fileType: this.documentCategory.name == 'AKTARMADOSYALARI' ? null : this.documentTransferFileTypeList.find(ft => ft.name == 'STATIK').name,
        documentCategory: this.documentCategory.name
      }
    });
  }

  onEdit(documentInfo: DocumentsModel) {
    const dialogRef = this.dialog.open(AdminDocumentCreateModal, {
      data: {
        pageMode: 'edit',
        documentCategory: documentInfo.fileCategory,
        documentInfo: documentInfo
      }
    });
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
          }
        }
      });
  }

  ngOnDestroy() {
    this.documentsSubscription.unsubscribe();
  }
}
