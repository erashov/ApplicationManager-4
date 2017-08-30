import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: './app.component.html',
    encapsulation:ViewEncapsulation.None,
   // styles:[require('../style.scss')],
     styleUrls:['./app.component.css']


})
export class AppComponent {
}
