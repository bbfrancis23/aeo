import { Component, Input } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';
import { Field } from '../../../dash-board/field';
import {Location} from '@angular/common';

'use strict';

@Component({
  selector: 'filter-tile',
  template:
    `<div class="card border-info tile" *ngIf="show" >
        <div class="card-header bg-info text-white"><h4>Filters</h4></div>
        <div class="tile-controls"><a class="material-icons tile-item" (click)="show=false;" >clear</a></div>
        <div class="card-block p-3" >
          <div *ngFor="let field of fields">
            <b><p>{{field.name}}:</p></b>

            <div type="checkbox" *ngFor="let value of field.values" ><input type="checkbox" [(ngModel)]="value.filtered"  (change)="filter()"> {{value.name}}</div><hr>
          </div>
        </div>
      </div>`,
})
export class FilterTileComponent extends DashBoardTileComponent{

  /////////////////////////////// New Filter ////////////////////////////////////////////////////////
  @Input() items: any = [];
  itemsFiltered: any = [];

  fields: Field[] = [];

  constructor(private location: Location) {super();}


  filter():void{
    this.itemsFiltered = this.items;

    this.fields.forEach(field=>{
      let filtered = [], filters: String[] = [];

      field.values.forEach(value=> {if(value.filtered) filters.push(value.name)} );
      if( filters.length > 0){
        filters.forEach(filter =>{
          this.itemsFiltered.forEach(item =>{
            if(item[field.name] === filter) filtered.push(item);
          });
        });
        this.itemsFiltered = filtered;
      }
    });

    this.updateUrl();
  }

  private updateUrl():void{

    let url:string = 'code-jems'; // todo put this in as a config var
    let qs:string = '';
    let fieldPaths: String[] = [];
    let queryStrings = [];


    this.fields.forEach(field=>{
      let filters = [];
      field.values.forEach(value=> {if(value.filtered) filters.push(value.name)} );

      if(filters.length === 1){
        fieldPaths.push(`${this.urlify(field.name)}/${this.urlify(filters[0])}`);
      }else if(filters.length > 1){
        queryStrings.push(`${this.urlify(field.name)}=${this.urlify(filters.join(','))}`);
      }
    });

    this.location.replaceState(`${url}/${fieldPaths.join('/')}`,`${queryStrings.join('&')}`);
  }

  public urlify(string:string):string{
    string  = string || '';

    string = string.replace(/[^A-Za-z0-9\s\,\-]/g,'');
    string.trim();
    string = string.replace(/\s+/g,"-");
    string = string.toLowerCase();

    return string;
  }
  /*

  sort():void {
    this.items = this.items.sort((a, b) => {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }




  //*/




}
