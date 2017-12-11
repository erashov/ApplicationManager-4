import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {MatTableDataSource} from '@angular/material';
@Component({
    selector: 'application-dialog',
    templateUrl: 'applicationdialog.componet.html'
})

export class ApplicationDialogComponent {
    displayedColumns = ['position', 'name', 'weight', 'symbol'];
    dataSource1 = new MatTableDataSource<Element>(ELEMENT_DATA);
  
    public title: string;
    public message: string;

    constructor(public dialogRef: MatDialogRef<ApplicationDialogComponent>) {

    }

}
export interface Element {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }
  
  const ELEMENT_DATA: Element[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},

  ];