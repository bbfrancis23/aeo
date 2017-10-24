import { Component } from '@angular/core';
import { MilieuVueComponent } from '../milieu/milieu-vue.component';
import { MilieuService } from '../milieu/milieu.service';
import { Jem } from './jem';

'use strict';

@Component({
  selector: 'jem-collection-vue',
  template:
  `<div class="card border-info tile text-white" *ngIf="show " >
      <div class="card-header bg-info"><h4>Jem Collection</h4></div>
      <vue-controls [title]="'Jem Collection'" (hideVueEvent)="show=!show" *ngIf="data.dashBoard"></vue-controls>
      <div class="card-block" style="padding: 10px">
      </div>
    </div>`
})
export class JemCollectionVueComponent extends MilieuVueComponent {

  constructor(protected data: MilieuService) { super(data); }

}

/* Copyright AEO all rights reserved */
