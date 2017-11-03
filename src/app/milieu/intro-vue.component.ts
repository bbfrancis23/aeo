import { Component } from '@angular/core';
import { MilieuVueComponent } from './milieu-vue.component';
import { MilieuService } from './milieu.service';

'use strict';

// js-opt //

@Component({
  selector: 'intro-vue',
  template:
  ` <div [ngClass]="{modal: modal}">
      <div class="card border-primary tile" *ngIf="show" >
        <img class="card-img-top" [src]="data.config.img" alt="{{data.config.title}}">
        <div class="tile-controls" *ngIf="data.dashBoard" ><a class="material-icons tile-item" (click)="show=false;" >clear</a></div>
        <div class="card-block p-3">
          <h4 class="card-title">{{data.config.title}}</h4>
          <p class="card-text">{{data.config.intro}}</p>
        </div>
      </div>
    </div>`
})
export class IntroVueComponent extends MilieuVueComponent { constructor(protected data: MilieuService) { super(data); } }

/* Copyright AEO all rights reserved */
