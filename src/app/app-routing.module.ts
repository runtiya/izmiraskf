import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminStatistics } from "./admin/components/statistics/statistics.component";
import { AboutStaffIASKFWrapComponent } from "./admin/components/about-staff-iaskf-wrap/about-staff-iaskf-wrap.component";
import { AboutStaffITFFWrapComponent } from "./admin/components/about-staff-itff-wrap/about-staff-itff-wrap.component";
import { NewsWrapComponent } from "./admin/components/news-wrap-component/news-wrap-component.component";
import { AdminExternalLinks } from "./admin/components/external-links-list/external-links-list.component";

import { AdminDocumentStatuses } from "./admin/components/documents-statuses-list/documents-statuses-list.component";
import { AdminDocumentInstructions } from "./admin/components/documents-instructions-list/documents-instructions-list.component";
import { AdminDocumentLicenseForms } from "./admin/components/documents-license-forms-list/documents-license-forms-list.component";
import { AdminDocumentDocuments } from "./admin/components/documents-documents-list/documents-documents-list.component";

import { TeamsList } from "./admin/components/teams-list/teams-list.component";
import { StadiumsListComponent } from "./admin/components/stadiums-list/stadiums-list.component";

import { AdminSeasonsList } from "./admin/components/seasons-list/seasons-list.component";

import { PageNotFound } from "./admin/components/page-not-found/page-not-found.component";


const routes: Routes = [
  {path: 'admin', component: AdminStatistics},
  {path: 'admin/izmiraskf', component: AboutStaffIASKFWrapComponent},
  {path: 'admin/izmirtffiltemsilciligi', component: AboutStaffITFFWrapComponent},
  {path: 'admin/haberler', component: NewsWrapComponent},
  {path: 'admin/disbaglantilar', component: AdminExternalLinks},

  {path: 'admin/amatorligstatuleri', component: AdminDocumentStatuses},
  {path: 'admin/talimatlar', component: AdminDocumentInstructions},
  {path: 'admin/lisansformlari', component: AdminDocumentLicenseForms},
  {path: 'admin/belgeler', component: AdminDocumentDocuments},

  {path: 'admin/sahalar', component: StadiumsListComponent},
  {path: 'admin/takimlar', component: TeamsList},

  {path: 'admin/sezonlar', component: AdminSeasonsList},

  {path: '**', pathMatch: "full", component: PageNotFound},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {

}
