import { Component } from '@angular/core';
import { MillieuVueComponent } from '../millieu/millieu-vue.component';
import { MillieuService } from '../millieu/millieu.service';
import { Jem } from './jem';

'use strict';

@Component({
  selector: 'jem-collection-tile',
  template:
  `<div class="card border-info tile text-white" *ngIf="show " >
      <div class="card-header bg-info"><h4>Jem Collection</h4></div>
      <tile-controls [title]="'Jem Collection'" (hideTileEvent)="show=!show" *ngIf="data.dashBoard"></tile-controls>
      <div class="card-block" style="padding: 10px">
      </div>
    </div>`
})
export class JemCollectionTileComponent extends MillieuVueComponent {

  constructor(protected data: MillieuService) { super(data); }

}

/* Copyright AEO all rights reserved */
