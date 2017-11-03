import { Component } from '@angular/core';
import { MilieuVueComponent } from './milieu-vue.component';
import { MilieuService } from './milieu.service';

'use strict';

// opt-js-html-css //

@Component({
  selector: 'intro-vue',
  template:
  ` <modal-vue><div [ngClass]="{modal: modal}">
      <div class="card border-primary vue" *ngIf="show" >
        <img class="card-img-top" [src]="data.config.img" alt="{{data.config.title}}">
        <vue-controls (hideVueEvent)="show=false" (modalVueEvent)="modalChild.modalMode=true" *ngIf="!modalChild.modalMode && data.dashBoard"></vue-controls>
        <modal-controls *ngIf="modalChild.modalMode === true"></modal-controls>
        <div class="card-block">
          <h4 class="card-title">{{data.config.title}}</h4>
          <p class="card-text">{{data.config.intro}}</p>
        </div>
      </div>
    </div></modal-vue>`
})
export class IntroVueComponent extends MilieuVueComponent { constructor(protected data: MilieuService) { super(data); } }

/* Copyright AEO all rights reserved */
