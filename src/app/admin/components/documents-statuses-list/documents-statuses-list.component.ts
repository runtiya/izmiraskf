import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";


import { DocumentsModel } from "../../models/admin-documents.model";
import { DocumentsService } from "../../services/admin/admin-documents.service";
import { AdminDocumentCreateModal } from "../documents-create/documents-create.component";
import { documentCategoryList } from "../../assets/lists/documents-category-list";

@Component({
  selector: 'app-admin-documents-statuses-list',
  templateUrl: '../documents-list/documents-list.component.html',
  styleUrls: ['../../../app.component.css', '../documents-list/documents-list.component.css']
})
export class AdminDocumentStatuses {
  headerTitle = 'AMATÖR LİG STATÜLERİ';
  isLoading = false;
  documents: DocumentsModel[] = [];
  private documentsSubscription: Subscription;
  documentCategory = documentCategoryList[0].name;

  constructor(public documentService: DocumentsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = true;
    this.documentService.getDocuments(this.documentCategory);
    this.documentsSubscription = this.documentService.getDocumentsListSubListener()
      .subscribe((data: DocumentsModel[]) => {
        this.documents = data.sort((a, b) => {return a.order - b.order});
        this.isLoading = false;
        console.log(this.documents);
      });
  }

  onCreate() {
    const dialogRef = this.dialog.open(AdminDocumentCreateModal, {
      data: {
        pageMode: 'create',
        documentCategory: this.documentCategory
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.documentsSubscription = this.documentService.getDocumentsListSubListener()
        .subscribe((data: DocumentsModel[]) => {
          this.documents = data.sort((a, b) => {return a.order - b.order});
        })
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

    dialogRef.afterClosed().subscribe(result => {
      this.documentsSubscription = this.documentService.getDocumentsListSubListener()
        .subscribe((data: DocumentsModel[]) => {
          this.documents = data.sort((a, b) => {return a.order - b.order});
        })
    });
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.documentService.deleteDocument(id);
    this.isLoading = false;
  }
}
