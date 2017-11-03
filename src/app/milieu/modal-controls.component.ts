import { Component } from '@angular/core';
import { VueControlsComponent } from './vue-controls.component';

'use strict'

// opt-js-html //

@Component({
  selector: 'modal-controls',
  template: `<div class="vue-controls"><a class="material-icons" ><div class="close-modal">clear</div></a></div>`
})
export class ModalControlsComponent extends VueControlsComponent{}
/* copyright AEO all right reserved */
