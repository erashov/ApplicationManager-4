import { DialogsService } from '../../_services/dialogs.service';
import { MdDialogModule, MdButtonModule  } from '@angular/material';
import { NgModule } from '@angular/core';
import { ApplicationDialogComponent } from './applicationdialog.componet';

@NgModule({
    imports: [
        MdDialogModule,
        MdButtonModule,
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
