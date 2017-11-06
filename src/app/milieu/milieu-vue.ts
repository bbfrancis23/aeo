import { ViewChild } from '@angular/core';
import { MilieuService } from './milieu.service';
import { ModalVueComponent } from './modal-vue.component';

'use strict';

/*
  Author: Brian Francis
  Description: Base Abstract class for all Milieu Vue's

  Milieu: Collection / Table WebPage Interface
  Vue: Milieu Control (Accessor/Mutator)
*/

export abstract class MilieuVue {
  private show = true;
  @ViewChild(ModalVueComponent) modalChild;
  constructor(protected data: MilieuService) { };
}

/* copyright AEO all right reserved */
