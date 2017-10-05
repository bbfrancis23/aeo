import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { DashBoardTileComponent} from './dash-board-tile.component';
import { DataService} from '../data.service'

"use strict";

@Component({
  selector: 'list-tile',
  template: ''
})
export class ListTileComponent extends DashBoardTileComponent{

  @Input() items: any[];
  @Output() selectItemEvent = new EventEmitter();
  showBig = true;


  collection: string;

  constructor( private dataService: DataService){super();}

  selectItem(id:string):void{
    if(id){
      this.selectItemEvent.emit(id);
    }
  }

  deleteItem(id:string):void{
    if(id){
      let i = this.items.findIndex(item => item._id === id);
      console.log(this.collection);
      this.dataService.delete(id,this.collection);
      this.items.splice(i,1)  ;
    }
  }

}
