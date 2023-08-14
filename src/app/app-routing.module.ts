import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Admin Routing
import { AdminLogin } from "./admin/components/login/login.component";
import { AdminLogout } from "./admin/components/logout/logout.component";
import { AdminHome } from "./admin/components/home/home.component";

import { AdminStaffIzmirAskf } from "./admin/components/staff-izmiraskf-list/staff-izmiraskf-list.component";
import { AdminIzmirASKF } from "./admin/components/about-izmiraskf/about-izmiraskf.component";
import { AdminIzmirTFFIlTemsilciligi } from "./admin/components/about-izmirtffiltemsilciligi/about-izmirtffiltemsilciligi.component";
import { AdminStaffIzmirTFF } from "./admin/components/staff-izmirtff-list/staff-izmirtff-list.component";
import { AdminNewsWrapComponent } from "./admin/components/news-wrap-component/news-wrap-component.component";
import { AdminExternalLinks } from "./admin/components/external-links-list/external-links-list.component";

import { AdminDocumentList } from "./admin/components/documents-list/documents-list.component";

import { AdminTeamsList } from "./admin/components/teams-list/teams-list.component";
import { AdminStadiumsList } from "./admin/components/stadiums-list/stadiums-list.component";
import { AdminDisciplinaryBoardFilesList } from "./admin/components/disciplinary-board-files-list/disciplinary-board-files-list.component";
import { AdminDisciplinaryBoardDecisionsList } from "./admin/components/disciplinary-board-decisions-list/disciplinary-board-decisions-list.component";

import { AdminSeasonsList } from "./admin/components/seasons-list/seasons-list.component";
import { AdminLeaguesList } from "./admin/components/leagues-list/leagues-list.component";
import { AdminGroupList } from "./admin/components/groupstages-list/groupstages-list.component";
import { AdminTeamsInGroupstages } from "./admin/components/teams-in-groupstages/teams-in-groupstages.component";
import { AdminTeamsInDisqualifications } from "./admin/components/teams-in-disqualifications/teams-in-disqualifications.component";

import { AdminFixtureCreate } from "./admin/components/fixture-create/fixture-create.component";
import { AdminScoreBoard } from "./admin/components/score-board/score-board.component";
import { AdminPointBoardFixtureWrap } from "./admin/components/pointboard-fixture-wrap/pointboard-fixture-wrap.component";
import { AdminWeeklyMatchProgramList } from "./admin/components/weekly-match-program-list/weekly-match-program-list.component";
import { AdminWeeklyMatchList } from "./admin/components/weekly-match-list/weekly-match-list.component";

import { AdminUsersList } from "./admin/components/users-list/users-list.component";

import { AuthGuard } from "./admin/authentication/auth-guard";
import { AuthModule } from "./admin/authentication/auth.module";

// Application Routing
import { PageNotFound } from "./application/components/page-not-found/page-not-found.component";

import { ApplicationHome } from "./application/components/home/home.component";

import { ApplicationIzmirASKF } from "./application/components/about-izmiraskf/about-izmiraskf.component";
import { ApplicationStaffIzmirAskf } from "./application/components/staff-izmiraskf-list/staff-izmiraskf-list.component";

import { ApplicationIzmirTFFIlTemsilciligi } from "./application/components/about-tffizmiriltemsilciligi/about-tffizmiriltemsilciligi.component";
import { ApplicationStaffIzmirTFF } from "./application/components/staff-izmirtff-list/staff-izmirtff-list.component";

import { ApplicationTeamsList } from "./application/components/teams-list/teams-list.component";
import { ApplicationTeamDetails } from "./application/components/teams-details/teams-details.component";

import { ApplicationNewsList } from "./application/components/news-list/news-list.component";
import { ApplicationNewsDetails } from "./application/components/news-details/news-details.component";

import { ApplicationStadiumList } from "./application/components/stadiums-list/stadiums-list.component";
import { ApplicationStadiumDetails } from "./application/components/stadiums-details/stadiums-details.component";

import { ApplicationDisciplinaryBoardDecisionsList } from "./application/components/disciplinary-board-decisions-list/disciplinary-board-decisions-list.component";

import { ApplicationWeeklyMatchList } from "./application/components/weekly-match-list/weekly-match-list.component";

import { ApplicationPointBoardFixtureWrap } from "./application/components/pointboard-fixture-wrap/pointboard-fixture-wrap.component";

import { ApplicationDocumentList } from "./application/components/documents-list/documents-list.component";

import { ApplicationContactUs } from "./application/components/contact-us/contact-us.component";

