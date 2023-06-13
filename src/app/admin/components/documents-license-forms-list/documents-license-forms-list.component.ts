import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";

import { DocumentsModel } from "../../models/admin-documents.model";
import { DocumentsService } from "../../services/admin-documents.service";
import { AdminDocumentCreateModal } from "../documents-create/documents-create.component";
import { documentCategoryList } from "../../../assets/lists/documents-category-list";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-admin-documents-license-forms-list',
  templateUrl: '../documents-list/documents-list.component.html',
  styleUrls: ['../../../app.component.css', '../documents-list/documents-list.component.css']
})
export class AdminDocumentLicenseForms {
  toolbarTitle = "LİSANS FORMLARI";
  isLoading = false;
  documents: DocumentsModel[] = [];
  private documentsSubscription: Subscription;
  documentCategory = documentCategoryList[2].name;
  tableColumns: string[] = [
                                "orderNo",
                                "docName",
                                "docType",
                                "actions"
                              ];

  constructor(
    public documentService: DocumentsService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.documentService.getDocuments(this.documentCategory);
    this.documentsSubscription = this.documentService.getDocumentsListSubListener()
      .subscribe((data: DocumentsModel[]) => {
        this.documents = data.sort((a, b) => {return a.orderNo - b.orderNo});
        this.isLoading = false;
      });
  }

  onCreate() {
    const dialogRef = this.dialog.open(AdminDocumentCreateModal, {
      data: {
        pageMode: 'create',
        documentCategory: this.documentCategory
      }
    });
  }

  onEdit(documentInfo: DocumentsModel) {
    const dialogRef = this.dialog.open(AdminDocumentCreateModal, {
      data: {
        pageMode: 'edit',
        documentCategory: documentInfo.category,
        documentInfo: documentInfo
      }
    });
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.documentService.deleteDocument(id);
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.documentsSubscription.unsubscribe();
  }
}
