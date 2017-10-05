import { Component, ViewChild, AfterContentInit, OnInit } from '@angular/core';
import { DashBoardComponent } from '../dash-board/dash-board.component';
import { Jem } from './jem';
import { JemService } from './jem.service';
import { JemListTileComponent } from './jem-list-tile.component';
import { JemAddTileComponent } from './jem-add-tile.component';
import { JemUpdateTileComponent } from './jem-update-tile.component';
import { JemCollectionTileComponent } from './jem-collection-tile.component';
import { Field } from '../dash-board/field';
import { ActivatedRoute } from "@angular/router";
import { Utilities } from '../utilities';

'use strict';

@Component({
  selector: 'jem-dash-board',
  templateUrl: './jem-dash-board.component.html',
  providers: [Utilities]
})
export class JemDashBoardComponent extends DashBoardComponent implements AfterContentInit, OnInit{

  config: any= {
    title: 'Code Jems',
    intro: "Short-cut keys, Best Practices, How to and Mistakes. Code Jems,  it's all here",
    img: "assets/img/code-jems.jpg",

    fields: [
      {name: 'tech', values: [ 'Angular 4', 'CSS', 'Express', 'Git', 'HTML', 'JavaScript', 'Less', 'MongoDB', 'Mean Stack', 'NodeJS', 'TypeScript' ]},
      {name: 'type', values: [ 'Best Practices', 'How to',  'Mistakes', 'Short-Cut Keys', 'Style Guide']}
    ]
  }

  jems: Jem[];
  selectedJem: Jem;
  @ViewChild(JemListTileComponent) listTile;
  @ViewChild(JemAddTileComponent) addTile;
  @ViewChild(JemUpdateTileComponent) updateTile;
  @ViewChild(JemCollectionTileComponent) collectionTile;

  constructor(private jemService: JemService, private r: ActivatedRoute, private u: Utilities){
    super(r,u);

  }

  ngOnInit():void{
    this.getJems();
  }

  getJems(){
    this.jemService.getJems().then((jems) => {
      this.jems = jems;
      this.selectedJem = this.jems[0];
      this.filterTile.items = jems;
      this.filterTile.itemsFiltered = jems;
      this.updateTile.model = this.selectedJem;
      this.filterTile.filter();

    });
  }

  selectJem(id:string):void{



    let i  = 0;
    if(id){
      i = this.jems.findIndex( jem => jem._id === id);

    }



    this.selectedJem = this.jems[i];
    this.updateTile.model = this.selectedJem;
    this.addTile.show = false;
    this.updateTile.show = true;
  }

  // todo put this in a typescript class


  ngAfterContentInit() {
    this.initConfig();
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
      this.getJems();
    }
  }
}
