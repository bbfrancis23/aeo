import { Component, Input } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';
import { Jem } from '../../../jem';

@Component({
  selector: 'jem-filter-tile',
  templateUrl: '../html/jem-filter-tile.html',
  styles: [`.topright {
                position: absolute;
                top: 5px;
                right: 5px;
            }`]
})
export class JemFilterTileComponent extends DashBoardTileComponent{
  @Input() jems: Jem[];
  jemsFiltered: Jem[];
  uniqueJemTypes = ['Mistakes', 'Best Practices'];
  filterJemTypeList = [];

  constructor() {
    super();
    //console.log(this.jems);
  }

  filterByType(item) :boolean{
    console.log(this);
    //this.filterJemTypeList.forEach(function(type){
    //    if(item.type === type){
    //      return true;
    //    }
    //});
    return false;
  }

  filterJems(){

    let jemsFilteredList: Jem[] =[];

    //if(this.filterJemTypeList.length > 0){
      if(this.jems){
        if(this.filterJemTypeList.length <= 0){
          for(let i =0, length = this.jems.length;i<length;i++){
            jemsFilteredList.push(this.jems[i]);
          }
        }else{
          for(let i =0, length = this.jems.length;i<length;i++){
            for(let c = 0, l = this.filterJemTypeList.length;c<l;c++){

              if(this.jems[i].type === this.filterJemTypeList[c]){
                  jemsFilteredList.push(this.jems[i]);
              }
            }
          }
        }
        this.jemsFiltered = jemsFilteredList;
      }
    //}




  }

  filterType(type:string):void{

    let i = this.filterJemTypeList.indexOf(type);
    if(i >= 0){
      this.filterJemTypeList.splice(i,1);
    }else{
      this.filterJemTypeList.push(type);
    }

    //console.log(this.filter)
  }

}
