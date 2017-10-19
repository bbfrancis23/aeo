import { Component, OnInit } from '@angular/core';
import { ListTileComponent } from '../dash-board/list-tile.component';
import { DashBoardService } from '../dash-board/dash-board.service';


//declare var jquery: any;
//declare var $: any;

"use strict";

@Component({
  selector: 'jem-list-tile',
  template: `

        <modal-tile>
        <div class="tile" [hidden]="!show"  >
          <h4 class="card p-3 bg-primary text-white">Jems List</h4>
          <sized-items-tile-controls
            *ngIf="modalChild.modalMode === false && data.dashBoard"
            (hideTileEvent)="show=false"
            (modalTileEvent)="modalChild.modalMode=true;"
            (toggleItemSizeEvent)="showBig = !showBig" >
          </sized-items-tile-controls>

          <div class="tile"  *ngIf="showBig" >
            <jem *ngFor="let jem of items" [jem]="jem" ></jem>
          </div>

          <div class="tile" *ngIf=!showBig>
            <jem-sm *ngFor="let jem of items" [jem]="jem" ></jem-sm>
          </div>
        </div>
        </modal-tile>
      `,
})
export class JemListTileComponent extends ListTileComponent implements OnInit {



  constructor(protected data: DashBoardService) { super(data); }

  ngOnInit() {
    this.data.currentFilteredItems.subscribe(filteredItems => {
      this.items = filteredItems;


    })

  }



}
