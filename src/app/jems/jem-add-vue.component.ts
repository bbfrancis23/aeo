import { Component, Input, OnInit } from '@angular/core';
import { MilieuVue } from '../milieu/milieu-vue';
import { MilieuService } from '../milieu/milieu.service';
import { Jem } from './jem';
import { JemService } from './jem.service';

import { trigger, state, style, animate, transition } from '@angular/animations';

'use strict';

@Component({
  selector: 'jem-add-vue',
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
export class JemAddVueComponent extends MilieuVue implements OnInit{
  function = "Add";
  submitted = false
  model: Jem = new Jem();
  @Input() jemService: JemService;

  constructor(protected data: MilieuService) {
    super(data);
  }

  ngOnInit(){
    this.model.tech = this.jemService.config.fields[0].values[0].name;
    this.model.type = this.jemService.config.fields[1].values[0].name;
  }

  onSubmit(): void {
    this.jemService.create(this.model);
    this.jemService.refresh();
    this.submitted = true;
  }


}

/* Copyright AEO all rights reserved */
