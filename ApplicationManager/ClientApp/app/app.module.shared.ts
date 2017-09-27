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
import { HomeComponent } from './components/home/index';
import { ApplicationModule } from './components/applications/application.module'
import { LoginComponent } from './components/login/index';
import { RegisterComponent } from './components/register/index';
import { SidebarComponent } from './components/shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './components/shared/components/header/header.component';
import { MatToolbarModule, MatSidenavModule, MatMenuModule, MatButtonModule, MatInputModule, MatIconModule } from '@angular/material';
import { DialogsModule } from './components/dialoforms/applicationdialog/dialogs.module';
import 'hammerjs';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        SidebarComponent
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MatToolbarModule,
        MatSidenavModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        ApplicationModule,
        DialogsModule,
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
