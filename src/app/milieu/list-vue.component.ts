import { MilieuVueComponent } from './milieu-vue.component';
import { MilieuService } from './milieu.service';

// opt-js//

"use strict";

export class ListVueComponent extends MilieuVueComponent {
  showBig = true;
  items: {};

  constructor(protected data: MilieuService) { super(data); }
}
/* Copyright AEO all rights reserved */
