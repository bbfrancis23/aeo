import { MillieuVueComponent } from './millieu-vue.component';
import { MillieuService } from './millieu.service';

"use strict";

export class ListVueComponent extends MillieuVueComponent {
  showBig = true;
  items: {};

  constructor(protected data: MillieuService) { super(data); }
}
