import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

'use strict'

/*
  Author: Brian Francis
  Description: Wraps around a Vue to turn it into a Modal

  Vue: Milieu Control (Accessor/Mutator)
  Modal: An overlay of regular conent.

  QA: 11-28-2017
*/

@Component({
  selector: 'modal-vue',
  template: `
    <div [ngClass]="{'vue-modal': modalMode}"  (click)="modalClick($event)" [@fadeInOut]="modalMode">
      <div [ngClass]="{'vue-modal-content': modalMode}"><ng-content></ng-content></div>
    </div>`,
    animations: [
      trigger('fadeInOut', [
        state('true', style({transform: 'translateX(0)'})),
        transition('false => true', [
          style({ opacity:0 }),
          animate('500ms linear', style({ opacity:1 }))
        ]),
        transition('true => false', [
          style({ opacity:0 }),
          animate('500ms linear', style({ opacity:1 }))
        ])
      ])
    ]
})
export class ModalVueComponent {
  modalMode = false;

  modalClick(e) {
    if(e.target.className.search(/vue-modal/) > -1  || e.target.className.search(/close-modal/) > -1){
      this.modalMode = false;
    }
  }


}

/* copyright AEO all right reserved */
