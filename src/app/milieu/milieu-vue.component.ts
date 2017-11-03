import { Component, ViewChild } from '@angular/core';
import { MilieuService } from './milieu.service';
import { ModalVueComponent } from './modal-vue.component';

'use strict';
export class MilieuVueComponent {
  private show = true;
  @ViewChild(ModalVueComponent) modalChild;
  constructor(protected data: MilieuService) { };
}

/* copyright AEO all right reserved */
