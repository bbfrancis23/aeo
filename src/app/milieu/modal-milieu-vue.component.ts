import { Component } from '@angular/core';

'use strict'

@Component({
  selector: 'modal-vue',
  template: `
    <div [ngClass]="{'aeo-modal': modalMode}"  (click)="outSideClick($event)">
      <div [ngClass]="{'aeo-modal-content': modalMode}">
        <ng-content></ng-content>
      </div>
    </div>`

})
export class ModalMilieuVueComponent {
  modalMode = false;

  outSideClick(e) {

    console.log(e.target.className);

    if (e.target.className === 'aeo-modal' || e.target.className === 'close-modal') {
      this.modalMode = false;
    }
  }


}

/* copyright AEO all right reserved */
