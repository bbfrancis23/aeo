import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subject }    from 'rxjs/Subject';
import { MilieuVue } from './milieu-vue';

'use strict';

/*
  Author: Brian Francis
  Description: Filters Milieu's List Vue by Selecting Milieu Fields Values.

  Milieu: Collection / Table WebPage Interface
  Vue: Milieu Control (Accessor/Mutator)

  QA: 11-30-2017
*/

@Component({
  selector: 'filter-vue',
  template:`
    <modal-vue>
      <div class="card border-info vue"  [@fadeInOut]="'in'" *ngIf="show" >
        <div class="card-header bg-info">Filters</div>
        <vue-controls (hideVueEvent)="show=false" (modalVueEvent)="modalChild.modalMode=true" *ngIf="!modalChild.modalMode && milieuService.dashBoard"></vue-controls>
        <modal-controls *ngIf="modalChild.modalMode"></modal-controls>
        <div class="card-block" >
          <div class="form-group">
            <label for="title" class="sr-only">Title Search</label>
            <input type="text" class="form-control " id="title" placeholder="Title Search" #searchBox id="search-box" (keyup)="search(searchBox.value)">
          </div>
          <div *ngFor="let field of milieuService.config.fields">
            <b><p>{{field.name}}:</p></b>
            <div type="checkbox" *ngFor="let value of field.values" ><input type="checkbox" [(ngModel)]="value.filtered"  (change)="milieuService.filter('title',searchTerm)"> {{value.name}}</div><hr>
          </div>
        </div>
      </div>
    </modal-vue>`,
    animations: [
      trigger('fadeInOut', [
        state('in', style({transform: 'translateX(0)'})),
        transition('void => *', [
          style({ opacity:0 }),
          animate('1000ms ease-in-out', style({ opacity:1 }))
        ]),
        transition('* => void', [
          style({ opacity:1 }),
              animate('1000ms ease-in-out', style({ opacity:0 }))
        ])
      ])
    ]

})
export class FilterVueComponent extends MilieuVue implements OnInit {

  @Input() milieuService: any;
  private searchTerms = new Subject<string>();
  searchTerm: string;

  ngOnInit(){
    this.searchTerms.subscribe((term)=> this.searchTerm = term);
  }

  search(term: string):void{
    this.searchTerms.next(term);
    this.milieuService.filter('title',term);
  }
}

/* Copyright AEO all rights reserved */
