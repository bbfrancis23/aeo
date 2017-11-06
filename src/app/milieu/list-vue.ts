import { MilieuVue } from './milieu-vue';
import { MilieuService } from './milieu.service';

"use strict";

export abstract class ListVue extends MilieuVue {
  showBig = true;
  items: {};

  constructor(protected data: MilieuService) { super(data); }
}
/* Copyright AEO all rights reserved */
