import { Component, Input } from '@angular/core';
import { DashBoardTileComponent } from './dash-board-tile.component';
import { Field } from './field';
import { Location } from '@angular/common';
import { DashBoardService } from './dash-board.service';

'use strict';

@Component({
  selector: 'filter-tile',
  template:
  `<div class="card border-info tile" *ngIf="show" >
        <div class="card-header bg-info text-white"><h4>Filters</h4></div>
        <div class="tile-controls"><a class="material-icons tile-item" (click)="show=false;" >clear</a></div>
        <div class="card-block p-3" >
          <div *ngFor="let field of fields">
            <b><p>{{field.name}}:</p></b>

            <div type="checkbox" *ngFor="let value of field.values" ><input type="checkbox" [(ngModel)]="value.filtered"  (change)="data.filter()"> {{value.name}}</div><hr>
          </div>
        </div>
      </div>`,
})
export class FilterTileComponent extends DashBoardTileComponent {
  fields = this.data.config.fields;
  constructor(private data: DashBoardService) { super(); }
}

/* Copyright AEO all rights reserved */
