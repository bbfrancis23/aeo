import { Component } from '@angular/core';
import { MilieuVueComponent } from './milieu-vue.component';
import { MilieuService } from './milieu.service';

'use strict';

// opt-js-html-css //

@Component({
  selector: 'filter-vue',
  template:`
    <modal-vue><div class="card border-info vue" *ngIf="show" >
      <div class="card-header bg-info">Filters</div>
      <vue-controls (hideVueEvent)="show=false" (modalVueEvent)="modalChild.modalMode=true" *ngIf="!modalChild.modalMode && data.dashBoard"></vue-controls>
      <modal-controls *ngIf="modalChild.modalMode"></modal-controls>
      <div class="card-block" >
        <div *ngFor="let field of fields">
          <b><p>{{field.name}}:</p></b>
          <div type="checkbox" *ngFor="let value of field.values" ><input type="checkbox" [(ngModel)]="value.filtered"  (change)="data.filter()"> {{value.name}}</div><hr>
        </div>
      </div>
    </div></modal-vue>`,

})
export class FilterVueComponent extends MilieuVueComponent {
  fields = this.data.config.fields;
  constructor(protected data: MilieuService) { super(data); }
}

/* Copyright AEO all rights reserved */
