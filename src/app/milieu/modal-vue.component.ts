import { Component } from '@angular/core';

import { trigger, state, style, animate, transition } from '@angular/animations';

'use strict'

// opt-js-html //

@Component({
  selector: 'modal-vue',
  template: `
    <div [ngClass]="{'aeo-modal': modalMode}"  (click)="modalClick($event)" [@fadeInOut]="modalMode">
      <div [ngClass]="{'aeo-modal-content': modalMode}"><ng-content></ng-content></div>
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
    if(e.target.className.search(/aeo-modal/) > -1  || e.target.className.search(/close-modal/) > -1){
      this.modalMode = false;
    }
  }
}

/* copyright AEO all right reserved */
