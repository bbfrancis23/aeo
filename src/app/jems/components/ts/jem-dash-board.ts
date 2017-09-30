import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { DashBoardComponent} from '../../../dash-board/components/ts/dash-board';
import { Jem } from '../../jem';
import { JemService} from '../../jem.service';
import { IntroTileComponent} from '../../../dash-board/components/ts/intro-tile';
import { FilterTileComponent} from '../../../dash-board/components/ts/filter-tile';
import { JemListTileComponent} from './jem-list-tile';
import { JemAddTileComponent} from './jem-add-tile';
import { JemUpdateTileComponent} from './jem-update-tile';
import { JemCollectionTileComponent} from './jem-collection-tile';
import { Field } from '../../../dash-board/field';

'use strict';

@Component({
  selector: 'jem-dash-board',
  templateUrl: '../html/jem-dash-board.html',
  styles: []
})
export class JemDashBoardComponent extends DashBoardComponent implements AfterContentInit{

  config: any = {
    title: 'Code Jems',
    intro: "Short-cut keys, Best Practices, How to and Mistakes. Code Jems,  it's all here",
    img: "assets/img/code-jems.jpg",
    fields: [
      {name:'tech', filters:[], values:['Angular 4', 'CSS', 'Express', 'Git', 'HTML', 'JavaScript', 'LESS','Mean Stack', 'MongoDB', 'NodeJS', 'TypeScript']},
      {name:'type', filters:[], values:['Best Practices', 'How to', 'Mistakes', 'Short-Cut Keys' , 'Style Guide']}
    ]
  }

  jems: Jem[];
  selectedJem: Jem;
  @ViewChild(IntroTileComponent) introTile;
  @ViewChild(FilterTileComponent) filterTile;
  @ViewChild(JemListTileComponent) listTile;
  @ViewChild(JemAddTileComponent) addTile;
  @ViewChild(JemUpdateTileComponent) updateTile;
  @ViewChild(JemCollectionTileComponent) collectionTile;

  constructor(private jemService: JemService){
    super();

    this.jemService.getJems().then((jems) => {
      this.jems = jems;
      this.selectedJem = this.jems[0];
      //this.filterTile.jemsFiltered = jems;
      this.filterTile.itemsFiltered = jems;
      this.updateTile.model = this.selectedJem;


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

  ngAfterContentInit() {
    this.introTile.title = this.config.title;
    this.introTile.intro = this.config.intro;
    this.introTile.img = this.config.img;
    this.filterTile.fields = this.config.fields;
  }

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
