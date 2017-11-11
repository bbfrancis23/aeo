import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListVue } from '../milieu/list-vue';
import { MilieuService } from '../milieu/milieu.service';
import { Jem } from './Jem';

"use strict";

@Component({
  selector: 'jem-list-vue',
  template: `

        <modal-vue>
        <div class="tile" [hidden]="!show"  >
          <h4 class="card p-3 bg-primary text-white">
            Jems List
            <modal-controls *ngIf="modalChild.modalMode === true"></modal-controls>
          </h4>
          <sized-items-vue-controls
            *ngIf="modalChild.modalMode === false && data.dashBoard"
            (hideVueEvent)="show=false"
            (modalVueEvent)="modalChild.modalMode=true;"
            (toggleItemSizeEvent)="showBig = !showBig" >
          </sized-items-vue-controls>


          <div class="tile"  *ngIf="showBig" >
            <jem *ngFor="let jem of items; trackBy: trackByJem" [jem]="jem" ></jem>
          </div>

          <div class="tile" *ngIf=!showBig>
            <jem-sm *ngFor="let jem of items; trackBy: trackByJem" [jem]="jem" ></jem-sm>
          </div>
        </div>
        </modal-vue>
      `,
})
export class JemListVueComponent extends ListVue implements OnInit {

  constructor(protected data: MilieuService) { super(data); }

  ngOnInit() {
    this.data.currentFilteredItems.subscribe(filteredItems => {
      this.items = filteredItems;


    })

  }


  trackByJem(index:number, jem: Jem){
    return jem._id;
  }

}

/* copyright AEO all right reserved */
