import { Component, OnInit } from '@angular/core';
import { MilieuVue } from '../milieu/milieu-vue';
import { MilieuService } from '../milieu/milieu.service';


'use strict';

@Component({
  selector: 'jem-update-vue',
  templateUrl: './jem-form.component.html'
})
export class JemUpdateVueComponent extends MilieuVue implements OnInit {
  function = "Update";
  model: Object = {};
  submitted = false;

  onSubmit(): void {
    this.data.create(this.model).then((jem) => { });
    this.data.refresh();
    this.submitted = true;
  }

  constructor(protected data: MilieuService) {
    super(data);
    data.currentSelectedItem.subscribe(selectedItem => this.model = selectedItem);
  }

  ngOnInit() {
    //this.modal = document.getElementById('formModal');
  }

}
