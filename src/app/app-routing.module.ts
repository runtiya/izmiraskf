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
import { AdminDisciplinaryBoardFilesList } from "./admin/components/disciplinary-board-files-list/disciplinary-board-files-list.component";
import { AdminDisciplinaryBoardDecisionsList } from "./admin/components/disciplinary-board-decisions-list/disciplinary-board-decisions-list.component";

import { AdminSeasonsList } from "./admin/components/seasons-list/seasons-list.component";
import { AdminLeaguesList } from "./admin/components/leagues-list/leagues-list.component";
import { AdminGroupList } from "./admin/components/groupstages-list/groupstages-list.component";
import { TeamsInGroupstages } from "./admin/components/teams-in-groupstages/teams-in-groupstages.component";
import { TeamsInDisqualifications } from "./admin/components/teams-in-disqualifications/teams-in-disqualifications.component";

import { FixtureCreate } from "./admin/components/fixture-create/fixture-create.component";
import { AdminScoreBoard } from "./admin/components/score-board/score-board.component";

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
  {path: 'admin/disiplin-kurulu-dosyalari', component: AdminDisciplinaryBoardFilesList},
  {path: 'admin/disiplin-kurulu-kararlari', component: AdminDisciplinaryBoardDecisionsList},

  {path: 'admin/sezonlar', component: AdminSeasonsList},
  {path: 'admin/ligler', component: AdminLeaguesList},
  {path: 'admin/gruplar', component: AdminGroupList},
  {path: 'admin/gruplar/takimlar', component: TeamsInGroupstages},
  {path: 'admin/gruplar/ihrac-ve-cekilme', component: TeamsInDisqualifications},

  {path: 'admin/fikstur', component: FixtureCreate},
  {path: 'admin/skor-tablosu', component: AdminScoreBoard},

  {path: '**', pathMatch: "full", component: PageNotFound},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {

}
