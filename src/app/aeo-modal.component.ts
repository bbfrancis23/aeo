import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

'use strict'

/*
  Author: Brian Francis
  Description:

  QA:
*/

@Component({
  selector: 'aeo-modal',
  template: `
    <div [ngClass]="{'aeo-modal': modalMode}"  (click)="modalClick($event)" [@fadeInOut]="modalMode" *ngIf='modalMode'>
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
    ],
    styles: [`
      .aeo-modal{
        right: 0; top: 0px;
        width: 100%;
        height: 100%;
        display: block;
        position: fixed;
        z-index: 9999;
        overflow: auto;
      }

      .aeo-modal-content{
        margin: 5% auto;
        width: 90%;
        z-index:1 ;
      }
    `]
})
export class AeoModalComponent {
  modalMode = false;

  modalClick(e) {
    if(e.target.className.search(/aeo-modal/) > -1  || e.target.className.search(/close-modal/) > -1){
      this.modalMode = false;
    }
  }

  toggleModalMode(){
    console.log('You clicked modal toggle');
  }
}

/* copyright AEO all right reserved */
