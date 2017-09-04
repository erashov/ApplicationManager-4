import { Component, OnInit, ViewChild, Inject, ElementRef, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MdPaginator, MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { PagingList, Application } from "../_models/index";
import { DialogsService } from '../_services/dialogs.service';
import { ApplicationService } from '../_services/application.service';
import { SelectionModel } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
@Component({
  selector: 'applications',
  templateUrl: 'applications.component.html',
  styleUrls: ["./applications.component.css"],
  //  encapsulation:ViewEncapsulation.None,
  providers: [ApplicationService]
})
export class ApplicationsComponent implements OnInit {
  displayedColumns = ['select', 'applicationId', 'numML',
    //'address', 'districtName', 
    'statusName', 'createDate', 'endDate', 'groupName'];
  dataSource: ExampleDataSource | null;
  public result: any;
  selection = new SelectionModel<string>(true, []);
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild('filter') filter: ElementRef;
  constructor(private dialogsService: DialogsService, private appService: ApplicationService) {
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.appService, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });

  }

  public openDialog() {
    this.dialogsService.confirm('Заявка', '').subscribe(res => this.result = res);
  }
  public takeInWork(app: Application) {
    this.appService.editApplication(app);

  }
  isAllSelected(): boolean {
    //   console.log(this.dataSource);
    if (this.selection.isEmpty()) { return false; }
    /*   console.log(this.dataSource);
      
      if (!this.dataSource) { return false; }
      if (this.selection.isEmpty()) { return false; }
  
      if (this.filter.nativeElement.value) {
        return this.selection.selected.length == this.paginator.pageSize;
      } else {
        return this.selection.selected.length == this.paginator.pageSize;
      } */
    return true;
  }
  masterToggle() {
    // console.log(this.dataSource);
    /*     if (!this.dataSource) { return; }
    
        if (this.isAllSelected()) {
          this.selection.clear();
        } else if (this.filter.nativeElement.value) {
          //this.dataSource.renderedData.forEach(data => this.selection.select(data.id));
        } else {
          // this.exampleDatabase.data.forEach(data => this.selection.select(data.id));
        } */
  }
}

export class ExampleDataSource extends DataSource<Application> {
  resultsLength = 0;
  isLoadingResults = false;
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private exampleDatabase: ApplicationService,
    private paginator: MdPaginator,
    private sort: MdSort) {
    super();
    this._filterChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Application[]> {
    const displayDataChanges = [
      this.sort.mdSortChange,
      this.paginator.page,
      this._filterChange,
    ];

    // If the user changes the sort order, reset back to the first page.
    this.sort.mdSortChange.subscribe(() => this.paginator.pageIndex = 0);

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;
        return this.exampleDatabase.getApplications(
          this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter);
      })
      .map(data => {
        this.isLoadingResults = false;
        // this.isRateLimitReached = false;
        this.resultsLength = data.total_Count;
        return data.items;
      })
      .catch(() => {
        this.isLoadingResults = false;
        // this.isRateLimitReached = true;
        return Observable.of(null);
      });
  }

  disconnect() { }
}