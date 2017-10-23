import { ViewChild } from '@angular/core';
import { MillieuService } from './millieu.service';
import { ModalMillieuVueComponent } from './modal-millieu-vue.component';

'use strict';

export class MillieuVueComponent {
  private show = true;

  @ViewChild(ModalMillieuVueComponent) modalChild;

  constructor(protected data: MillieuService) { };
}

/* copyright AEO all right reserved */
