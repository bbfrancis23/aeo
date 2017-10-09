import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ListTileComponent } from '../dash-board/list-tile.component';
import { DataService } from '../data.service';

import { JemService } from './jem.service';
import { Jem } from './jem';

"use strict";

@Component({
  selector: 'jem-list-tile',
  template: `
    <div class="tile" [hidden]="!show"  >
    <h4>Jems List</h4>
    <sized-items-tile-controls [title]="'Jems List'" (hideTileEvent)="show=false" (toggleItemSizeEvent)="showBig = !showBig" ></sized-items-tile-controls>

    <div class="tile"  *ngIf="showBig" >
      <jem *ngFor="let jem of items" [jem]="jem" (updateItemEvent)="selectItem(jem._id)"></jem>
    </div>

    <div class="tile" *ngIf=!showBig>
      <div class="card p-1 text-white" *ngFor="let jem of items" [ngClass]="{'bg-success': jem.type === 'Best Practices', 'bg-danger': jem.type === 'Mistakes', 'bg-info': jem.type === 'How to'}" style="margin-bottom: 5px">
        <item-controls (deleteItemEvent)="deleteItem(jem._id)"  (updateItemEvent)="selectItem(jem._id)"></item-controls>
          <p><b>{{jem.title}}: </b> {{jem.description}}</p>
          <pre>{{jem.code}}</pre>
      </div>
    </div>

  </div>`,
})
export class JemListTileComponent extends ListTileComponent implements OnInit {

  collection = 'jems';


  message: string;

  constructor(private ds: DataService, private jemService: JemService) {
    super(ds);
  }



  ngOnInit() {
    this.jemService.currentFilteredItems.subscribe(filteredItems => {
      this.items = filteredItems;
    })

  }

}
