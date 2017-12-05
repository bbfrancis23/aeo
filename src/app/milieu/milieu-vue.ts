import { ViewChild } from '@angular/core';
import { ModalVueComponent } from './modal-vue.component';
'use strict';

/*
  Author: Brian Francis
  Description: Base Abstract class for all Milieu Vue's

  Milieu: Collection / Table WebPage Interface
  Vue: Milieu Control (Accessor/Mutator)

  QA: 11-5-2017
*/

export abstract class MilieuVue {
  private show = true;
  @ViewChild(ModalVueComponent) modalChild: ModalVueComponent;
}

/* copyright AEO all right reserved */
