import { DialogsService } from '../../_services/dialogs.service';
import { MatDialogModule, MatButtonModule,MatIconModule  } from '@angular/material';
import { NgModule } from '@angular/core';
import { ApplicationDialogComponent } from './applicationdialog.componet';

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        ApplicationDialogComponent,
    ],
    declarations: [
        ApplicationDialogComponent,
    ],
    providers: [
        DialogsService,
    ],
    entryComponents: [
        ApplicationDialogComponent,
    ],
})
export class DialogsModule { }
