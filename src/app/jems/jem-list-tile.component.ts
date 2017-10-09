import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ListTileComponent } from '../dash-board/list-tile.component';
import { DataService } from '../data.service';

import { JemService } from './jem.service';
import { Jem } from './jem';

import { DashBoardService } from '../dash-board/dash-board.service';

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
      <jem-sm *ngFor="let jem of items" [jem]="jem" (updateItemEvent)="selectItem(jem._id)"></jem-sm>
    </div>

  </div>`,
})
export class JemListTileComponent extends ListTileComponent implements OnInit {

  collection = 'jems';


  message: string;

  constructor(private ds: DataService, private jemService: JemService, private data: DashBoardService) {
    super(ds);
  }



  ngOnInit() {
    this.data.currentFilteredItems.subscribe(filteredItems => {
      this.items = filteredItems;
    })

  }

}
