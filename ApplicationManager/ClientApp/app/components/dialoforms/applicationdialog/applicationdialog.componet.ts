import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
@Component({
    selector: 'application-dialog',
    templateUrl: 'applicationdialog.componet.html'
})

export class ApplicationDialogComponent {

    public title: string;
    public message: string;

    constructor(public dialogRef: MatDialogRef<ApplicationDialogComponent>) {

    }

}