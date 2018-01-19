import { fadeInOutAnimation, modalVueFadeInOut } from './animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { MilieuService } from './milieu.service';
import { MilieuModalComponent, ModalVueComponent} from './modals';
import { Subject } from 'rxjs/Subject';

'use strict';

export abstract class MilieuVue {
  show = true;
  modalOnlyMode = false;

  @ViewChild(ModalVueComponent) modalChild: ModalVueComponent;
}

export class MilieuFormGroup extends FormGroup{
  focus: string = null;
}

export abstract class MilieuInputComponent{
  @Input() form: MilieuFormGroup;
  @Input() tabIndex = 1;

  constructor(protected milieuService: MilieuService){}
}

@Component({
  selector: 'filter-vue',
  template:`
    <modal-vue>
      <div class="card"  [@fadeInOut]="'in'" *ngIf="show" >
        <div class="card-header">Filters</div>
        <vue-controls (hideVueEvent)="show=false" (modalVueEvent)="modalChild.modalMode=true" *ngIf="!modalChild.modalMode && milieuService.dashBoard"></vue-controls>
        <modal-controls *ngIf="modalChild.modalMode || milieuService.tabletMode === true"></modal-controls>
        <div class="card-block" >
          <div class="form-group">
            <label for="title" class="sr-only">Title Search</label>
            <input type="text" class="form-control " id="title" placeholder="Title Search" #searchBox id="title-search-box" (keyup)="search(searchBox.value)">
          </div>
          <div *ngFor="let field of milieuService.config.fields">
            {{milieuService.modalMode}}
            <hr>
            <b><p>{{field.name}}:</p></b>
            <div type="checkbox" *ngFor="let value of field.values" ><input type="checkbox" [(ngModel)]="value.filtered"  (change)="milieuService.filter('title',searchTerm)"> {{value.name}}</div>
          </div>
        </div>
      </div>
    </modal-vue>`,
  animations: [ fadeInOutAnimation]
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

@Component({
  selector: 'intro-vue',
  template:
    `<modal-vue>
        <div class="card" [@fadeInOut]="'in'" *ngIf="show" >
          <img class="card-img-top" [src]="milieuService.config.img" alt="{{milieuService.config.title}}">
          <vue-controls (hideVueEvent)="show=false" (modalVueEvent)="modalChild.modalMode=true" *ngIf="!modalChild.modalMode && milieuService.dashBoard"></vue-controls>
          <modal-controls *ngIf="modalChild.modalMode === true"></modal-controls>
          <div class="card-block">
            <h4>{{milieuService.config.title}}</h4>
            <p>{{milieuService.config.intro}}</p>
          </div>
        </div>
    </modal-vue>`,
  animations: [ fadeInOutAnimation ]
})
export class IntroVueComponent extends MilieuVue {
  @Input() milieuService: any;
}

@Component({
  selector: 'item-controls',
  template: `
    <div class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown"></a>
        <div class="dropdown-menu dropdown-menu-right" >
          <a class="dropdown-item" (click)="milieuService.delete(item._id)" ><div class="material-icons">delete_forever</div>Delete</a>
          <a class="dropdown-item update" (click)="milieuService.changeSelectedItem(this.item)"><div class="material-icons">create</div> Update</a>
          <!-- <a class="dropdown-item" ><div class="material-icons">favorite</div> Favorite</a> -->
        </div>
    </div>`
})
export class ItemControlsComponent {

  @Input() item: Object = {};
  @Input() milieuService: {};
}

@Component({
  selector: 'item-search',
  template: `
    <input #searchBox (keyup)="search(searchBox.value)" class="form-control" type="text" placeholder="Search" aria-label="Search">
      <div class='search-result' *ngIf="searchResults.length > 0">
        <a *ngFor="let result of searchResults" class="dropdown-item" href="/{{result.link}}">{{result.title}}</a>
      </div>`
})
export class ItemSearchComponent implements OnInit{
  searchResults = [];
  keyWords = [];

  @Input() milieuService: any;

  ngOnInit(){
    let count = 0;
    this.milieuService.config.fields.forEach((field)=>{
      count++;
      field['values'].forEach((value)=>{
        let directory = this.milieuService.urlify(value['name'])
        this.keyWords.push({link: `${this.milieuService.config.directory}/${field['name']}/${this.milieuService.urlify(value['name'])}`, title: value['name']});

        if(count < this.milieuService.config.fields.length) {
          let subField = (this.milieuService.config.fields[count]);

          subField['values'].forEach((subValue)=>{
            this.keyWords.push({link: `${this.milieuService.config.directory}/${field['name']}/${this.milieuService.urlify(value['name'])}/${subField['name']}/${this.milieuService.urlify(subValue['name'])}`, title: `${value['name']} ${subValue['name']}`} );
          });
        }
      });
    });

    //console.log(this.searchResults);
  }

  search(string: ''){
    this.searchResults = [];
    if(string.length > 0){
      this.keyWords.forEach((word)=>{
        let regEx = new RegExp(string,'i')
        if(word['title'].match(regEx)){
          this.searchResults.push(word);
        }
      });
    }
  }
}

export abstract class ListVue extends MilieuVue {
  showBig = true;
  items: {};
}

export abstract class Milieu {

  columns: any[];

  constructor(protected readonly route: ActivatedRoute, public milieuService: MilieuService) { }

  isColumnVisible(index) {
    let result = this.columns[index].find(vue => vue.show === true);
    return result ? result : false;
  }
}

@Component({
  selector: 'view-port',
  template: `
    <div class="view-port-container">
      <div class="media-wrapper">
        <ng-content select="media"></ng-content>
      </div>
      <div class="view-port-content">
        <ng-content select="content"></ng-content>
      </div>
      <div class="view-port-overlay"></div>
    </div> `,
  styles: [`
      .view-port-container{
        height: 100vh;
        display: flex;
      }
      .media-wrapper{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
      }
      .view-port-content{
          width: 100vw;
      }
      .view-port-overlay{
        height: 100vh;
        width: 100vw;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    `]
})
export class ViewPortComponent{ }


//***** VUE CONTROLS & EXTENDS *****/

@Component({
  selector: 'vue-controls',
  template: `
    <div classs="dropdown">
      <a class="dropdown-toggle" data-toggle="dropdown"></a>
      <div class="dropdown-menu dropdown-menu-right" >
        <a class="dropdown-item" (click)="hideVueEvent.emit()"><div class="material-icons">remove_circle</div> Hide</a>
        <a class="dropdown-item" (click)="modalVueEvent.emit()"><div class="material-icons">open_in_browser</div> Modal</a>
      </div>
    </div>`
})
export class VueControlsComponent {

  _show = true;

  @Output() hideVueEvent = new EventEmitter();
  @Output() modalVueEvent = new EventEmitter();

  get show(){
    return this._show;
  }
}

@Component({
  selector: 'modal-controls',
  template: `<div><a class="material-icons" ><div class="close-modal">clear</div></a></div>`
})
export class ModalControlsComponent extends VueControlsComponent{}

@Component({
  selector: 'sized-items-vue-controls',
  template: `
    <div class="dropdown" >
      <a class="dropdown-toggle" data-toggle="dropdown"></a>
      <div class="dropdown-menu dropdown-menu-right" >
        <a class="dropdown-item" (click)="hideVueEvent.emit()"><div class="material-icons">remove_circle</div> Hide</a>
        <a class="dropdown-item" (click)="modalVueEvent.emit()"  ><div class="material-icons">open_in_browser</div> Modal</a>
        <a class="dropdown-item" (click)="toggleItemSizeEvent.emit()"><div class="material-icons">swap_vert</div>Toggle Size</a>
      </div>
    </div>`
})
export class SizedItemsVueControlsComponent extends VueControlsComponent {

  @Output() toggleItemSizeEvent = new EventEmitter();
}
/* Copyright AEO all rights reserved */
