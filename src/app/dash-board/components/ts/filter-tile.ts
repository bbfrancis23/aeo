import { Component, Input } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';
import { Filter } from '../../filter';

'use strict';

@Component({
  selector: 'filter-tile',
  template: ''
})
export class FilterTileComponent extends DashBoardTileComponent{

  protected filters: Filter[]  = [];
  constructor() {super();}

  protected addFilter(key:string, value:string, list: any):any{

    if(key && value && list){
      let index = this.filters.findIndex( filter => filter.name === key),
          listIndex = this.filters[index].list.indexOf(value);

      listIndex >= 0 ? this.filters[index].list.splice(listIndex,1) : this.filters[index].list.push(value);

      list = this.filter(list);
      return list;
    }

    return "Missing params";
  }

  protected filter(list:any):any{

    if(list){
      let filtered = [];

      for (let filterIndex = 0, filterLength = this.filters.length; filterIndex < filterLength; filterIndex++){
        filtered =[];

        if(this.filters[filterIndex].list.length <= 0){
          for(let i =0, length = list.length;i<length;i++){
              filtered.push(list[i]);
          }
        }else{
            for(let i =0, length = list.length;i<length;i++){
              for(let c = 0, l = this.filters[filterIndex].list.length;c<l;c++){

                if(list[i][ this.filters[filterIndex].name ] === this.filters[filterIndex].list[c]){
                    filtered.push(list[i]);
                }
              }
            }
        }
        list = filtered;
      }
      return list;
    }
    return "Missing params";
  }

}
