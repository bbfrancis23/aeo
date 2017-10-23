import { Component, Output, EventEmitter } from '@angular/core';
import { VueControlsComponent } from './vue-controls.component';
import { MillieuService } from './millieu.service';

'use strict';

@Component({
  selector: 'sized-items-vue-controls',
  template: `<div class="tile-controls-dk" >
              <div class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown"></a>
                <div class="dropdown-menu dropdown-menu-right" >
                 <a class="dropdown-item" (click)="hideVueEvent.emit()"><div class="material-icons drawer mi-sm">remove_circle</div> Hide</a>
                 <a class="dropdown-item" (click)="modalVueEvent.emit()"  ><div class="material-icons drawer mi-sm">open_in_browser</div> Modal</a>
                 <a class="dropdown-item" (click)="toggleItemSizeEvent.emit()"><div class="material-icons drawer mi-sm">swap_vert</div>Toggle Size</a>
               </div>
             </div>
            </div>`
})
export class SizedItemsVueControlsComponent extends VueControlsComponent {



  @Output() toggleItemSizeEvent = new EventEmitter();
  constructor(protected data: MillieuService) { super(data); }
}
/* Copyright AEO all rights reserved */
