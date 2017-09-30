import { Component, Input } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';
import { Filter } from '../../filter';

import {Location} from '@angular/common';

'use strict';

@Component({
  selector: 'filter-tile',
  template: ''
})
export class FilterTileComponent extends DashBoardTileComponent{

  protected filters: Filter[]  = [];
  constructor(location: Location) {super();}

  protected addFilter(key:string, value:string, list: any):any{

    if(key && value && list){

      //this.addFilterToUrl(key,value);

      let index = this.filters.findIndex( filter => filter.name === key),
          listIndex = this.filters[index].list.indexOf(value);

      listIndex >= 0 ? this.filters[index].list.splice(listIndex,1) : this.filters[index].list.push(value);

      list = this.filter(list);
      return list;
    }

    return "Missing params";
  }

  private addFilterToUrl(key:string,value:string):void{
    // value = '  Your moma told me not to cum so fast  !!!! ';
    // get rid of spaces at start and end of string
    // get rid of any character except letters and dashes
    // value = value.replace(/[^A-Za-z0-9\s\-]/g,'');
    // value = value.replace(/\s+/g,"-");
    // value = value.toLowerCase();
    // console.log('-'+value+'-');
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
