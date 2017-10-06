import { Observable } from 'rxjs/Rx';
import { ApplicationDialogComponent } from '../dialoforms/applicationdialog/applicationdialog.componet';
import { MatDialogRef, MatDialog,MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {

    constructor(private dialog: MatDialog) { }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<ApplicationDialogComponent>;

        dialogRef = this.dialog.open(ApplicationDialogComponent, {
            panelClass: 'my-full-screen-dialog', 
            height: '100%',
            width: '100%'
        });
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}
