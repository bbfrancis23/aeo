import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';
import { Jem } from '../../jem';
import { JemService} from '../../jem.service';

"use strict";

@Component({
  selector: 'jem-list-tile',
  templateUrl: '../html/jem-list-tile.html',
})
export class JemListTileComponent extends DashBoardTileComponent{

  @Input() jems: Jem[];
  @Output() selectItemEvent = new EventEmitter();
  showBig = true;

  toggleItemSize(){
    this.showBig = this.showBig ? false : true;
  }

  constructor(private jemService: JemService){super();}

  updateJem(id:string):void{
    if(id){
      this.selectItemEvent.emit(id);
    }

  }

  deleteJem(id:string):void{

    // todo: add model that asks if you are sure.

    if(id){
      let i = this.jems.findIndex(jem => jem._id === id);
      this.jemService.deleteJem(id);
      this.jems.splice(i,1)  ;
    }
  }
}
