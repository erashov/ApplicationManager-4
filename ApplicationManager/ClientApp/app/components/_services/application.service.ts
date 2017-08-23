import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { PagingList } from "../_models/pagingList";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Application } from "../_models/index";

@Injectable()
export class ApplicationService {
    public url: string;

    constructor(private http: Http, @Inject('BASE_URL') originUrl: string) {
        this.url = originUrl;
    }
    getListPage(page: number, amount: number): Observable<PagingList> {
        return this.http.get(this.url + '/api/Application/getpage?page=' + page + '&pageSize=' + amount).map(response => response.json() as PagingList);
    }

    getList(page: number, amount: number): Observable<Application[]> {
        return this.http.get(this.url + '/api/Application/getpage?page=' + page + '&pageSize=' + amount)
            .map((response: Response) => response.json())
            .map(({ records }) => records);
    }

    getAll(): Observable<Application[]> {
        return this.http.get(this.url + '/api/Application/getAll')
            .map((response: Response) => response.json())
            .map((records) => records);
    }
    getItemAll(): Observable<Application[]> {
        return this.http.get(this.url + '/api/Application/getAll')
            .map(res => res.json())
            .catch(err => Observable.throw(err));
    }

    getApplications(sort: string, order: string, page: number): Observable<Response> {
        //const href = 'https://api.github.com/search/issues';
        const requestUrl =
            `${this.url}/api/Application/getpage?sort=${sort}&order=${order}&page=${page + 1}`;

        return this.http.get(requestUrl);
    }


}
