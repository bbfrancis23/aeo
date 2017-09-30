import { Component, Input } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';
//import { Jem } from '../../jem';
//import { Filter } from '../../../dash-board/filter';
import { Field } from '../../../dash-board/field';

'use strict';

@Component({
  selector: 'filter-tile',
  template:
    `<div class="card border-info tile" *ngIf="show" >
        <div class="card-header bg-info text-white"><h4>Filters</h4></div>
        <div class="tile-controls"><a class="material-icons tile-item" (click)="show=false;" >clear</a></div>
        <div class="card-block p-3" >
          <div *ngFor="let field of fields">
            <b><p>{{field.name}}:</p></b>
            <div type="checkbox" *ngFor="let value of field.values" ><input type="checkbox" (click)="addFilter(field.name,value)"> {{value}}</div><hr>
          </div>
        </div>
      </div>`,
})
export class FilterTileComponent extends DashBoardTileComponent{

  /////////////////////////////// New Filter ////////////////////////////////////////////////////////
  @Input() items: any = [];
  itemsFiltered: any = [];

  fields: Field[] = [];

  addFilter(field:string, value:string):void{
    if(field && value){
      let itemsFiltered = this.itemsFiltered;
      this.sort();
      itemsFiltered = this.items;
      let i = this.fields.findIndex( f => f.name === field),
          fi = this.fields[i].filters.indexOf(value);

      fi >= 0 ? this.fields[i].filters.splice(fi,1) : this.fields[i].filters.push(value);

      //console.log(this.fields[i].name,this.fields[i].filters);
      itemsFiltered = this.filter(itemsFiltered);

      this.itemsFiltered = itemsFiltered;
    }
  }

  protected filter(list:any):any{

    if(list){
      let filtered = [];

      for (let filterIndex = 0, filterLength = this.fields.length; filterIndex < filterLength; filterIndex++){
        filtered =[];

        if(this.fields[filterIndex].filters.length <= 0){
          for(let i =0, length = list.length;i<length;i++){
              filtered.push(list[i]);
          }
        }else{
            for(let i =0, length = list.length;i<length;i++){
              for(let c = 0, l = this.fields[filterIndex].filters.length;c<l;c++){

                if(list[i][ this.fields[filterIndex].name ] === this.fields[filterIndex].filters[c]){
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

  sort():void {
    this.items = this.items.sort((a, b) => {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  ///////////////////////////// OLD JEMS ////////////////////////////////////////////////////////////
  //@Input() jems: Jem[];
  //jemsFiltered: Jem[];

  //filters: Filter[] = [{name:'tech',list:[],uniqueFields:[]},{name:'type',list:[],uniqueFields:[]}];

  /*
  filterJems():void{
    let jemsFiltered = this.jemsFiltered;

    jemsFiltered = this.jems;
    jemsFiltered = this.filter( jemsFiltered);
    this.jemsFiltered = jemsFiltered;
  }

  addJemsFilter(key:string, value: string):void{


    if(key && value){
      let jemsFiltered = this.jemsFiltered;
      this.sortJems();
      jemsFiltered = this.jems;
      jemsFiltered = this.addFilter(key,value, jemsFiltered);

      this.jemsFiltered = jemsFiltered;
    }
  }
  //*/




}
