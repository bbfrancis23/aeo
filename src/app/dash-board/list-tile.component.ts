import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { DashBoardTileComponent} from './dash-board-tile.component';

"use strict";

@Component({
  selector: 'list-tile',
  template: ''
})
export class ListTileComponent extends DashBoardTileComponent{

  @Input() items: any[];
  @Output() selectItemEvent = new EventEmitter();
  showBig = true;

  selectItem(id:string):void{
    if(id){
      this.selectItemEvent.emit(id);
    }
  }

  /*deleteJem(id:string):void{

    // todo: add model that asks if you are sure.

    if(id){
      let i = this.items.findIndex(jem => jem._id === id);
      this.jemService.deleteJem(id);
      this.items.splice(i,1)  ;
    }
  }*/
}
