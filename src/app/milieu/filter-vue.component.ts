import { Component, OnInit } from '@angular/core';
import { MilieuVue } from './milieu-vue';
import { MilieuService } from './milieu.service';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import { debounceTime} from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { switchMap } from 'rxjs/operator/switchMap';

'use strict';

/*
  Author: Brian Francis
  Description: Filters Milieu's List Vue by Selecting Milieu Fields Values.

  Milieu: Collection / Table WebPage Interface
  Vue: Milieu Control (Accessor/Mutator)

  QA: 11-5-2017
*/

@Component({
  selector: 'filter-vue',
  template:`
    <modal-vue  ><div class="card border-info vue" *ngIf="show" >
      <div class="card-header bg-info">Filters</div>
      <vue-controls (hideVueEvent)="show=false" (modalVueEvent)="modalChild.modalMode=true" *ngIf="!modalChild.modalMode && data.dashBoard"></vue-controls>
      <modal-controls *ngIf="modalChild.modalMode"></modal-controls>
      <div class="card-block" >
        <div class="form-group">
          <label for="title" class="sr-only">Title Search</label>
          <input type="text" class="form-control " id="title" placeholder="Title Search" #searchBox id="search-box" (keyup)="search(searchBox.value)">
        </div>
        <div *ngFor="let field of fields">
          <b><p>{{field.name}}:</p></b>
          <div type="checkbox" *ngFor="let value of field.values" ><input type="checkbox" [(ngModel)]="value.filtered"  (change)="data.filter()"> {{value.name}}</div><hr>
        </div>
      </div>
    </div></modal-vue>`

})
export class FilterVueComponent extends MilieuVue implements OnInit{
  fields = this.data.config.fields;

  items$: Observable<any[]>;
  private searchTerms = new Subject<String>();

  constructor(protected data: MilieuService) {
    super(data);
  }

  ngOnInit():void{

  }

  search(term: string):void{
    this.searchTerms.next(term);
    this.data.filterByFieldValue('title',term);
  }
}

/* Copyright AEO all rights reserved */
