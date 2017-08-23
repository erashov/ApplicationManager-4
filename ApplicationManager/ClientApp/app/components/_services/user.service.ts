import { Injectable,Inject } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";

import { User } from "../_models/index";

@Injectable()
export class UserService {
        public url:string;
    constructor(private http: Http, @Inject('BASE_URL') originUrl: string) {
        this.url = originUrl;
    }

    // tslint:disable-next-line:typedef
    getAll() {
        return this.http.get( this.url + "/api/users", this.jwt()).map((response: Response) => response.json());
    }

    // tslint:disable-next-line:typedef
    getById(id: number) {
        return this.http.get( this.url + "/api/users/" + id, this.jwt()).map((response: Response) => response.json());
    }

    // tslint:disable-next-line:typedef
    create(user: User) {
        return this.http.post( this.url + "/api/Account", user, this.jwt()).map((response: Response) => response.json());
    }

    // tslint:disable-next-line:typedef
    update(user: User) {
        return this.http.put( this.url + "/api/users/" + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    // tslint:disable-next-line:typedef
    delete(id: number) {
        return this.http.delete( this.url + "/api/users/" + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    // tslint:disable-next-line:typedef
    private jwt() {
        // create authorization header with jwt token
        // tslint:disable-next-line:typedef
        let headers = new Headers();
        headers.append("Content-Type","application/json");
        // tslint:disable-next-line:typedef
        let currentUser =JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.token) {
            // tslint:disable-next-line:typedef
           headers.append( "Authorization", "Bearer " + currentUser.token);
        }
        return new RequestOptions({ headers: headers });
    }
}