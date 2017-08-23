import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { AlertService, AuthenticationService } from "../_services/index";
import { routerTransition } from '../router.animations';
import { FormControl, Validators } from "@angular/forms";


@Component({
    moduleId: module.id.toString(),
    templateUrl: "login.component.html",
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})


export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    loginFormControl = new FormControl('', [
        Validators.required]);
    passwordFormControl = new FormControl('', [
        Validators.required]);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }


    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        console.log(this.loginFormControl.value);
        
        this.loading = true;
        this.authenticationService.login(this.loginFormControl.value, this.passwordFormControl.value)
            .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
}
