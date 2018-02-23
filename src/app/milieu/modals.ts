import { Component, Input } from '@angular/core';

import { fadeInOutAnimation, modalVueFadeInOut } from './animations';

import { MilieuModalComponent } from './modal';


'use strict';






@Component({
  selector: 'modal-drawer',
  template: `
    <div [ngClass]="{'modal-mode': modalMode}"  (click)="modalClick($event)" [@fadeInOut]="'in'" >
      <div [ngClass]="{'modal-vue-content': modalMode}"><ng-content></ng-content></div>
    </div>`,
  animations: [fadeInOutAnimation]
})
export class ModalDrawerComponent extends MilieuModalComponent {

}
