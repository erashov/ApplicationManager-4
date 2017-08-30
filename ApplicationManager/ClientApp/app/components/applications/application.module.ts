import { NgModule } from '@angular/core';
import { CdkTableModule, DataSource } from '@angular/cdk/table';
import { MdTableModule, MdSortModule, MdDatepickerModule, MaterialModule, MdIconModule, MdInputModule, MdPaginatorModule, } from '@angular/material';
import { ApplicationsComponent } from './applications.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        MdDatepickerModule,
        CdkTableModule,
        MdTableModule,
        MdIconModule,
        MdInputModule,
        MdPaginatorModule,
        MdSortModule,
    ],
    exports: [ApplicationsComponent],
    declarations: [ApplicationsComponent],
    providers: [],
    entryComponents: [ApplicationsComponent]
})
export class ApplicationModule { }
