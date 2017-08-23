import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './components/app/app.component';
import { routing } from './components/app.routing';

import { AlertComponent } from './components/_directives/index';
import { AuthGuard } from './components/_guards/index';
import { AlertService, AuthenticationService, UserService } from './components/_services/index';
import { UserComponent } from './components/user/user.componet';
import { HomeComponent } from './components/home/index';

import { LoginComponent } from './components/login/index';
import { RegisterComponent } from './components/register/index';
//import {NavBarComponent} from './nav-bar/nav-bar.component';
import { SidebarComponent } from './components/shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './components/shared/components/header/header.component';
import { ApplicationsComponent } from './components/applications/applications.component';
//import { ApplicationEditComponent } from './components/applications/edit/application.edit.component';
import {
    MaterialModule, MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import 'hammerjs';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ApplicationsComponent,
        HeaderComponent,
        SidebarComponent, UserComponent
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule,
        MdInputModule,
        MdButtonModule,
        MdTableModule, MdAutocompleteModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdChipsModule,
        MdCoreModule,
        MdDatepickerModule,
        MdDialogModule,
        MdExpansionModule,
        MdGridListModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdNativeDateModule,
        MdPaginatorModule,
        MdProgressBarModule,
        MdProgressSpinnerModule,
        MdRadioModule,
        MdRippleModule,
        MdSelectModule,
        MdSidenavModule,
        MdSliderModule,
        MdSlideToggleModule,
        MdSnackBarModule,
        MdSortModule,
        MdTableModule,
        MdTabsModule,
        MdToolbarModule,
        MdTooltipModule,
        CdkTableModule,
        routing
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService
    ]

})
export class AppModuleShared {
}
