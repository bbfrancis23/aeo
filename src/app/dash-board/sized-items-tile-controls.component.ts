import { Component, Output, EventEmitter } from '@angular/core';
import { TileControlsComponent } from './tile-controls.component';

'use strict';

@Component({
  selector: 'sized-items-tile-controls',
  template: `<div class="tile-controls-dk">
              <div class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown"></a>
                <div class="dropdown-menu dropdown-menu-right" >
                 <a class="dropdown-item" (click)="hideTileEvent.emit()"><div class="material-icons drawer mi-sm">remove_circle</div> Hide</a>
                 <a class="dropdown-item"  ><div class="material-icons drawer mi-sm">open_in_browser</div> Modal</a>
                 <a class="dropdown-item" (click)="toggleItemSizeEvent.emit()"><div class="material-icons drawer mi-sm">swap_vert</div>Toggle Size</a>
               </div>
             </div>
            </div>`
})
export class SizedItemsTileControlsComponent extends TileControlsComponent {
  @Output() toggleItemSizeEvent = new EventEmitter();
}