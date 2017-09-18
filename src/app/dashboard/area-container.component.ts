import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import {DashBoardAreaComponent} from './dash-board-area.component';

@Component({
  selector: 'area-container',
  templateUrl: './templates/dash-board-area.component.html',
  //styleUrls: ['./dash-board-area.component.css']
})
export class AreaContainerComponent extends DashBoardAreaComponent{
  areas = [];


  checkArea(): void{

    let isEmpty = true;
    for(let i =0;i<this.areas.length;i++){
      if(this.areas[i].showArea === true){
        isEmpty = false;
        break;
      }
    }

    this.showArea = isEmpty ? false : true;

  }
}
