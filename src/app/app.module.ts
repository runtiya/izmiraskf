import { NgModule } from '@angular/core';
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
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Admin Components
import { AdminLogin } from "./admin/components/login/login.component";
import { AdminLogout } from "./admin/components/logout/logout.component";

import { AdminHeaderComponent } from './admin/components/header/header.component';

import { AdminHome } from "./admin/components/home/home.component";

import { AdminIzmirASKF } from './admin/components/about-izmiraskf/about-izmiraskf.component';
import { AdminStaffIzmirAskf } from './admin/components/staff-izmiraskf-list/staff-izmiraskf-list.component';
import { AdminCreateStaffIzmirAskfModal } from "./admin/components/staff-izmiraskf-create/staff-izmiraskf-create.component";
import { AdminAboutStaffIASKFWrapComponent } from "./admin/components/about-staff-iaskf-wrap/about-staff-iaskf-wrap.component";

import { AdminIzmirTFFIlTemsilciligi } from './admin/components/about-izmirtffiltemsilciligi/about-izmirtffiltemsilciligi.component';
import { AdminStaffIzmirTFF } from "./admin/components/staff-izmirtff-list/staff-izmirtff-list.component";
import { AdminCreateStaffIzmirTFFModal } from "./admin/components/staff-izmirtff-create/staff-izmirtff-create.component";
import { AdminAboutStaffITFFWrapComponent } from "./admin/components/about-staff-itff-wrap/about-staff-itff-wrap.component";

import { AdminNewsCreate } from './admin/components/news-create/news-create.component';
import { AdminNewsList } from './admin/components/news-list/news-list.component';
import { AdminNewsUpdateModal } from './admin/components/news-update/news-update.component';
import { AdminNewsWrapComponent } from './admin/components/news-wrap-component/news-wrap-component.component';

import { AdminExternalLinks } from "./admin/components/external-links-list/external-links-list.component";
import { AdminExternalLinksCreateModal } from "./admin/components/external-links-create/external-links-create.component";

import { AdminDocumentList } from "./admin/components/documents-list/documents-list.component";
import { AdminDocumentCreateModal } from "./admin/components/documents-create/documents-create.component";
import { AdminDocumentStatuses } from "./admin/components/documents-statuses-list/documents-statuses-list.component";
import { AdminDocumentInstructions } from "./admin/components/documents-instructions-list/documents-instructions-list.component";
import { AdminDocumentLicenseForms } from "./admin/components/documents-license-forms-list/documents-license-forms-list.component";
import { AdminDocumentDocuments } from "./admin/components/documents-documents-list/documents-documents-list.component";

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

import { AdminScoreBoard } from "./admin/components/score-board/score-board.component";

import { AdminPointBoard } from "./admin/components/point-board/point-board.component";

import { AdminUsersList } from "./admin/components/users-list/users-list.component";
import { AdminUsersCreateModal } from "./admin/components/users-create/users-create.component";

// Application Components
import { PageNotFound } from './application/components/page-not-found/page-not-found.component';
import { ApplicationHeaderComponent } from "./application/components/header/header.component";

import { ApplicationIzmirASKF } from "./application/components/about-izmiraskf/about-izmiraskf.component";
import { ApplicationStaffIzmirAskf } from "./application/components/staff-izmiraskf-list/staff-izmiraskf-list.component";

import { ApplicationIzmirTFFIlTemsilciligi } from "./application/components/about-tffizmiriltemsilciligi/about-tffizmiriltemsilciligi.component";
import { ApplicationStaffIzmirTFF } from "./application/components/staff-izmirtff-list/staff-izmirtff-list.component";

import { ApplicationNewsList } from "./application/components/news-list/news-list.component";
import { ApplicationNewsDetails } from "./application/components/news-details/news-details.component";

import { ApplicationStadiumList } from "./application/components/stadiums-list/stadiums-list.component";
import { ApplicationStadiumDetails } from "./application/components/stadiums-details/stadiums-details.component";


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsModule } from '@angular/google-maps';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularMaterialModule } from "./angular-material.module";
import { AuthInterceptor } from './admin/authentication/auth-interceptor';
import { ErrorInterceptor } from "./error/error-interceptor";

@NgModule({
  declarations: [
    AppComponent,

    //Admin Components
    AdminLogin,
    AdminLogout,

    AdminHeaderComponent,

    AdminHome,

    AdminIzmirASKF,
    AdminStaffIzmirAskf,
    AdminCreateStaffIzmirAskfModal,
    AdminAboutStaffIASKFWrapComponent,

    AdminIzmirTFFIlTemsilciligi,
    AdminStaffIzmirTFF,
    AdminCreateStaffIzmirTFFModal,
    AdminAboutStaffITFFWrapComponent,

    AdminNewsCreate,
    AdminNewsList,
    AdminNewsUpdateModal,
    AdminNewsWrapComponent,

    AdminExternalLinks,
    AdminExternalLinksCreateModal,

    AdminDocumentList,
    AdminDocumentCreateModal,
    AdminDocumentStatuses,
    AdminDocumentInstructions,
    AdminDocumentLicenseForms,
    AdminDocumentDocuments,

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

    AdminScoreBoard,

    AdminPointBoard,

    AdminUsersList,
    AdminUsersCreateModal,



    //Application Components
    PageNotFound,
    ApplicationHeaderComponent,

    ApplicationIzmirASKF,
    ApplicationStaffIzmirAskf,

    ApplicationIzmirTFFIlTemsilciligi,
    ApplicationStaffIzmirTFF,

    ApplicationNewsList,
    ApplicationNewsDetails,

    ApplicationStadiumList,
    ApplicationStadiumDetails

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

    FontAwesomeModule,
    GoogleMapsModule,
    AngularEditorModule,
    AngularMaterialModule,


  ],
  providers: [
    {provide: MatDialogRef, useValue: {}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
