import { Component } from '@angular/core';

'use strict'

// opt-js //

@Component({
  selector: 'modal-vue',
  template: `
    <div [ngClass]="{'aeo-modal': modalMode}"  (click)="modalClick($event)">
      <div [ngClass]="{'aeo-modal-content': modalMode}">
        <ng-content></ng-content>
      </div>
    </div>`

})
export class ModalVueComponent {
  modalMode = false;

  modalClick(e) {
    if (e.target.className === 'aeo-modal' || e.target.className === 'close-modal') {
      this.modalMode = false;
    }
  }


}

/* copyright AEO all right reserved */
