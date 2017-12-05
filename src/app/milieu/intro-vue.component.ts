import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MilieuVue } from './milieu-vue';

'use strict';

@Component({
  selector: 'intro-vue',
  template:
    `<modal-vue>
      <div [ngClass]="{modal: modal}">
        <div class="card border-primary vue" [@fadeInOut]="'in'" *ngIf="show" >
          <img class="card-img-top" [src]="milieuService.config.img" alt="{{milieuService.config.title}}">
          <vue-controls (hideVueEvent)="show=false" (modalVueEvent)="modalChild.modalMode=true" *ngIf="!modalChild.modalMode && milieuService.dashBoard"></vue-controls>
          <modal-controls *ngIf="modalChild.modalMode === true"></modal-controls>
          <div class="card-block">
            <h4 class="card-title">{{milieuService.config.title}}</h4>
            <p class="card-text">{{milieuService.config.intro}}</p>
          </div>
        </div>
      </div>
    </modal-vue>`,
    animations: [
      trigger('fadeInOut', [
        state('in', style({transform: 'translateX(0)'})),
        transition('void => *', [
          style({ opacity:0 }),
          animate('1000ms ease-in-out', style({ opacity:1 }))
        ]),
        transition('* => void', [
          style({ opacity:1 }),
              animate('1000ms ease-in-out', style({ opacity:0 }))
        ])
      ])
    ]
})
export class IntroVueComponent extends MilieuVue {
  @Input() milieuService: any;
}

/* Copyright AEO all rights reserved */
