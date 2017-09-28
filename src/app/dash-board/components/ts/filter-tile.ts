import { Component, Input } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';
import { Jem } from '../../../jem';

@Component({
  selector: 'filter-tile',
  template: '',
  styles: []
})
export class FilterTileComponent extends DashBoardTileComponent{


  //filters = {};
  filters =[];

  constructor() {
    super();
  }

  // key = tech - value = Git
  // gFilters [{name:tech},list:[]]

  checkFilters(list:any):any{
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

  filter(key:string,value:string, list: any):any{

    let k = this.filters.findIndex( (i) => {console.log();return i.name === key});
    let i = this.filters[k].list.indexOf(value);

    if(i >= 0){
      this.filters[k].list.splice(i,1);
    }else{
      this.filters[k].list.push(value);
    }



    list = this.checkFilters(list);

    return list;
  }

  /*filter(key:string,value:string, list: any): any{

    let i = this.filters[key].list.indexOf(value);
    if(i >= 0){
      this.filters[key].list.splice(i,1);
    }else{
      this.filters[key].list.push(value);
    }


    let filtered = [];
    for( let filter in this.filters){

      filtered = [];

      if(this.filters[filter].list.length <= 0){
        for(let i =0, length = list.length;i<length;i++){
          filtered.push(list[i]);
        }
      }else{
        for(let i =0, length = list.length;i<length;i++){
          for(let c = 0, l = this.filters[filter].list.length;c<l;c++){
            if(list[i][filter] === this.filters[filter].list[c]){
                filtered.push(list[i]);
            }
          }
        }
      }
      list = filtered;
    }
    return list;
  }*/




}
