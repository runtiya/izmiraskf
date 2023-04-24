import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";

import { ExternalLinksModel } from "../../models/admin-externallinks.model";
import { ExternalLinksService } from "../../services/admin/admin-externallinks.service";
import { AdminExternalLinksCreateModal } from "../external-links-create/external-links-create.component";
import { faBrandList } from "../../assets/lists/font-awesome-list";


@Component({
  selector: 'app-admin-external-links-list',
  templateUrl: './external-links-list.component.html',
  styleUrls: ['../../../app.component.css', './external-links-list.component.css']
})
export class AdminExternalLinks implements OnInit, OnDestroy {
  headerTitle = 'DIŞ BAĞLANTILAR';
  isLoading = false;
  extLinks: ExternalLinksModel[] = [];
  extLinksRelatedLinks: ExternalLinksModel[] = [];
  extLinksSocialMediaLinks: ExternalLinksModel[] = [];
  private extLinksSubscription: Subscription;
  faBrandList = faBrandList;

  displayedColumns: string[] = ["orderNo", 
                                "linkName", 
                                "url", 
                                "isActive", 
                                "actions"
                              ];

  constructor(public extLinkService: ExternalLinksService, public dialog: MatDialog) {}


  ngOnInit(): void {
    this.isLoading = true;
    this.extLinkService.getLinks();
    this.extLinksSubscription = this.extLinkService.getExternalLinksSubListener()
      .subscribe((data: ExternalLinksModel[]) => {
        this.extLinks = data.sort((a, b) => {return a.orderNo - b.orderNo});
        this.extLinksRelatedLinks = this.extLinks.filter(link => link.linkType == "RELATEDLINK");
        this.extLinksSocialMediaLinks = this.extLinks.filter(link => link.linkType == "SOCIALMEDIA");
        this.isLoading = false;
        console.log(this.extLinks);
      });
  }

  onCreate(linkType: string) {
    const dialogRef = this.dialog.open(AdminExternalLinksCreateModal, {
      data: {
        pageMode: 'create',
        linkType: linkType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.extLinksSubscription = this.extLinkService.getExternalLinksSubListener()
        .subscribe((data: ExternalLinksModel[]) => {
          this.extLinks = data.sort((a, b) => {return a.orderNo - b.orderNo});
        })
    });
  }

  onEdit(linkInfo: ExternalLinksModel) {
    const dialogRef = this.dialog.open(AdminExternalLinksCreateModal, {
      data: {
        pageMode: 'edit',
        linkType: linkInfo.linkType,
        linkInfo: linkInfo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.extLinksSubscription = this.extLinkService.getExternalLinksSubListener()
        .subscribe((data: ExternalLinksModel[]) => {
          this.extLinks = data.sort((a, b) => {return a.orderNo - b.orderNo});
        })
    });
  }

  onDelete(id: number) {
    this.isLoading = true;
    this.extLinkService.deleteLink(id);
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.extLinksSubscription.unsubscribe();
  }

}
