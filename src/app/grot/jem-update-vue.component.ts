/*import { Component, Input, OnInit } from '@angular/core';
import { MilieuVue } from '../milieu/core';
import { MilieuService } from '../milieu/milieu.service';
import { JemService } from './jem.service';

import { trigger, state, style, animate, transition } from '@angular/animations';

'use strict';

@Component({
  selector: 'jem-update-vue',
  templateUrl: './jem-form.component.html',
  animations: [
    trigger('fadeInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({ opacity:0 }),
        animate('1000ms ease-in-out', style({ opacity:1 }))
      ]),
      transition('* => void', [
        style({ opacity:1 }),
            animate('1000ms ease-in-out', style({ opacity:0 }))
      ])
    ])
  ]
})
export class JemUpdateVueComponent extends MilieuVue implements OnInit {
  function = "Update";
  model: Object = {};
  submitted = false;

  @Input() jemService: JemService;

  onSubmit(): void {
    this.jemService.create(this.model).then((jem) => { });
    this.jemService.refresh();
    this.submitted = true;
  }

  //constructor(protected data: MilieuService) {
  //  super(data);

  //}

  ngOnInit() {
    //this.modal = document.getElementById('formModal');
    this.jemService.currentSelectedItem.subscribe(selectedItem => this.model = selectedItem);
  }

}
*/
