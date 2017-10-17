import { Component, OnInit } from '@angular/core';
import { ListTileComponent } from '../dash-board/list-tile.component';
import { DataService } from '../data.service';
import { DashBoardService } from '../dash-board/dash-board.service';


//declare var jquery: any;
//declare var $: any;

"use strict";

@Component({
  selector: 'jem-list-tile',
  template: `
    <!-- todo see if we put this into ngContent or ngContainer -->
    <div [ngClass]="{'aeo-modal': modalMode}" id="listModal"  (click)="outSideClick($event)">
      <div [ngClass]="{'aeo-modal-content': modalMode}">
        <div class="tile" [hidden]="!show"  >
          <h4>Jems List</h4>
          <sized-items-tile-controls *ngIf="modalMode === false" (hideTileEvent)="show=false" (modalTileEvent)="modalMode = true" (toggleItemSizeEvent)="showBig = !showBig" ></sized-items-tile-controls>

          <div class="tile"  *ngIf="showBig" >
            <jem *ngFor="let jem of items" [jem]="jem" ></jem>
          </div>

          <div class="tile" *ngIf=!showBig>
            <jem-sm *ngFor="let jem of items" [jem]="jem" ></jem-sm>
          </div>
        </div>
      </div>
    </div>`,
})
export class JemListTileComponent extends ListTileComponent implements OnInit {



  constructor(private data: DashBoardService) { super(); }

  ngOnInit() {
    this.data.currentFilteredItems.subscribe(filteredItems => {
      this.items = filteredItems;

      this.modal = document.getElementById('listModal');
    })

  }



}
