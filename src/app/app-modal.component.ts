import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

'use strict'

/*
  Author: Brian Francis
  Description: Wraps around content to make it a modal

  QA: 12/11/2017
*/

@Component({
  selector: 'app-modal',
  template: `
    <div *ngIf="modalMode === 'on'" [ngClass]="{'app-modal': modalMode === 'on'}"   (click)="modalClick($event)" [@fadeInOut]="modalMode">
      <div class="app-modal-content" ><ng-content></ng-content></div>
    </div>
  `,
    animations: [
      trigger('fadeInOut', [
        state('on', style({transform: 'translateX(0)'})),
        transition('void => *', [
          style({ opacity:0 }),
          animate('500ms linear', style({ opacity:1 }))
        ]),
        transition('* => void', [
          style({ opacity:1 }),
          animate('500ms linear', style({ opacity:0 }))
        ])
      ])
    ]
})
export class AppModalComponent {
  modalMode = 'off';

  modalClick(e) {
    if(e.target.className.search(/app-modal/) > -1  || e.target.className.search(/close-modal/) > -1){
      this.modalMode = 'off';
    }
  }
}

/* copyright AEO all right reserved */
