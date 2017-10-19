import { Component } from '@angular/core';
import { DashBoardTileComponent } from '../dash-board/dash-board-tile.component';
import { DashBoardService } from '../dash-board/dash-board.service';
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
export class JemCollectionTileComponent extends DashBoardTileComponent {

  constructor(protected data: DashBoardService) { super(data); }

}

/* Copyright AEO all rights reserved */
