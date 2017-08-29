import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
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
import { ApplicationService } from '../_services/application.service';
@Component({
  selector: 'applications',
  templateUrl: 'applications.component.html',
  styleUrls: ["./applications.component.css"],
  providers: [ApplicationService]
})
export class ApplicationsComponent implements OnInit {
  displayedColumns = ['applicationId', 'numML',
   //'address', 'districtName', 
   'statusName', 'createDate', 'endDate', 'groupName'];
  dataSource: ExampleDataSource | null;
  public result: any;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild('filter') filter: ElementRef;
  constructor(private dialogsService: DialogsService, private appService: ApplicationService) {
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.appService, this.paginator, this.sort);
  }

  public openDialog() {
    this.dialogsService.confirm('Заявка', '').subscribe(res => this.result = res);
  }
  public takeInWork(app: Application) {
   // let username=localStorage.getItem("currentUserName");
  //  let groupId=localStorage.getItem("currentUserGroupId");
    this.appService.editApplication(app);
   // console.log(app);

  }
}


export class ExampleDataSource extends DataSource<Application> {
  // The number of issues returned by github matching the query.
  resultsLength = 0;
  isLoadingResults = false;
  //isRateLimitReached = false;

  constructor(private exampleDatabase: ApplicationService,
    private paginator: MdPaginator,
    private sort: MdSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Application[]> {
    const displayDataChanges = [
      this.sort.mdSortChange,

    ];

    // If the user changes the sort order, reset back to the first page.
    this.sort.mdSortChange.subscribe(() => this.paginator.pageIndex = 0);

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;
        return this.exampleDatabase.getApplications(
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