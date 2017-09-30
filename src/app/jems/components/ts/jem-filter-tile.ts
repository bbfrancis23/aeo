import { Component, Input } from '@angular/core';
import { FilterTileComponent} from '../../../dash-board/components/ts/filter-tile';
import { Jem } from '../../jem';
import { Filter } from '../../../dash-board/filter';

'use strict';

@Component({
  selector: 'jem-filter-tile',
  template:
    ` <div class="card border-info tile" *ngIf="show" >
        <div class="card-header bg-info text-white"><h4>Filters</h4></div>
        <div class="tile-controls"><a class="material-icons tile-item" (click)="show=false;" >clear</a></div>
        <div class="card-block p-3" >
          <div *ngFor="let filter of filters">
            <b><p>{{filter.name}}:</p></b>
            <div type="checkbox" *ngFor="let field of filter.uniqueFields" ><input type="checkbox" (click)="addJemsFilter(filter.name,field)"> {{field}}</div><hr>
          </div>
        </div>
      </div>`,
})
export class JemFilterTileComponent extends FilterTileComponent{

  @Input() jems: Jem[];
  jemsFiltered: Jem[];

  filters: Filter[] = [{name:'tech',list:[],uniqueFields:[]},{name:'type',list:[],uniqueFields:[]}];

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


  sortJems():void {
    this.jems = this.jems.sort((a, b) => {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
}
