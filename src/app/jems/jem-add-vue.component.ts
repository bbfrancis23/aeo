import { Component } from '@angular/core';
import { MilieuVueComponent } from '../milieu/milieu-vue.component';
import { MilieuService } from '../milieu/milieu.service';
import { Jem } from './jem';

'use strict';

@Component({
  selector: 'jem-add-vue',
  templateUrl: './jem-form.component.html'
})
export class JemAddVueComponent extends MilieuVueComponent {
  function = "Add";
  submitted = false
  model: Jem = new Jem();

  constructor(protected data: MilieuService) {
    super(data);
    this.model.tech = data.config.fields[0].values[0].name;
    this.model.type = data.config.fields[1].values[0].name;
  }

  onSubmit(): void {
    this.data.create(this.model);
    this.data.refresh();
    this.submitted = true;
  }


}

/* Copyright AEO all rights reserved */
