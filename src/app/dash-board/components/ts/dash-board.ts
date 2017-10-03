import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { IntroTileComponent } from '../../../dash-board/components/ts/intro-tile';
import { FilterTileComponent } from '../../../dash-board/components/ts/filter-tile';

import { ActivatedRoute } from "@angular/router";

import { Field } from '../../../dash-board/field';

import { Utilities } from '../../../utilities';

@Component({
  selector: 'dash-board',
  template: '',
  providers: [Utilities]
})
export class DashBoardComponent implements AfterContentInit{

  config: any= {

  }

  constructor(private route: ActivatedRoute,private utils: Utilities){

  }

  @ViewChild(IntroTileComponent) introTile;
  @ViewChild(FilterTileComponent) filterTile;

  ngAfterContentInit() {

  }

  initConfig(){
    this.introTile.title = this.config.title;
    this.introTile.intro = this.config.intro;
    this.introTile.img = this.config.img;

    this.config.fields.forEach(field=>{
      let newField: Field = {name: field.name, values: []};
      field.values.forEach(value=> newField.values.push({name:value, filtered:''}));
      this.filterTile.fields.push(newField);
    });

    this.config.fields.forEach(field=>{
      let newField: Field = {name: field.name, values: []};
      field.values.forEach(value=> newField.values.push({name:value, filtered:''}));
      this.filterTile.fields.push(newField);
    });

    this.route.params.subscribe( (params) => {
       this.filterTile.fields.forEach(field=>{
        if(params[field.name]){
          let param = this.utils.unUrlify(params[field.name]);
          field.values[field.values.findIndex( value =>value.name.toLowerCase() === param )].filtered = true;
        }
       });
    });

    this.route.queryParams.subscribe( (params) => {
      this.filterTile.fields.forEach(field=>{
        if(params[field.name]){
          let values = params[field.name].split(',');
          values.forEach((value)=>{
            let param = this.utils.unUrlify(value);
            field.values[field.values.findIndex( value =>value.name.toLowerCase() === param )].filtered = true;
          });
        }
      });
    });
  }

  
}
