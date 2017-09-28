import { Component, Input } from '@angular/core';
import { FilterTileComponent} from '../../../dash-board/components/ts/filter-tile';
import { Jem } from '../../../jem';

@Component({
  selector: 'jem-filter-tile',
  template:
    ` <div class="card border-info tile" *ngIf="show" >
        <div class="card-header bg-info text-white"><h4>Filters</h4></div>
        <div class="tile-controls"><a class="material-icons tile-item" (click)="show=false;" >clear</a></div>
        <div class="card-block p-3" >
          <div *ngFor="let filter of filters">
            <b><p>{{filter.name}}:</p></b>
            <div type="checkbox" *ngFor="let field of filter.uniqueFields" ><input type="checkbox" (click)="filterJems(filter.name,field)"> {{field}}</div><hr>
          </div>
        </div>
      </div>`,
})
export class JemFilterTileComponent extends FilterTileComponent{

  @Input() jems: Jem[];
  jemsFiltered: Jem[];

  filters = [{name:'tech',list:[],uniqueFields:[]},{name:'type',list:[],uniqueFields:[]}];

  checkJemsFilter():void{
    let jemsFiltered = this.jemsFiltered;

    jemsFiltered = this.jems;
    jemsFiltered = this.checkFilters( jemsFiltered);
    jemsFiltered = jemsFiltered.sort((a, b) => {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    this.jemsFiltered = jemsFiltered;
  }

  filterJems(key:string, value: string):void{
    let jemsFiltered = this.jemsFiltered;

    jemsFiltered = this.jems;
    jemsFiltered = this.filter(key,value, jemsFiltered);
    jemsFiltered = jemsFiltered.sort((a, b) => {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    this.jemsFiltered = jemsFiltered;
  }

}
