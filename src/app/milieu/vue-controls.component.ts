import { Component, Output, EventEmitter } from '@angular/core';
import { MilieuService } from './milieu.service';

'use strict';

// opt-js-html-css //


@Component({
  selector: 'vue-controls',
  template: `
    <div class="vue-controls dropdown">
      <a class="dropdown-toggle" data-toggle="dropdown"></a>
      <div class="dropdown-menu dropdown-menu-right" >
        <a class="dropdown-item" (click)="hideVueEvent.emit()"><div class="material-icons">remove_circle</div> Hide</a>
        <a class="dropdown-item" (click)="modalVueEvent.emit()"><div class="material-icons">open_in_browser</div> Modal</a>
      </div>
    </div>`
})
export class VueControlsComponent {

  _show = true;

  @Output() hideVueEvent = new EventEmitter();
  @Output() modalVueEvent = new EventEmitter();
  constructor(protected data: MilieuService) { }

  get show(){
    return this._show;
  }
}
/* Copyright AEO all rights reserved */
