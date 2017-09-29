import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DashBoardComponent} from '../../../dash-board/components/ts/dash-board';
import { Jem } from '../../jem';
import { JemService} from '../../jem.service';
import { JemIntroTileComponent} from './jem-intro-tile';
import { JemFilterTileComponent} from './jem-filter-tile';
import { JemListTileComponent} from './jem-list-tile';
import { JemAddTileComponent} from './jem-add-tile';
import { JemUpdateTileComponent} from './jem-update-tile';
import { JemCollectionTileComponent} from './jem-collection-tile';

'use strict';

@Component({
  selector: 'jem-dash-board',
  templateUrl: '../html/jem-dash-board.html',
  styles: []
})
export class JemDashBoardComponent extends DashBoardComponent implements AfterViewInit{

  jems: Jem[];
  selectedJem: Jem;
  @ViewChild(JemIntroTileComponent) introTile;
  @ViewChild(JemFilterTileComponent) filterTile;
  @ViewChild(JemListTileComponent) listTile;
  @ViewChild(JemAddTileComponent) addTile;
  @ViewChild(JemUpdateTileComponent) updateTile;
  @ViewChild(JemCollectionTileComponent) collectionTile;

  constructor(private jemService: JemService){
    super();

    this.jemService.getJems().then((jems) => {
      this.jems = jems;
      this.selectedJem = this.jems[0];
      this.filterTile.jemsFiltered = jems;
      this.updateTile.model = this.selectedJem;

      this.filterTile.filters.forEach((filter)=>{
        this.jems.forEach((jem)=>{
          if( ! filter.uniqueFields.find(e => e === jem[filter.name] )){
            filter.uniqueFields.push(jem[filter.name]);
          }
        });
      });
    });
  }

  selectJem(id:string):void{

    let i  = 0;
    if(id){
      let i = this.jems.findIndex( (jem) => {return jem._id === id});
    }

    this.selectedJem = this.jems[i];
    this.updateTile.model = this.selectedJem;
    this.addTile.show = false;
    this.updateTile.show = true;
  }

  ngAfterViewInit() {}

  toggleFilterTile():void{
    if(this.filterTile.show === true){
      this.filterTile.show = false
    }else{
      this.filterTile.show = true;
      this.listTile.show = true;
    }
  }

  toggleListTile():void{
    if(this.listTile.show){
      this.filterTile.show = false;
      this.listTile.show = false;
    }else{
      this.listTile.show = true;
    }
  }

  addNewJem($event):void{

    if($event){
      let jem: Jem = $event;
      this.jems.push(jem);
      this.filterTile.sortJems();
      this.filterTile.filterJems();
    }

  }



  updateJem($event):void{
    if($event){
      let jem: Jem = $event;
      this.jems.push(jem);
      this.filterTile.sortJems();
    }
  }
}
