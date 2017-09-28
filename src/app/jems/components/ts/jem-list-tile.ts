import { Component, Input } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';
import { Jem } from '../../../jem';
import { JemService} from '../../../jem.service';

"use strict";

@Component({
  selector: 'jem-list-tile',
  templateUrl: '../html/jem-list-tile.html',
})
export class JemListTileComponent extends DashBoardTileComponent{

  @Input() jems: Jem[];
  showBig = true;

  toggleItemSize(){
    this.showBig = this.showBig ? false : true;
  }

  constructor(private jemService: JemService){super();}

  deleteJem(id:string):void{

    // todo: add model that asks if you are sure.

    let i = this.jems.findIndex(jem => jem._id === id);
    this.jemService.deleteJem(id);
    this.jems.splice(i,1)  ;
  }
}
