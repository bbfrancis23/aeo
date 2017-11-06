import { MilieuVue } from './milieu-vue';
import { MilieuService } from './milieu.service';

// opt-js//

"use strict";

export abstract class ListVueComponent extends MilieuVue {
  showBig = true;
  items: {};

  constructor(protected data: MilieuService) { super(data); }
}
/* Copyright AEO all rights reserved */
