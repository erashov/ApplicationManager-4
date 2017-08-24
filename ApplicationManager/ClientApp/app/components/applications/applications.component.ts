import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { DataSource } from '@angular/cdk';
import { MdPaginator, MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { PagingList, Application } from "../_models/index";
import { DialogsService } from '../_services/dialogs.service';
@Component({
  selector: 'applications',
  templateUrl: 'applications.component.html',
  styleUrls: ["./applications.component.scss"],// providers: [ApplicationService]
})
export class ApplicationsComponent implements OnInit {
  displayedColumns = ['applicationId', 'numML', 'address', 'districtName', 'statusName', 'createDate', 'endDate'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource: ExampleDataSource | null;
  public result: any;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  constructor(private http: Http, @Inject('BASE_URL') private originUrl: string, private dialogsService: DialogsService) {
  }

  ngOnInit() {
    this.exampleDatabase = new ExampleHttpDao(this.http, this.originUrl);
    this.dataSource = new ExampleDataSource(this.exampleDatabase!, this.paginator, this.sort);
  }

  public openDialog() {
    this.dialogsService
      .confirm('Confirm Dialog 1', 'Are you sure you want to do this?').subscribe(res => this.result = res);
    ;
  }
}
/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor(private http: Http, private originUrl: string) { }

  getRepoIssues(sort: string, order: string, page: number, pageSize: number): Observable<PagingList> {
    const requestUrl =
      `${this.originUrl}api/Application/get?sort=${sort}&order=${order}&page=${page}&pageSize=${pageSize}`;
    return this.http.get(requestUrl).map(response => response.json() as PagingList);
  }
}

export class ExampleDataSource extends DataSource<Application> {
  // The number of issues returned by github matching the query.
  resultsLength = 0;
  isLoadingResults = false;
  //isRateLimitReached = false;

  constructor(private exampleDatabase: ExampleHttpDao,
    private paginator: MdPaginator,
    private sort: MdSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Application[]> {
    const displayDataChanges = [
      this.sort.mdSortChange,
      this.paginator.page
    ];

    // If the user changes the sort order, reset back to the first page.
    this.sort.mdSortChange.subscribe(() => this.paginator.pageIndex = 0);

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;
        return this.exampleDatabase.getRepoIssues(
          this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
      })
      .map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        // this.isRateLimitReached = false;
        this.resultsLength = data.total_Count;
        return data.items;
      })
      .catch(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        // this.isRateLimitReached = true;
        return Observable.of(null);
      });
  }

  disconnect() { }
}