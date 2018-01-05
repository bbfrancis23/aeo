import { Component, EventEmitter, Input, OnInit} from '@angular/core';
import { ListVue } from '../milieu/core';
import { Jem } from './Jem';
import { JemService } from './jem.service';

import { fadeInOutAnimation, flyInOut } from '../milieu/animations';

'use strict';

@Component({
  selector: 'jem-list-vue',
  template: `
    <modal-vue>
      <div [@fadeInOut]="'in'" *ngIf="show"  >
        <div class="card">
        <div class="card-header">
          Jems List
        </div>
        </div>
        <modal-controls *ngIf="modalChild.modalMode === true"></modal-controls>
        <div class="alert alert-warning" *ngIf="items?.length === 0">No Jems. Please try a Different Filter</div>
        <sized-items-vue-controls
          *ngIf="modalChild.modalMode === false && jemService.dashBoard"
          (hideVueEvent)="show=false"
          (modalVueEvent)="modalChild.modalMode=true;"
          (toggleItemSizeEvent)="showBig = !showBig" >
        </sized-items-vue-controls>
        <div class="tile"  *ngIf="showBig"  [@flyInOut]="'in'">
          <jem *ngFor="let jem of items; trackBy: trackByJem" [jem]="jem" [@flyInOut]="'in'" [jemService]="jemService"></jem>
        </div>
        <div class="tile" *ngIf="!showBig">
          <jem-sm *ngFor="let jem of items; trackBy: trackByJem" [jem]="jem" [jemService]="jemService"></jem-sm>
        </div>
      </div>
    </modal-vue>`,
      animations: [ fadeInOutAnimation, flyInOut ]
})
export class JemListVueComponent extends ListVue implements OnInit {

  @Input() jemService: JemService;

  ngOnInit() {
    this.jemService.currentFilteredItems.subscribe(filteredItems => {
      this.items = filteredItems;
    })
  }

  trackByJem(index:number, jem: Jem){
    return jem._id;
  }

}
