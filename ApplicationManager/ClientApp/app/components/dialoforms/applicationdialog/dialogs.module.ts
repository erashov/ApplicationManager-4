import { DialogsService } from '../../_services/dialogs.service';
import { MdDialogModule, MdButtonModule,MdIconModule  } from '@angular/material';
import { NgModule } from '@angular/core';
import { ApplicationDialogComponent } from './applicationdialog.componet';

@NgModule({
    imports: [
        MdDialogModule,
        MdButtonModule,
        MdIconModule
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
