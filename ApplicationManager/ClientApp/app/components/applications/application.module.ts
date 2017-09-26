import { NgModule } from '@angular/core';
import { CdkTableModule, DataSource } from '@angular/cdk/table';
import { MatTableModule, MatSortModule, MatDatepickerModule,  MatIconModule, MatInputModule, MatPaginatorModule, } from '@angular/material';
import { ApplicationsComponent } from './applications.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        
        MatDatepickerModule,
        CdkTableModule,
        MatTableModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
    ],
    exports: [ApplicationsComponent],
    declarations: [ApplicationsComponent],
    providers: [],
    entryComponents: [ApplicationsComponent]
})
export class ApplicationModule { }
