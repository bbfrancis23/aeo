import { Component } from '@angular/core';
import { MillieuVueComponent } from '../millieu/millieu-vue.component';
import { MillieuService } from '../millieu/millieu.service';
import { Jem } from './jem';

'use strict';

@Component({
  selector: 'jem-add-tile',
  templateUrl: './jem-form.component.html'
})
export class JemAddTileComponent extends MillieuVueComponent {
  function = "Add";
  submitted = false
  model: Jem = new Jem();

  constructor(protected data: MillieuService) {
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
