import { Component, Output, EventEmitter } from '@angular/core';
import { DashBoardService } from '../dash-board/dash-board.service';

'use strict';

@Component({
  selector: 'tile-controls',
  template: `<div class="tile-controls">
              <div class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown"></a>
                <div class="dropdown-menu dropdown-menu-right" >
                 <a class="dropdown-item" (click)="hideTileEvent.emit()"><div class="material-icons drawer mi-sm">remove_circle</div> Hide</a>
                 <a class="dropdown-item" (click)="modalTileEvent.emit()"><div class="material-icons drawer mi-sm">open_in_browser</div> Modal</a>
               </div>
             </div>
            </div>`
})
export class TileControlsComponent {
  @Output() hideTileEvent = new EventEmitter();
  @Output() modalTileEvent = new EventEmitter();
  constructor(protected data: DashBoardService) { }
}
/* Copyright AEO all rights reserved */
