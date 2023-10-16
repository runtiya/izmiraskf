import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

import { DocumentsModel } from "../../models/application-documents.model";
import { DocumentsService } from "../../services/application-documents.service";

import { documentCategoryList } from "../../../assets/lists/documents-category.list";
import { globalFunctions } from "../../../functions/global.function";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-application-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['../../../app.component.css', './documents-list.component.css']
})
export class ApplicationDocumentList implements OnInit, OnDestroy {
  toolbarTitle = null;
  isLoading: boolean = false;
  documentsList: DocumentsModel[] = [];
  private documentsListSubscription: Subscription;
  documentCategoryList = documentCategoryList;
  url_category: string;

  constructor(
    private router: ActivatedRoute,
    public documentService: DocumentsService,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.router.paramMap
      .subscribe(params => {
        this.url_category = params.get('category').toUpperCase();
        let documentCategory = documentCategoryList.find(d => d.name == this.url_category).value;
        this.globalFunctions.setToolbarTitle(documentCategory);
        this.documentService.getDocuments(this.url_category);
      });

    this.documentsListSubscription = this.documentService.getDocumentsListUpdateListener()
      .subscribe({
        next: (data: DocumentsModel[]) => {
          this.documentsList = data.sort((a, b) => {return a.orderNo - b.orderNo});

          this.isLoading = false;
        }
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

  ngOnDestroy(): void {
    this.documentsListSubscription.unsubscribe();
  }

}
