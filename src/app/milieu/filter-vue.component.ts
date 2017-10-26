import { Component } from '@angular/core';
import { MilieuVueComponent } from './milieu-vue.component';
import { Field } from './field';
import { Location } from '@angular/common';
import { MilieuService } from './milieu.service';

'use strict';

@Component({
  selector: 'filter-vue',
  template:
  `<div class="card border-info tile" *ngIf="show" >
        <div class="card-header bg-info text-white"><h4>Filters</h4></div>
        <div class="tile-controls" *ngIf="data.dashBoard" ><a class="material-icons tile-item" (click)="show=false;" >clear</a></div>
        <div class="card-block p-3" >
          <div *ngFor="let field of fields">
            <b><p>{{field.name}}:</p></b>

            <div type="checkbox" *ngFor="let value of field.values" ><input type="checkbox" [(ngModel)]="value.filtered"  (change)="data.filter()"> {{value.name}}</div><hr>
          </div>
        </div>
      </div>`,
})
export class FilterVueComponent extends MilieuVueComponent {
  fields = this.data.config.fields;

  constructor(protected data: MilieuService) {
    super(data);
    console.log(data);
  }
}

/* Copyright AEO all rights reserved */
