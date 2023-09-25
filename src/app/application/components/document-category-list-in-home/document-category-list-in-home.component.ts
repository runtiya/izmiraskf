import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { documentCategoryList } from "../../../assets/lists/documents-category.list";

@Component({
  selector: 'app-application-document-category-list-in-home',
  templateUrl: './document-category-list-in-home.component.html',
  styleUrls: ['../../../app.component.css', './document-category-list-in-home.component.css']
})
export class ApplicationDocumentCategoryListInHome {
  documentCategoryList = documentCategoryList;
  isLoading: boolean = false;

  constructor(
    private router: Router
  ) {}

  showDocumentsList(category: string) {
    let url: string = `/dokumanlar/${category.toLowerCase()}`;
    this.router.navigate([url]);
  }
}
