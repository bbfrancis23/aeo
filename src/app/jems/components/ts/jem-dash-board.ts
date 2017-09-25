import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DashBoardComponent} from '../../../dash-board/components/ts/dash-board';
import { Jem } from '../../../jem';
import { JemService} from '../../../jem.service';
import { JemIntroTileComponent} from './jem-intro-tile';
import { JemFilterTileComponent} from './jem-filter-tile';
import { JemListTileComponent} from './jem-list-tile';
import { JemAddTileComponent} from './jem-add-tile';

@Component({
  selector: 'jem-dash-board',
  templateUrl: '../html/jem-dash-board.html',
  styles: [`.dashboard-controls{
            padding-top: 5px;
            padding-bottom: 5px;
          }

          h1{
            font-size: 1.5em;
          }`]
})
export class JemDashBoardComponent implements AfterViewInit{

  jems: Jem[];
  @ViewChild(JemIntroTileComponent) introTile;
  @ViewChild(JemFilterTileComponent) filterTile;
  @ViewChild(JemListTileComponent) listTile;
  @ViewChild(JemAddTileComponent) addTile;

  constructor(private jemService: JemService){
    this.jemService.getJems().then((jems) => {
      this.jems = jems;
      this.filterTile.jemsFiltered = jems;
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
