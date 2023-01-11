import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";

import { ExternalLinksModel } from "../../models/admin-externallinks.model";
import { ExternalLinksService } from "../../services/admin/admin-externallinks.service";
import { AdminExternalLinksCreateModal } from "../external-links-create/external-links-create.component";

@Component({
  selector: 'app-admin-external-links-list',
  templateUrl: './external-links-list.component.html',
  styleUrls: ['../../../app.component.css', './external-links-list.component.css']
})
export class AdminExternalLinks implements OnInit, OnDestroy {
  headerTitle = 'DIŞ BAĞLANTILAR';
  isLoading = false;
  extLinks: ExternalLinksModel[] = [];
  private extLinksSubscription: Subscription;

  constructor(public extLinkService: ExternalLinksService, public dialog: MatDialog) {}


  ngOnInit(): void {
    this.isLoading = true;
    this.extLinkService.getLinks();
    this.extLinksSubscription = this.extLinkService.getExternalLinksSubListener()
      .subscribe((data: ExternalLinksModel[]) => {
        this.extLinks = data.sort((a, b) => {return a.order - b.order});
        this.isLoading = false;
        console.log(this.extLinks);
      });
  }

  onCreate(type: string) {
    const dialogRef = this.dialog.open(AdminExternalLinksCreateModal, {
      data: {
        pageMode: 'create',
        type: type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.extLinksSubscription = this.extLinkService.getExternalLinksSubListener()
        .subscribe((data: ExternalLinksModel[]) => {
          this.extLinks = data.sort((a, b) => {return a.order - b.order});
        })
    });
  }

  onEdit(linkInfo: ExternalLinksModel) {
    const dialogRef = this.dialog.open(AdminExternalLinksCreateModal, {
      data: {
        pageMode: 'edit',
        type: linkInfo.type,
        linkInfo: linkInfo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.extLinksSubscription = this.extLinkService.getExternalLinksSubListener()
        .subscribe((data: ExternalLinksModel[]) => {
          this.extLinks = data.sort((a, b) => {return a.order - b.order});
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
