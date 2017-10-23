import { Component, OnInit } from '@angular/core';
import { MillieuVueComponent } from '../millieu/millieu-vue.component';
import { MillieuService } from '../millieu/millieu.service';


'use strict';

@Component({
  selector: 'jem-update-tile',
  templateUrl: './jem-form.component.html'
})
export class JemUpdateTileComponent extends MillieuVueComponent implements OnInit {
  function = "Update";
  model: Object = {};
  submitted = false;

  onSubmit(): void {
    this.data.create(this.model).then((jem) => { });
    this.data.refresh();
    this.submitted = true;
  }

  constructor(protected data: MillieuService) {
    super(data);
    data.currentSelectedItem.subscribe(selectedItem => this.model = selectedItem);
  }

  ngOnInit() {
    //this.modal = document.getElementById('formModal');
  }

}
