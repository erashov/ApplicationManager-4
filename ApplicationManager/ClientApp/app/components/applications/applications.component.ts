import { Component, OnInit, ViewChild, Inject, ElementRef, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MdPaginator, MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Application } from "../_models/index";
import { DialogsService } from '../_services/dialogs.service';
import { ApplicationService } from '../_services/application.service';
import { SelectionModel } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'applications',
  templateUrl: 'applications.component.html',
  styleUrls: ["./applications.component.css"],
  //encapsulation:ViewEncapsulation.None,
  providers: [ApplicationService]
})
export class ApplicationsComponent implements OnInit {
  displayedColumns = [
    //'select', 
    'applicationId', 'numML',
    //'address', 'districtName', 
    'statusName', 'createDate', 'endDate', 'groupName'];
  dataSource: ExampleDataSource | null;
  count = 1;
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
    ++this.count;
    this.appService.editApplication(app).subscribe(() => {
      if (!this.dataSource) { return; }
      this.dataSource.refresh = this.count.toString()
    });
  }
  isAllSelected(): boolean {
  //  console.log("1111110");
    if (!this.dataSource) { return false; }
    if (this.selection.isEmpty()) { return false; }

    if (this.filter.nativeElement.value) {

      return this.selection.selected.length == this.dataSource.data.length
    } else {
      return this.selection.selected.length == this.dataSource.data.length;
    }
  }
  masterToggle() {
    console.log("1111111");


    if (!this.dataSource) { return; }

    if (this.isAllSelected()) {
      console.log("1111112");
      this.selection.clear();
    } else {
      console.log("1111113");
      this.dataSource.data.forEach(data => //console.log(data.applicationId.toString())
       this.selection.select(data.applicationId.toString())
      );
     // console.log(this.selection.selected);

    }
    console.log(this.selection.selected);
  }
}

export class ExampleDataSource extends DataSource<Application> {
  resultsLength = 0;
  isLoadingResults = false;
  data: Application[];


  _refreshChange = new BehaviorSubject('');
  get refresh(): string { return this._refreshChange.value; }
  set refresh(refresh: string) {
    this._refreshChange.next(refresh);
  }

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
      this._refreshChange
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
        this.data = data.items;
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