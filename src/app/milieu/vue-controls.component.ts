import { Component, Output, EventEmitter } from '@angular/core';
import { MilieuService } from './milieu.service';

'use strict';

@Component({
  selector: 'vue-controls',
  template: `<div class="tile-controls">
              <div class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown"></a>
                <div class="dropdown-menu dropdown-menu-right" >
                 <a class="dropdown-item" (click)="hideVueEvent.emit()"><div class="material-icons drawer mi-sm">remove_circle</div> Hide</a>
                 <a class="dropdown-item" (click)="modalVueEvent.emit()"><div class="material-icons drawer mi-sm">open_in_browser</div> Modal</a>
               </div>
             </div>
            </div>`
})
export class VueControlsComponent {
  @Output() hideVueEvent = new EventEmitter();
  @Output() modalVueEvent = new EventEmitter();
  constructor(protected data: MilieuService) { }
}
/* Copyright AEO all rights reserved */
