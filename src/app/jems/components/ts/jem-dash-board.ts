import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { DashBoardComponent } from '../../../dash-board/components/ts/dash-board';
import { Jem } from '../../jem';
import { JemService } from '../../jem.service';
import { IntroTileComponent } from '../../../dash-board/components/ts/intro-tile';
import { FilterTileComponent } from '../../../dash-board/components/ts/filter-tile';
import { JemListTileComponent } from './jem-list-tile';
import { JemAddTileComponent } from './jem-add-tile';
import { JemUpdateTileComponent } from './jem-update-tile';
import { JemCollectionTileComponent } from './jem-collection-tile';
import { Field } from '../../../dash-board/field';
import { ActivatedRoute } from "@angular/router";

'use strict';

@Component({
  selector: 'jem-dash-board',
  templateUrl: '../html/jem-dash-board.html',
  styles: []
})
export class JemDashBoardComponent extends DashBoardComponent implements AfterContentInit{

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
  @ViewChild(IntroTileComponent) introTile;
  @ViewChild(FilterTileComponent) filterTile;
  @ViewChild(JemListTileComponent) listTile;
  @ViewChild(JemAddTileComponent) addTile;
  @ViewChild(JemUpdateTileComponent) updateTile;
  @ViewChild(JemCollectionTileComponent) collectionTile;

  constructor(private jemService: JemService, private route: ActivatedRoute){
    super();



    //console.log(route.params;

    this.jemService.getJems().then((jems) => {
      this.jems = jems;
      this.selectedJem = this.jems[0];
      this.filterTile.items = jems;
      this.filterTile.itemsFiltered = jems;
      this.updateTile.model = this.selectedJem;
      this.filterTile.filter();

      //this.filterTile.fields[0].values[0].filtered = true;
      //this.filterTile.filter();
      //this.filterTile.addFilter('tech','JavaScript');

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

  unUrlify(string:string){
    string  = string || '';

    string = string.replace(/[^A-Za-z0-9\s\-]/g,'');
    string.trim();
    string = string.replace(/\-+/g," ");
    string = string.toLowerCase();

    return string;
  }

  ngAfterContentInit() {
    this.introTile.title = this.config.title;
    this.introTile.intro = this.config.intro;
    this.introTile.img = this.config.img;
    //this.filterTile.fields = this.config.fields;


    // This saves the user the trouble of typeing in "name: {'Banana', filtered: ''"} every time and can just type 'banana'
    this.config.fields.forEach(field=>{
      let newField: Field = {name: field.name, values: []};
      field.values.forEach(value=> newField.values.push({name:value, filtered:''}));
      this.filterTile.fields.push(newField);
    });

    this.route.params.subscribe( (params) => {

      this.filterTile.fields.forEach(field=>{
        if(params[field.name]){
          let param = this.unUrlify(params[field.name]);
          field.values[field.values.findIndex( value =>value.name.toLowerCase() === param )].filtered = true;
        }
      });
    });

    this.route.queryParams.subscribe( (params) => {


      this.filterTile.fields.forEach(field=>{
        if(params[field.name]){
          let values = params[field.name].split(',');
          values.forEach((value)=>{
            let param = this.unUrlify(value);
            field.values[field.values.findIndex( value =>value.name.toLowerCase() === param )].filtered = true;
          });

        }
      });
    });

    //this.filterTile.fields[0].values[1].checked = true;

    //console.log(this.filterTile.filtered);

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
      this.filterTile.sort();
      this.filterTile.filter();
    }

  }



  updateJem($event):void{
    if($event){
      let jem: Jem = $event;
      this.jems.push(jem);
      this.filterTile.sort();
    }
  }
}
