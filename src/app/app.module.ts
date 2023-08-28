import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select'
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeTr from "@angular/common/locales/tr";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Admin Components
import { AdminLogin } from "./admin/components/login/login.component";
import { AdminLogout } from "./admin/components/logout/logout.component";

import { AdminHeader } from './admin/components/header/header.component';
import { AdminToolbarTitle } from "./admin/components/toolbar-title/toolbar-title.component";

import { AdminHome } from "./admin/components/home/home.component";

import { AdminIzmirASKF } from './admin/components/about-izmiraskf/about-izmiraskf.component';
import { AdminStaffIzmirAskf } from './admin/components/staff-izmiraskf-list/staff-izmiraskf-list.component';
import { AdminCreateStaffIzmirAskfModal } from "./admin/components/staff-izmiraskf-create/staff-izmiraskf-create.component";

import { AdminIzmirTFFIlTemsilciligi } from './admin/components/about-izmirtffiltemsilciligi/about-izmirtffiltemsilciligi.component';
import { AdminStaffIzmirTFF } from "./admin/components/staff-izmirtff-list/staff-izmirtff-list.component";
import { AdminCreateStaffIzmirTFFModal } from "./admin/components/staff-izmirtff-create/staff-izmirtff-create.component";

import { AdminNewsCreate } from './admin/components/news-create/news-create.component';
import { AdminNewsList } from './admin/components/news-list/news-list.component';
import { AdminNewsUpdateModal } from './admin/components/news-update/news-update.component';
import { AdminNewsWrapComponent } from './admin/components/news-wrap-component/news-wrap-component.component';

import { AdminExternalLinks } from "./admin/components/external-links-list/external-links-list.component";
import { AdminExternalLinksCreateModal } from "./admin/components/external-links-create/external-links-create.component";

import { AdminDocumentList } from "./admin/components/documents-list/documents-list.component";
import { AdminDocumentCreateModal } from "./admin/components/documents-create/documents-create.component";

import { AdminStadiumsList } from "./admin/components/stadiums-list/stadiums-list.component";
import { AdminStadiumsCreateModal } from "./admin/components/stadiums-create/stadiums-create.component";

import { AdminTeamsList } from "./admin/components/teams-list/teams-list.component";
import { AdminTeamsCreateModal } from './admin/components/teams-create/teams-create.component';

import { AdminDisciplinaryBoardFilesList } from "./admin/components/disciplinary-board-files-list/disciplinary-board-files-list.component";
import { AdminDisciplinaryBoardCreateModal } from "./admin/components/disciplinary-board-files-create/disciplinary-board-files-create.component";

import { AdminDisciplinaryBoardDecisionsList } from "./admin/components/disciplinary-board-decisions-list/disciplinary-board-decisions-list.component";
import { AdminDisciplinaryBoardDecisionsCreateModal } from "./admin/components/disciplinary-board-decisions-create/disciplinary-board-decisions-create.component";

import { AdminSeasonsList } from "./admin/components/seasons-list/seasons-list.component";
import { AdminSeasonsCreateModal } from "./admin/components/seasons-create/seasons-create.component";

import { AdminLeaguesList } from "./admin/components/leagues-list/leagues-list.component";
import { AdminLeaguesCreateModal } from './admin/components/leagues-create/leagues-create.component';

import { AdminGroupList } from "./admin/components/groupstages-list/groupstages-list.component";
import { AdminGroupStagesCreateModal } from "./admin/components/groupstages-create/groupstages-create.component";

import { AdminTeamsInGroupstages } from "./admin/components/teams-in-groupstages/teams-in-groupstages.component";
import { AdminTeamsInDisqualifications } from "./admin/components/teams-in-disqualifications/teams-in-disqualifications.component";
import { AdminTeamsInDisqualificationsEditModal } from "./admin/components/teams-in-disqualifications-edit/teams-in-disqualifications-edit.component";

import { AdminFixtureCreate } from "./admin/components/fixture-create/fixture-create.component";
import { AdminFixtureEditModal } from "./admin/components/fixture-edit/fixture-edit.component";
import { AdminTeamsInGroupstagesInFixtureCreate } from "./admin/components/teamsingroupstages-in-fixturecreate/teamsingroupstages-in-fixturecreate.component";

