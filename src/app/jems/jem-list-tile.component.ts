import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { ListTileComponent} from '../dash-board/list-tile.component';
//import { Jem } from '../../jem';
//import { JemService} from '../../jem.service';

"use strict";

@Component({
  selector: 'jem-list-tile',
  template: `
    <div class="tile" [hidden]="!show"  >
    <h4>Jems List</h4>
    <sized-items-tile-controls [title]="'Jems List'" (hideTileEvent)="show=false" (toggleItemSizeEvent)="showBig = !showBig" ></sized-items-tile-controls>

    <div class="tile" *ngIf="showBig" >
      <div  class="card mb-3" *ngFor="let jem of items"
            [ngClass]="{  'border-success': jem.type === 'Best Practices',
                          'border-danger': jem.type === 'Mistakes',
                          'border-info': jem.type === 'How to'}">
        <item-controls (deleteItemEvent)="deleteJem(jem._id)" (updateItemEvent)="selectItem(jem._id)"></item-controls>
        <div class="card-body">
          <h4 class="card-title">{{jem.title}}</h4>
          <h5>{{jem.tech}}</h5>
          <h5><span class="badge" [ngClass]="{'badge-success':jem.type === 'Best Practices', 'badge-danger': jem.type === 'Mistakes', 'badge-info': jem.type === 'How to'}" >{{jem.type}}</span></h5>
          <p class="card-text">{{jem.description}}</p>
          <pre style="background-color: black; color:white; padding: 10px;">{{jem.code}}<br></pre>
        </div>
      </div>
    </div>

    <div class="tile" *ngIf=!showBig>
      <div class="card p-1 text-white" *ngFor="let jem of items" [ngClass]="{'bg-success': jem.type === 'Best Practices', 'bg-danger': jem.type === 'Mistakes', 'bg-info': jem.type === 'How to'}" style="margin-bottom: 5px">
        <item-controls (deleteItemEvent)="deleteJem(jem._id)"  (updateItemEvent)="updateJem(jem._id)"></item-controls>
          <p><b>{{jem.title}}: </b> {{jem.description}}</p>
          <pre>{{jem.code}}</pre>
      </div>
    </div>

  </div>`,
})
export class JemListTileComponent extends ListTileComponent{

  //@Input() items: any[];
  //@Output() selectItemEvent = new EventEmitter();
  //showBig = true;

  //constructor(){super();}

  //selectItem(id:string):void{
  //  if(id){
  //    this.selectItemEvent.emit(id);
  //  }
//  }

  /*deleteJem(id:string):void{

    // todo: add model that asks if you are sure.

    if(id){
      let i = this.items.findIndex(jem => jem._id === id);
      this.jemService.deleteJem(id);
      this.items.splice(i,1)  ;
    }
  }*/
}
