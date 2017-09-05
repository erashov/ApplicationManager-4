import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Response, RequestOptions, Headers } from '@angular/http';
import { PagingList } from "../_models/pagingList";
import 'rxjs/add/operator/map';
import { Application } from "../_models/index";
import { ApplicationChangeState } from "../_models/ApplicationChangeState";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApplicationService {
    constructor(private http: Http, @Inject('BASE_URL') private originUrl: string) {}

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

    getApplications(sort: string, order: string, page: number, pageSize: number, filter:string): Observable<PagingList> {
       if(filter.length<3){filter='';}
        
        const requestUrl =
            `${this.originUrl}api/Application/get?sort=${sort}&order=${order}&page=${page}&pageSize=${pageSize}&filter=${filter}`;
        return this.http.get(requestUrl, this.jwt()).map(response => response.json() as PagingList);
    }
    
    editApplication(app: Application) {
        let url = `${this.originUrl}api/Application/update`;
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            app.groupId = currentUser.groupId;
        }
        var appChangeStg: ApplicationChangeState = { applicationId: app.applicationId, groupId: app.groupId };
        const body = JSON.stringify(appChangeStg);
        this.http.put(url, appChangeStg, this.jwt()).map(res => res.json()).subscribe(() => {  }//this.router.navigate(['/applications'])
        );


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
