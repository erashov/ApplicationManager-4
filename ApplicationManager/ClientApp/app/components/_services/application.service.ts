import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Response, RequestOptions,Headers } from '@angular/http';
import { PagingList } from "../_models/pagingList";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Application } from "../_models/index";

@Injectable()
export class ApplicationService {
    //  public url: string;

    constructor(private http: Http, @Inject('BASE_URL') private originUrl: string) {
        //  this.url = originUrl;
    }
    getListPage(page: number, amount: number): Observable<PagingList> {
        return this.http.get(this.originUrl + '/api/Application/getpage?page=' + page + '&pageSize=' + amount).map(response => response.json() as PagingList);
    }

    getList(page: number, amount: number): Observable<Application[]> {
        return this.http.get(this.originUrl + '/api/Application/getpage?page=' + page + '&pageSize=' + amount)
            .map((response: Response) => response.json())
            .map(({ records }) => records);
    }

    getAll(): Observable<Application[]> {
        return this.http.get(this.originUrl + '/api/Application/getAll')
            .map((response: Response) => response.json())
            .map((records) => records);
    }
    getItemAll(): Observable<Application[]> {
        return this.http.get(this.originUrl + '/api/Application/getAll')
            .map(res => res.json())
            .catch(err => Observable.throw(err));
    }

    getApplications(sort: string, order: string, page: number, pageSize: number): Observable<PagingList> {
        const requestUrl =
            `${this.originUrl}api/Application/get?sort=${sort}&order=${order}&page=${page}&pageSize=${pageSize}`;
        return this.http.get(requestUrl,this.jwt()).map(response => response.json() as PagingList);
    }

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
