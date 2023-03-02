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
import { HttpClientModule } from "@angular/common/http";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';


import { AppComponent } from './app.component';
import { AdminHeaderComponent } from './admin/components/header/header.component';
import { PageNotFound } from './admin/components/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';

import { AdminIzmirASKF } from './admin/components/aboutizmiraskf/aboutizmiraskf.component';
import { AdminStaffIzmirAskf } from './admin/components/staff-izmiraskf-list/staff-izmiraskf-list.component';
import { CreateAdminStaffIzmirAskfModal } from "./admin/components/staff-izmiraskf-create/staff-izmiraskf-create.component";
import { AboutStaffIASKFWrapComponent } from "./admin/components/about-staff-iaskf-wrap/about-staff-iaskf-wrap.component";

import { AdminIzmirTFFIlTemsilciligi } from './admin/components/aboutizmirtffiltemsilciligi/aboutizmirtffiltemsilciligi.component';
import { AdminStaffIzmirTFF } from "./admin/components/staff-izmirtff-list/staff-izmirtff-list.component";
import { CreateAdminStaffIzmirTFFModal } from "./admin/components/staff-izmirtff-create/staff-izmirtff-create.component";
import { AboutStaffITFFWrapComponent } from "./admin/components/about-staff-itff-wrap/about-staff-itff-wrap.component";

import { NewsCreateComponent } from './admin/components/news-create/news-create.component';
import { NewsListComponent } from './admin/components/news-list/news-list.component';
import { NewsUpdateModal } from './admin/components/news-update/news-update.component';
import { NewsWrapComponent } from './admin/components/news-wrap-component/news-wrap-component.component';

import { AdminExternalLinks } from "./admin/components/external-links-list/external-links-list.component";
import { AdminExternalLinksCreateModal } from "./admin/components/external-links-create/external-links-create.component";

import { AdminDocumentList } from "./admin/components/documents-list/documents-list.component";
import { AdminDocumentCreateModal } from "./admin/components/documents-create/documents-create.component";
import { AdminDocumentStatuses } from "./admin/components/documents-statuses-list/documents-statuses-list.component";
import { AdminDocumentInstructions } from "./admin/components/documents-instructions-list/documents-instructions-list.component";
import { AdminDocumentLicenseForms } from "./admin/components/documents-license-forms-list/documents-license-forms-list.component";
import { AdminDocumentDocuments } from "./admin/components/documents-documents-list/documents-documents-list.component";

import { StadiumsListComponent } from "./admin/components/stadiums-list/stadiums-list.component";
import { StadiumsCreateModal } from "./admin/components/stadiums-create/stadiums-create.component";

import { TeamsList } from "./admin/components/teams-list/teams-list.component";
import { TeamsCreateModal } from './admin/components/teams-create/teams-create.component';

import { AdminDisciplinaryBoardFilesList } from "./admin/components/disciplinary-board-files-list/disciplinary-board-files-list.component";
import { AdminDisciplinaryBoardCreateModal } from "./admin/components/disciplinary-board-files-create/disciplinary-board-files-create.component";

import { AdminDisciplinaryBoardDecisionsList } from "./admin/components/disciplinary-board-decisions-list/disciplinary-board-decisions-list.component";


import { AdminSeasonsList } from "./admin/components/seasons-list/seasons-list.component";
import { AdminSeasonsCreateModal } from "./admin/components/seasons-create/seasons-create.component";

import { AdminLeaguesList } from "./admin/components/leagues-list/leagues-list.component";
import { AdminLeaguesCreateModal } from './admin/components/leagues-create/leagues-create.component';

import { AdminGroupList } from "./admin/components/groupstages-list/groupstages-list.component";
import { AdminGroupStagesCreateModal } from "./admin/components/groupstages-create/groupstages-create.component";

import { TeamsInGroupstages } from "./admin/components/teams-in-groupstages/teams-in-groupstages.component";
import { TeamsInDisqualifications } from "./admin/components/teams-in-disqualifications/teams-in-disqualifications.component";
import { TeamsInDisqualificationsEditModal } from "./admin/components/teams-in-disqualifications-edit/teams-in-disqualifications-edit.component";

import { FixtureCreate } from "./admin/components/fixture-create/fixture-create.component";
import { FixtureEditModal } from "./admin/components/fixture-edit/fixture-edit.component";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    PageNotFound,

    AdminIzmirASKF,
    AdminStaffIzmirAskf,
    CreateAdminStaffIzmirAskfModal,
    AboutStaffIASKFWrapComponent,

    AdminIzmirTFFIlTemsilciligi,
    AdminStaffIzmirTFF,
    CreateAdminStaffIzmirTFFModal,
    AboutStaffITFFWrapComponent,

    NewsCreateComponent,
    NewsListComponent,
    NewsUpdateModal,
    NewsWrapComponent,

    AdminExternalLinks,
    AdminExternalLinksCreateModal,

    AdminDocumentList,
    AdminDocumentCreateModal,
    AdminDocumentStatuses,
    AdminDocumentInstructions,
    AdminDocumentLicenseForms,
    AdminDocumentDocuments,

    StadiumsListComponent,
    StadiumsCreateModal,

    TeamsList,
    TeamsCreateModal,

    AdminDisciplinaryBoardFilesList,
    AdminDisciplinaryBoardCreateModal,

    AdminDisciplinaryBoardDecisionsList,

    AdminSeasonsList,
    AdminSeasonsCreateModal,

    AdminLeaguesList,
    AdminLeaguesCreateModal,

    AdminGroupList,
    AdminGroupStagesCreateModal,

    TeamsInGroupstages,
    TeamsInDisqualifications,
    TeamsInDisqualificationsEditModal,

    FixtureCreate,
    FixtureEditModal

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
    FontAwesomeModule
  ],
  providers: [{provide: MatDialogRef, useValue: {}}, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
