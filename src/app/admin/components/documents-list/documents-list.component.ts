import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";


import { DocumentsModel } from "../../models/admin-documents.model";
import { DocumentsService } from "../../services/admin/admin-documents.service";
import { AdminDocumentCreateModal } from "../documents-create/documents-create.component";
import { documentCategoryList } from "../../assets/lists/documents-category-list";


@Component({
  selector: 'app-admin-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['../../../app.component.css', './documents-list.component.css']
})
export class AdminDocumentList {
  headerTitle = 'TÜM BELGELER';
  isLoading = false;
  documents: DocumentsModel[] = [];
  private documentsSubscription: Subscription;
  documentCategory = documentCategoryList[0].name;
  displayedColumns: string[] = [
                                "orderNo", 
                                "docName", 
                                "docType", 
                                "actions"
                              ];

  constructor(public documentService: DocumentsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = true;
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
