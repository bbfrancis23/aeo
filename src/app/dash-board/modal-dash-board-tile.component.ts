import { Component } from '@angular/core';

'use strict'

@Component({
  selector: 'modal-tile',
  template: `
    <div [ngClass]="{'aeo-modal': modalMode}"  (click)="outSideClick($event)">
      <div [ngClass]="{'aeo-modal-content': modalMode}">
        <ng-content></ng-content>
      </div>
    </div>`

})
export class ModalDashBoardTileComponent {
  modalMode = false;

  outSideClick(e) {

    if (e.target.className === 'aeo-modal') {
      this.modalMode = false;
    }
  }
}
