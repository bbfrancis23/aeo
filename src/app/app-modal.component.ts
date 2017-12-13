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
    ],
    styles: [`
      .app-modal{
        left: 0; top: 0;
        width: 100%; height: 100%;
        display: block;
        position: fixed;
        z-index: 9999;
        overflow: auto;
        background-color: rgba(0,0,0,0.5);
      }
      .app-modal-content{
        margin: 5% auto;
        width: 70%;
        z-index:1 ;
        box-shadow: 10px 10px 1px 0 rgba(0,0,0,0.3)
      }
    `]
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
