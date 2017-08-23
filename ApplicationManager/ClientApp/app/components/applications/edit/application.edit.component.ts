import { Component, OnInit,Input } from '@angular/core';

//import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'application-edit',
    templateUrl: 'application.edit.component.html'
})

export class ApplicationEditComponent implements OnInit {
  @Input() name;

  constructor() {}

    ngOnInit() { }
}