import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { User } from "../_models/index";

@Injectable()
export class UserService {
    public url: string;
    constructor(private http: Http, @Inject('BASE_URL') originUrl: string) {
        this.url = originUrl;
    }

    getAll() {
        return this.http.get(this.url + "/api/users", this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.url + "/api/users/" + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.url + "/api/Account", user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(this.url + "/api/users/" + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.url + "/api/users/" + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.token) {

            headers.append("Authorization", "Bearer " + currentUser.token);
        }
        return new RequestOptions({ headers: headers });
    }
}