import { AdminScoreBoard } from "./admin/components/score-board/score-board.component";

import { AdminPointBoard } from "./admin/components/point-board/point-board.component";
import { AdminFixtureByWeek } from "./admin/components/fixture-by-week/fixture-by-week.component";
import { AdminPointBoardFixtureWrap } from "./admin/components/pointboard-fixture-wrap/pointboard-fixture-wrap.component";
import { AdminWeeklyMatchProgramList } from "./admin/components/weekly-match-program-list/weekly-match-program-list.component";
import { AdminWeeklyMatchProgramCreateModal } from "./admin/components/weekly-match-program-create/weekly-match-program-create.component";
import { AdminWeeklyMatchList } from "./admin/components/weekly-match-list/weekly-match-list.component";
import { AdminWeeklyMatchListAddMatchModal } from "./admin/components/weekly-match-list-add-match/weekly-match-list-add-match.component";

import { AdminUsersList } from "./admin/components/users-list/users-list.component";
import { AdminUsersCreateModal } from "./admin/components/users-create/users-create.component";

import { AdminConfirmationDialogModal } from "./admin/components/confirmation-dialog/confirmation-dialog.component";

// Application Components
import { PageNotFound } from './application/components/page-not-found/page-not-found.component';
import { NoContentInfo } from "./application/components/no-content-info/no-content-info.component";
import { NoRecordInfo } from "./application/components/no-record-info/no-record-info.component";
import { NoRecordFixtureSearch } from './application/components/no-record-fixturesearch/no-record-fixturesearch.component';
import { ApplicationHeader } from "./application/components/header/header.component";
import { ApplicationToolbarTitle } from "./application/components/toolbar-title/toolbar-title.component";

import { ApplicationHome } from "./application/components/home/home.component";
import { ApplicationNewsSlider } from "./application/components/news-slider/news-slider.component";
import { ApplicationDocumentCategoryListInHome } from "./application/components/document-category-list-in-home/document-category-list-in-home.component";
import { ApplicationExternalLinksInHome } from "./application/components/external-links-in-home/external-links-in-home.component";

import { ApplicationIzmirASKF } from "./application/components/about-izmiraskf/about-izmiraskf.component";
import { ApplicationStaffIzmirAskf } from "./application/components/staff-izmiraskf-list/staff-izmiraskf-list.component";

import { ApplicationIzmirTFFIlTemsilciligi } from "./application/components/about-tffizmiriltemsilciligi/about-tffizmiriltemsilciligi.component";
import { ApplicationStaffIzmirTFF } from "./application/components/staff-izmirtff-list/staff-izmirtff-list.component";

import { ApplicationNewsList } from "./application/components/news-list/news-list.component";
import { ApplicationNewsDetails } from "./application/components/news-details/news-details.component";

import { ApplicationStadiumList } from "./application/components/stadiums-list/stadiums-list.component";
import { ApplicationStadiumDetails } from "./application/components/stadiums-details/stadiums-details.component";

import { ApplicationTeamsList } from './application/components/teams-list/teams-list.component';
import { ApplicationTeamDetails } from './application/components/teams-details/teams-details.component';

import { ApplicationDisciplinaryBoardDecisionsList } from "./application/components/disciplinary-board-decisions-list/disciplinary-board-decisions-list.component";
import { ApplicationDisciplinaryBoardDecisionsDetailsModal } from "./application/components/disciplinary-board-decisions-details/disciplinary-board-decisions-details.component";

import { ApplicationWeeklyMatchList } from "./application/components/weekly-match-list/weekly-match-list.component";

import { ApplicationPointBoard } from "./application/components/point-board/point-board.component";
import { ApplicationFixtureByWeek } from "./application/components/fixture-by-week/fixture-by-week.component";
import { ApplicationPointBoardFixtureWrap } from "./application/components/pointboard-fixture-wrap/pointboard-fixture-wrap.component";

import { ApplicationDocumentList } from "./application/components/documents-list/documents-list.component";

import { ApplicationContactUs } from "./application/components/contact-us/contact-us.component";

import { ApplicationFooter } from "./application/components/footer/footer.component";

