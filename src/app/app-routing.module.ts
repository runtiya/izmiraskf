import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLogin } from "./admin/components/login/login.component";
import { AdminLogout } from "./admin/components/logout/logout.component";
import { AdminStatistics } from "./admin/components/statistics/statistics.component";
import { AdminAboutStaffIASKFWrapComponent } from "./admin/components/about-staff-iaskf-wrap/about-staff-iaskf-wrap.component";
import { AdminAboutStaffITFFWrapComponent } from "./admin/components/about-staff-itff-wrap/about-staff-itff-wrap.component";
import { AdminNewsWrapComponent } from "./admin/components/news-wrap-component/news-wrap-component.component";
import { AdminExternalLinks } from "./admin/components/external-links-list/external-links-list.component";

import { AdminDocumentStatuses } from "./admin/components/documents-statuses-list/documents-statuses-list.component";
import { AdminDocumentInstructions } from "./admin/components/documents-instructions-list/documents-instructions-list.component";
import { AdminDocumentLicenseForms } from "./admin/components/documents-license-forms-list/documents-license-forms-list.component";
import { AdminDocumentDocuments } from "./admin/components/documents-documents-list/documents-documents-list.component";

import { AdminTeamsList } from "./admin/components/teams-list/teams-list.component";
import { AdminStadiumsListComponent } from "./admin/components/stadiums-list/stadiums-list.component";
import { AdminDisciplinaryBoardFilesList } from "./admin/components/disciplinary-board-files-list/disciplinary-board-files-list.component";
import { AdminDisciplinaryBoardDecisionsList } from "./admin/components/disciplinary-board-decisions-list/disciplinary-board-decisions-list.component";

import { AdminSeasonsList } from "./admin/components/seasons-list/seasons-list.component";
import { AdminLeaguesList } from "./admin/components/leagues-list/leagues-list.component";
import { AdminGroupList } from "./admin/components/groupstages-list/groupstages-list.component";
import { AdminTeamsInGroupstages } from "./admin/components/teams-in-groupstages/teams-in-groupstages.component";
import { AdminTeamsInDisqualifications } from "./admin/components/teams-in-disqualifications/teams-in-disqualifications.component";

import { AdminFixtureCreate } from "./admin/components/fixture-create/fixture-create.component";
import { AdminScoreBoard } from "./admin/components/score-board/score-board.component";
import { AdminPointBoard } from "./admin/components/point-board/point-board.component";

import { AdminUsersList } from "./admin/components/users-list/users-list.component";

import { PageNotFound } from "./application/components/page-not-found/page-not-found.component";
import { AuthGuard } from "./admin/authentication/auth-guard";
import { AuthModule } from "./admin/authentication/auth.module";

const routes: Routes = [
  {path: 'admin/anasayfa', component: AdminStatistics, canActivate: [AuthGuard]},
  {path: 'admin/kullanici-giris', component: AdminLogin},
  {path: 'admin/kullanici-guvenli-cikis', component: AdminLogout},
  {path: 'admin/izmiraskf', component: AdminAboutStaffIASKFWrapComponent, canActivate: [AuthGuard]},
  {path: 'admin/izmirtffiltemsilciligi', component: AdminAboutStaffITFFWrapComponent, canActivate: [AuthGuard]},
  {path: 'admin/haberler', component: AdminNewsWrapComponent, canActivate: [AuthGuard]},
  {path: 'admin/disbaglantilar', component: AdminExternalLinks, canActivate: [AuthGuard]},

  {path: 'admin/amatorligstatuleri', component: AdminDocumentStatuses, canActivate: [AuthGuard]},
  {path: 'admin/talimatlar', component: AdminDocumentInstructions, canActivate: [AuthGuard]},
  {path: 'admin/lisansformlari', component: AdminDocumentLicenseForms, canActivate: [AuthGuard]},
  {path: 'admin/belgeler', component: AdminDocumentDocuments, canActivate: [AuthGuard]},

  {path: 'admin/sahalar', component: AdminStadiumsListComponent, canActivate: [AuthGuard]},
  {path: 'admin/takimlar', component: AdminTeamsList, canActivate: [AuthGuard]},
  {path: 'admin/disiplin-kurulu-dosyalari', component: AdminDisciplinaryBoardFilesList, canActivate: [AuthGuard]},
  {path: 'admin/disiplin-kurulu-kararlari', component: AdminDisciplinaryBoardDecisionsList, canActivate: [AuthGuard]},

  {path: 'admin/sezonlar', component: AdminSeasonsList, canActivate: [AuthGuard]},
  {path: 'admin/ligler', component: AdminLeaguesList, canActivate: [AuthGuard]},
  {path: 'admin/gruplar', component: AdminGroupList, canActivate: [AuthGuard]},
  {path: 'admin/gruplar/takimlar', component: AdminTeamsInGroupstages, canActivate: [AuthGuard]},
  {path: 'admin/gruplar/ihrac-ve-cekilme', component: AdminTeamsInDisqualifications, canActivate: [AuthGuard]},

  {path: 'admin/fikstur', component: AdminFixtureCreate, canActivate: [AuthGuard]},
  {path: 'admin/skor-tablosu', component: AdminScoreBoard, canActivate: [AuthGuard]},
  {path: 'admin/puan-tablosu', component: AdminPointBoard, canActivate: [AuthGuard]},

  {path: 'admin/kullanicilar', component: AdminUsersList, canActivate: [AuthGuard]},


  {path: '**', pathMatch: "full", component: PageNotFound},
  {path: 'auth', loadChildren: () => import("./admin/authentication/auth.module").then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
