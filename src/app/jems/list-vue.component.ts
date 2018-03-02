import { Component } from '@angular/core';

import { fadeInOutAnimation, flyInOut } from '../milieu/animations';
import { ListVue } from '../milieu/list-vue';
import { JemService } from './jem.service';

@Component({
  selector: 'jem-list-vue',
  template: `
    <modal-vue >
      <div [@fadeInOut]="'in'" *ngIf="show"  >
        <div class="card" >
        <div class="card-header">Jems List</div>
        </div>
        <modal-controls *ngIf="modalMode === true"></modal-controls>
        <div class="alert alert-warning" *ngIf="items?.length === 0">No Jems. Please try a Different Filter</div>
        <vue-control
          *ngIf="modalMode === false"
          [showHideCtrl]="false"
          [showQuickViewCtrl]="showQuickViewCtrl"
          [showDetailViewCtrl]="showDetailViewCtrl"
          (hideVue)="show=false"
          (modalVue)="modalMode=true;"
          (quickView)="quickView = true; showQuickViewCtrl=false; showDetailViewCtrl=true"
          (detailView)="quickView = false; showQuickViewCtrl=true; showDetailViewCtrl=false" >
        </vue-control>
        <div >
          <jem  *ngFor="let jem of items; trackBy: trackByItem" [jem]="jem" [jemService]="milieuService" [quickView]="quickView"  ></jem>
        </div>
      </div>
    </modal-vue>`,
  animations: [fadeInOutAnimation, flyInOut]
})
export class JemListVueComponent extends ListVue {

  showQuickViewCtrl = true;
  showDetailViewCtrl = false;

  constructor(milieuService: JemService) {
    super(milieuService);
  }
}