// Global Components
import { GlobalStatisticsTeamsCountByTown } from "./components/statistics-teams-count-by-town/statistics-teams-count-by-town.component";
import { GlobalStatisticsStadiumsCountByTown } from "./components/statistics-stadiums-count-by-town/statistics-stadiums-count-by-town.component";
import { GlobalStatisticsStadiumsCountByFloorType } from "./components/statistics-stadiums-count-by-floortype/statistics-stadiums-count-by-floortype.component";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsModule } from '@angular/google-maps';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularMaterialModule } from "./angular-material.module";
import { NgApexchartsModule } from "ng-apexcharts";

import { AuthInterceptor } from './admin/authentication/auth-interceptor';
import { ErrorInterceptor } from "./error/error-interceptor";
import { ResponseInterceptor } from "./functions/global-http-response";



@NgModule({
  declarations: [
    AppComponent,

    // Admin Components
    AdminLogin,
    AdminLogout,

    AdminHeader,

    AdminToolbarTitle,

    AdminHome,

    AdminIzmirASKF,
    AdminStaffIzmirAskf,
    AdminCreateStaffIzmirAskfModal,

    AdminIzmirTFFIlTemsilciligi,
    AdminStaffIzmirTFF,
    AdminCreateStaffIzmirTFFModal,

    AdminNewsCreate,
    AdminNewsList,
    AdminNewsUpdateModal,
    AdminNewsWrapComponent,

    AdminExternalLinks,
    AdminExternalLinksCreateModal,

    AdminDocumentList,
    AdminDocumentCreateModal,

    AdminStadiumsList,
    AdminStadiumsCreateModal,

    AdminTeamsList,
    AdminTeamsCreateModal,

    AdminDisciplinaryBoardFilesList,
    AdminDisciplinaryBoardCreateModal,

    AdminDisciplinaryBoardDecisionsList,
    AdminDisciplinaryBoardDecisionsCreateModal,

    AdminSeasonsList,
    AdminSeasonsCreateModal,

    AdminLeaguesList,
    AdminLeaguesCreateModal,

    AdminGroupList,
    AdminGroupStagesCreateModal,

    AdminTeamsInGroupstages,
    AdminTeamsInDisqualifications,
    AdminTeamsInDisqualificationsEditModal,

    AdminFixtureCreate,
    AdminFixtureEditModal,
    AdminTeamsInGroupstagesInFixtureCreate,

    AdminScoreBoard,

    AdminPointBoard,
    AdminFixtureByWeek,
    AdminPointBoardFixtureWrap,
    AdminWeeklyMatchProgramList,
    AdminWeeklyMatchProgramCreateModal,
    AdminWeeklyMatchList,
    AdminWeeklyMatchListAddMatchModal,

    AdminUsersList,
    AdminUsersCreateModal,

    AdminConfirmationDialogModal,

    // Application Components
    PageNotFound,
    NoContentInfo,
    NoRecordInfo,
    NoRecordFixtureSearch,
    ApplicationHeader,
    ApplicationToolbarTitle,

    ApplicationHome,
    ApplicationNewsSlider,
    ApplicationDocumentCategoryListInHome,
    ApplicationExternalLinksInHome,

    ApplicationNewsList,
    ApplicationNewsDetails,

    ApplicationIzmirASKF,
    ApplicationStaffIzmirAskf,

    ApplicationIzmirTFFIlTemsilciligi,
    ApplicationStaffIzmirTFF,

    ApplicationStadiumList,
    ApplicationStadiumDetails,

    ApplicationTeamsList,
    ApplicationTeamDetails,

    ApplicationDisciplinaryBoardDecisionsList,
    ApplicationDisciplinaryBoardDecisionsDetailsModal,

    ApplicationWeeklyMatchList,

    ApplicationPointBoard,
    ApplicationFixtureByWeek,
    ApplicationPointBoardFixtureWrap,

    ApplicationDocumentList,

    ApplicationContactUs,

    ApplicationFooter,

    // Global Components
    GlobalStatisticsTeamsCountByTown,
    GlobalStatisticsStadiumsCountByTown,
    GlobalStatisticsStadiumsCountByFloorType,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule,
    DragDropModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTableModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatPaginatorModule,

    FontAwesomeModule,
    GoogleMapsModule,
    AngularEditorModule,
    AngularMaterialModule,
    NgApexchartsModule,


  ],
  providers: [
    {provide: MatDialogRef, useValue: {}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'tr-TR'},
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeTr);
  }
}
