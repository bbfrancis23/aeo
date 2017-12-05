import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListVue } from '../milieu/list-vue';
import { Jem } from './Jem';
import { JemService } from './jem.service';

import { trigger, state, style, animate, transition } from '@angular/animations';

"use strict";

@Component({
  selector: 'jem-list-vue',
  template: `
      <modal-vue>
      <div class="vue" [@fadeInOut]="'in'" *ngIf="show"  >
        <h4 class="card p-3 bg-primary text-white">
          Jems List
          <modal-controls *ngIf="modalChild.modalMode === true"></modal-controls>
        </h4>
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
      </modal-vue>
    `,
      animations: [
        trigger('fadeInOut', [
          state('in', style({transform: 'translateX(0)'})),
          transition('void => *', [
            style({ opacity:0 }),
            animate('1000ms ease-in-out', style({ opacity:1 }))
          ]),
          transition('* => void', [
            style({ opacity:1 }),
                animate('1000ms ease-in-out', style({ opacity:0 }))
          ])
        ]),
        trigger('flyInOut', [
          state('in', style({opacity: 1, transform: 'translateX(0)'})),
          transition('void => *', [
            style({
              opacity: 0,
              transform: 'translateX(-100%)'
            }),
            animate('0.2s ease-in')
          ]),
          transition('* => void', [
            animate('0.2s 0.1s ease-out', style({
              opacity: 0,
              transform: 'translateX(100%)'
            }))
          ])
        ])
      ]
})
export class JemListVueComponent extends ListVue implements OnInit {

  @Input() jemService: JemService;

  //constructor(protected data: MilieuService) { super(data); }

  ngOnInit() {

    this.jemService.currentFilteredItems.subscribe(filteredItems => {
      this.items = filteredItems;
    })
  }


  trackByJem(index:number, jem: Jem){
    return jem._id;
  }

}

/* copyright AEO all right reserved */
