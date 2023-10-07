import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";

import { ExternalLinksModel } from "../../models/admin-externallinks.model";
import { ExternalLinksService } from "../../services/admin-externallinks.service";
import { AdminExternalLinksCreateModal } from "../external-links-create/external-links-create.component";
import { faBrandList } from "../../../assets/lists/font-awesome-brand.list";
import { globalFunctions } from "../../../functions/global.function";
import { AdminConfirmationDialogModal } from "../confirmation-dialog/confirmation-dialog.component";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-admin-external-links-list',
  templateUrl: './external-links-list.component.html',
  styleUrls: ['../../../app.component.css', './external-links-list.component.css']
})
export class AdminExternalLinks implements OnInit, OnDestroy {
  toolbarTitle = 'DIŞ BAĞLANTILAR';
  isLoading: boolean = false;
  extLinks: ExternalLinksModel[] = [];
  extLinksRelatedLinks: ExternalLinksModel[] = [];
  extLinksSocialMediaLinks: ExternalLinksModel[] = [];
  extLinksAdvertisements: ExternalLinksModel[] = [];
  private extLinksSubscription: Subscription;
  faBrandList = faBrandList;
  environment = environment;

  tableColumns: string[] = [
                              "orderNo",
                              "linkName",
                              "url",
                              "isActive",
                              "actions"
                            ];

  constructor(
    public extLinkService: ExternalLinksService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.extLinkService.getLinks();
    this.extLinksSubscription = this.extLinkService.getExternalLinksUpdateListener()
      .subscribe((data: ExternalLinksModel[]) => {
        this.extLinks = data.sort((a, b) => {return a.orderNo - b.orderNo});
        this.extLinks.map(l => {
          if (l.imagePath !== null && !l.imagePath.includes(environment.serverUrl)) {
            l.imagePath = `${environment.serverUrl}${l.imagePath}`;
          }
        });
        this.extLinksRelatedLinks = this.extLinks.filter(link => link.linkType == "RELATEDLINK");
        this.extLinksSocialMediaLinks = this.extLinks.filter(link => link.linkType == "SOCIALMEDIA");
        this.extLinksAdvertisements = this.extLinks.filter(link => link.linkType == "ADVERTISEMENT");
        this.isLoading = false;
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
      this.extLinksSubscription = this.extLinkService.getExternalLinksUpdateListener()
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
      this.extLinksSubscription = this.extLinkService.getExternalLinksUpdateListener()
        .subscribe((data: ExternalLinksModel[]) => {
          this.extLinks = data.sort((a, b) => {return a.orderNo - b.orderNo});
        })
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
            this.extLinkService.deleteLink(id);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.extLinksSubscription.unsubscribe();
  }

}
