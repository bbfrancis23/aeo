import { ViewChild } from '@angular/core';
import { MilieuService } from './milieu.service';
import { ModalMilieuVueComponent } from './modal-milieu-vue.component';

'use strict';

export class MilieuVueComponent {
  private show = true;

  @ViewChild(ModalMilieuVueComponent) modalChild;

  constructor(protected data: MilieuService) { };
}

/* copyright AEO all right reserved */
