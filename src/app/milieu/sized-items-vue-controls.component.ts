import { Component,  EventEmitter, Input, Output  } from '@angular/core';
import { VueControlsComponent } from './vue-controls.component';

'use strict';

@Component({
  selector: 'sized-items-vue-controls',
  template: `
    <div class="vue-controls-dk dropdown" >
      <a class="dropdown-toggle" data-toggle="dropdown"></a>
      <div class="dropdown-menu dropdown-menu-right" >
        <a class="dropdown-item" (click)="hideVueEvent.emit()"><div class="material-icons">remove_circle</div> Hide</a>
        <a class="dropdown-item" (click)="modalVueEvent.emit()"  ><div class="material-icons">open_in_browser</div> Modal</a>
        <a class="dropdown-item" (click)="toggleItemSizeEvent.emit()"><div class="material-icons">swap_vert</div>Toggle Size</a>
      </div>
    </div>`
})
export class SizedItemsVueControlsComponent extends VueControlsComponent {

  @Output() toggleItemSizeEvent = new EventEmitter();
}
/* Copyright AEO all rights reserved */
