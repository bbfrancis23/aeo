import { Component, OnInit } from '@angular/core';
import { ListVueComponent } from '../millieu/list-vue.component';
import { MillieuService } from '../millieu/millieu.service';


//declare var jquery: any;
//declare var $: any;

"use strict";

@Component({
  selector: 'jem-list-vue',
  template: `

        <modal-vue>
        <div class="tile" [hidden]="!show"  >
          <h4 class="card p-3 bg-primary text-white">Jems List</h4>
          <sized-items-vue-controls
            *ngIf="modalChild.modalMode === false && data.dashBoard"
            (hideVueEvent)="show=false"
            (modalVueEvent)="modalChild.modalMode=true;"
            (toggleItemSizeEvent)="showBig = !showBig" >
          </sized-items-vue-controls>

          <div class="tile"  *ngIf="showBig" >
            <jem *ngFor="let jem of items" [jem]="jem" ></jem>
          </div>

          <div class="tile" *ngIf=!showBig>
            <jem-sm *ngFor="let jem of items" [jem]="jem" ></jem-sm>
          </div>
        </div>
        </modal-vue>
      `,
})
export class JemListVueComponent extends ListVueComponent implements OnInit {



  constructor(protected data: MillieuService) { super(data); }

  ngOnInit() {
    this.data.currentFilteredItems.subscribe(filteredItems => {
      this.items = filteredItems;


    })

  }



}
