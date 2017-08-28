import { Injectable, Inject } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";

@Injectable()
export class AuthenticationService {
    //public url: string;
    // public localStorage : any;
    constructor(private http: Http, @Inject('BASE_URL') private originUrl: string) {
       // this.url = originUrl;
    }


    login(username: string, password: string) {

        let headers = new Headers({ "Content-Type": "application/json" });
 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.originUrl + "api/Account/token", JSON.stringify({ email: username, password: password }), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response

                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes

                    //if (typeof window !== "undefined") {
                        localStorage.setItem("currentUser", JSON.stringify(user));
                       // localStorage.setItem("currentUserName",username)
                        //localStorage.setItem("currentGroupID",groupId)

                  //  }
                }
            });
    }


    logout() {
        // remove user from local storage to log user out
   //   if (typeof window !== "undefined") {
        localStorage.removeItem("currentUser");
       // localStorage.removeItem("currentUserName");
      // }
    }
}