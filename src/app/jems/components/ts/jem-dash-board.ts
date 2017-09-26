import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DashBoardComponent} from '../../../dash-board/components/ts/dash-board';
import { Jem } from '../../../jem';
import { JemService} from '../../../jem.service';
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
  @ViewChild(JemIntroTileComponent) introTile;
  @ViewChild(JemFilterTileComponent) filterTile;
  @ViewChild(JemListTileComponent) listTile;
  @ViewChild(JemAddTileComponent) addTile;
  @ViewChild(JemUpdateTileComponent) updateTile;
  @ViewChild(JemCollectionTileComponent) collectionTile;

  constructor(private jemService: JemService){
    this.jemService.getJems().then((jems) => {
      this.jems = jems;
      this.filterTile.jemsFiltered = jems;

      this.filterTile.filters.forEach((filter)=>{
        this.jems.forEach((jem)=>{
          if(filter.uniqueFields.find(e => e === jem[filter.name] )){

          }else{
            filter.uniqueFields.push(jem[filter.name]);
          }

        });
      });

      /*for(var key in this.filterTile.filters){
        //console.log(this.filterTile.filters[key].unique);
        this.jems.forEach((jem)=>{
          if(this.filterTile.filters[key].unique.find(e => e === jem[key] )){

          }else{
            this.filterTile.filters[key].unique.push(jem[key]);
          }

        });
      }*/



      console.log();
      //this.jems.forEach((jem)=>[
      //  console.log(jem);
      //]);
      //console.log(this.filterTile.jems,this.jems);
      /*this.jems = this.jems.filter(function(jem){
        return (jem.type === 'Mistakes' || jem.type === 'Best Practices');
      })

      console.log(this.jems);*/
    });
  }


  ngAfterViewInit() {

    //console.log(this.filterTile.jems, this.jems);
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


    this.jems = this.jems.sort((a, b) => {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

  }

  updateJem($event){
    let jem: Jem = $event;
    this.jems.push(jem);


    this.jems = this.jems.sort((a, b) => {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

  }
}
