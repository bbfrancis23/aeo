import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TileControlsComponent } from './tile-controls';

@Component({
  selector: 'sized-items-tile-controls',
  template: `<div class="tile-controls-dk">
              <div class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown"></a>
                <div class="dropdown-menu dropdown-menu-right" >
                 <a class="dropdown-item" (click)="hideTileEvent.emit()"> Hide {{title}} Tile</a>
                 <a class="dropdown-item"  >Turn {{title}} Tile into a Modal</a>
                 <a class="dropdown-item" (click)="toggleItemSizeEvent.emit()">Toggle {{title}} Items Size</a>
               </div>
             </div>
            </div>`
})
export class SizedItemsTileControlsComponent extends TileControlsComponent {

  @Output() toggleItemSizeEvent = new EventEmitter();
  //@Input() title: string;
  //@Output() hideTileEvent = new EventEmitter();


}