const routes: Routes = [
  {path: 'admin/anasayfa', component: AdminHome, canActivate: [AuthGuard]},
  {path: 'admin/kullanici-giris', component: AdminLogin},
  {path: 'admin/kullanici-guvenli-cikis', component: AdminLogout},
  {path: 'admin/izmiraskf', component: AdminIzmirASKF, canActivate: [AuthGuard]},
  {path: 'admin/izmiraskf/yonetim-kurulu', component: AdminStaffIzmirAskf, canActivate: [AuthGuard]},
  {path: 'admin/izmirtffiltemsilciligi', component: AdminIzmirTFFIlTemsilciligi, canActivate: [AuthGuard]},
  {path: 'admin/izmirtffiltemsilciligi/tffiltemsilciligi', component: AdminStaffIzmirTFF, canActivate: [AuthGuard]},
  {path: 'admin/haberler', component: AdminNewsWrapComponent, canActivate: [AuthGuard]},
  {path: 'admin/disbaglantilar', component: AdminExternalLinks, canActivate: [AuthGuard]},

  {path: 'admin/dokumanlar/:category', pathMatch:"full", component: AdminDocumentList, canActivate: [AuthGuard]},

  {path: 'admin/sahalar', component: AdminStadiumsList, canActivate: [AuthGuard]},
  {path: 'admin/takimlar', component: AdminTeamsList, canActivate: [AuthGuard]},
  {path: 'admin/komite-dosyalari/:casetype', pathMatch:"full", component: AdminDisciplinaryBoardFilesList, canActivate: [AuthGuard]},
  {path: 'admin/komite-kararlari/:casetype', pathMatch:"full", component: AdminDisciplinaryBoardDecisionsList, canActivate: [AuthGuard]},

  {path: 'admin/sezonlar', component: AdminSeasonsList, canActivate: [AuthGuard]},
  {path: 'admin/ligler', component: AdminLeaguesList, canActivate: [AuthGuard]},
  {path: 'admin/gruplar', component: AdminGroupList, canActivate: [AuthGuard]},
  {path: 'admin/gruplar/takimlar', component: AdminTeamsInGroupstages, canActivate: [AuthGuard]},
  {path: 'admin/gruplar/ihrac-ve-cekilme', component: AdminTeamsInDisqualifications, canActivate: [AuthGuard]},

  {path: 'admin/fikstur', component: AdminFixtureCreate, canActivate: [AuthGuard]},
  {path: 'admin/skor-tablosu', component: AdminScoreBoard, canActivate: [AuthGuard]},
  {path: 'admin/puan-tablosu', component: AdminPointBoardFixtureWrap, canActivate: [AuthGuard]},
  {path: 'admin/haftalik-bulten', component: AdminWeeklyMatchProgramList, canActivate: [AuthGuard]},
  {path: 'admin/haftalik-musabaka-listesi', component: AdminWeeklyMatchList, canActivate: [AuthGuard]},

  {path: 'admin/kullanicilar', component: AdminUsersList, canActivate: [AuthGuard]},

  {path: 'auth', loadChildren: () => import("./admin/authentication/auth.module").then(m => m.AuthModule)},



  {path: '', component: ApplicationHome},
  {path: 'anasayfa', component: ApplicationHome},

  {path: 'izmiraskf/hakkimizda', component: ApplicationIzmirASKF},
  {path: 'izmiraskf/yonetim-kurulu', component: ApplicationStaffIzmirAskf},

  {path: 'tffiltemsilciligi/hakkimizda', component: ApplicationIzmirTFFIlTemsilciligi},
  {path: 'tffiltemsilciligi/tffiltemsilciligi', component: ApplicationStaffIzmirTFF},
  {path: 'takimlar', component: ApplicationTeamsList},
  {path: 'takimlar/detaylar/:id', pathMatch:"full", component: ApplicationTeamDetails},

  {path: 'haberler', component: ApplicationNewsList},
  {path: 'haberler/detaylar/:id', pathMatch:"full", component: ApplicationNewsDetails},

  {path: 'sahalar', component: ApplicationStadiumList},
  {path: 'sahalar/detaylar/:id', pathMatch:"full", component: ApplicationStadiumDetails},

  {path: 'komite-kararlari/:casetype', pathMatch:"full", component: ApplicationDisciplinaryBoardDecisionsList},

  {path: 'haftalik-bulten', component: ApplicationWeeklyMatchList},

  {path: 'puan-tablosu-fikstur', component: ApplicationPointBoardFixtureWrap},

  {path: 'dokumanlar/:category', pathMatch:"full", component: ApplicationDocumentList},

  {path: 'iletisim', component: ApplicationContactUs},

  {path: '**', pathMatch: "full", component: PageNotFound},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
