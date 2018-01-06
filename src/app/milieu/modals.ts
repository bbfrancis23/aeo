import { Component } from '@angular/core';
import { fadeInOutAnimation, modalVueFadeInOut } from './animations';


'use strict';


@Component({
  selector: 'milieu-modal',
  template: `
    <div *ngIf="modalMode === true" [ngClass]="{'modal-mode': modalMode === true}"   (click)="modalClick($event)" [@fadeInOut]="'in'">
      <div class="modal-content" ><ng-content></ng-content></div>
    </div>
  `,
    animations: [ fadeInOutAnimation]
})
export class MilieuModalComponent {
  modalMode = false;


  modalClick(e) {
    //console.log(e);

    if(e.target.className.search(/modal-mode/) > -1  || e.target.className.search(/close-modal/) > -1){
      this.modalMode = false;


    }
  }
}

@Component({
  selector: 'modal-vue',
  template: `
    <div [ngClass]="{'modal-mode': modalMode}"  (click)="modalClick($event)" [@modalVueFadeInOut]="modalMode">
      <div [ngClass]="{'modal-vue-content': modalMode}"><ng-content></ng-content></div>
    </div>`,
    animations: [ modalVueFadeInOut ]
})
export class ModalVueComponent extends MilieuModalComponent{
}
