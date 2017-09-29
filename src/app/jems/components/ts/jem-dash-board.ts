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

@Component({
  selector: 'jem-dash-board',
  templateUrl: '../html/jem-dash-board.html',
  styles: []
})
export class JemDashBoardComponent implements AfterViewInit{

  jems: Jem[];
  selectedJem: Jem;
  @ViewChild(JemIntroTileComponent) introTile;
  @ViewChild(JemFilterTileComponent) filterTile;
  @ViewChild(JemListTileComponent) listTile;
  @ViewChild(JemAddTileComponent) addTile;
  @ViewChild(JemUpdateTileComponent) updateTile;
  @ViewChild(JemCollectionTileComponent) collectionTile;

  constructor(private jemService: JemService){
    this.jemService.getJems().then((jems) => {
      this.jems = jems;
      this.selectedJem = this.jems[0];
      this.filterTile.jemsFiltered = jems;

      this.updateTile.model = this.selectedJem;

      this.filterTile.filters.forEach((filter)=>{
        this.jems.forEach((jem)=>{
          if(filter.uniqueFields.find(e => e === jem[filter.name] )){

          }else{
            filter.uniqueFields.push(jem[filter.name]);
          }

        });
      });






    });
  }

  selectJem(id){


    let i = this.jems.findIndex( (jem) => {return jem._id === id});
    this.selectedJem = this.jems[i];
    this.updateTile.model = this.selectedJem;

  }

  ngAfterViewInit() {


  }

  toggleFilterTile():void{
    if(this.filterTile.show === true){
      this.filterTile.show = false
    }else{
      this.filterTile.show = true;
      this.listTile.show = true;
    }
  }

  addNewJem($event){
    let jem: Jem = $event;
    this.jems.push(jem);
    this.sortJems();

    this.filterTile.checkJemsFilter();

  }

  sortJems(){
    this.jems = this.jems.sort((a, b) => {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  updateJem($event){
    let jem: Jem = $event;
    this.jems.push(jem);
    this.sortJems();


  }
}
