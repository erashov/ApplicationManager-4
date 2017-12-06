import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/index";
import { LoginComponent } from "./login/index";
import { RegisterComponent } from "./register/index";
import { AuthGuard } from "./_guards/index";
import { ApplicationsComponent } from './applications/applications.component';
const appRoutes: Routes = [
    { path: "", component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: "applications", component: ApplicationsComponent, canActivate: [AuthGuard],pathMatch: 'full' },
    { path: "login", component: LoginComponent,pathMatch: 'full' },
    { path: "register", component: RegisterComponent,pathMatch: 'full' },
    // otherwise redirect to home
    { path: "**", redirectTo: "" }
];

export const routing = RouterModule.forRoot(appRoutes);