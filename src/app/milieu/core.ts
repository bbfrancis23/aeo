import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Subject } from 'rxjs/Subject';

import { fadeInOutAnimation, modalVueFadeInOut, flyInOut } from './animations';
import { MilieuService } from './data';
import { ModalVueComponent } from './modal-vue.component';

import { AccountService } from '../account/data';
import { AppService } from '../data';

import { MilieuVue } from './vue';
import { VueControlComponent } from './vue-control.component';


@Component({
  selector: 'collapse-control',
  template: `<a class="material-icons" data-toggle="collapse" [href]="dataTarget" (click)="collapse = collapse==='down' ? 'up' : 'down'" *ngIf="show">keyboard_arrow_{{collapse}}</a>`
})
export class CollapseControlComponent extends VueControlComponent {
  @Input() dataTarget: string = '';
  collapse = 'up';
}

export abstract class Milieu {

  columns: any[];

  constructor(route: ActivatedRoute, milieuService: MilieuService, accountService: AccountService);
  constructor(route: ActivatedRoute, milieuService: MilieuService);
  constructor() { }

  isColumnVisible(index) {
    let result = this.columns[index].find(vue => vue.show);
    return result ? result : false;
  }
}

export abstract class MilieuFieldForm {
  message: string = null;
  submitted = false;
  updated = false;

  @Input() showCancelButton = true;

  @Output() cancel = new EventEmitter();
  form = new MilieuFormGroup({});

  constructor(public milieuService: MilieuService) { }
}

export class MilieuFormGroup extends FormGroup {
  focus: string = null;
}

export abstract class MilieuInputComponent {
  @Input() form: MilieuFormGroup;
  @Input() tabIndex = 1;
  @Input() autofocus = false;
  @Input() required = false;

  constructor(protected milieuService: MilieuService) { }
}

@Component({
  selector: 'filter-vue',
  template: `
    <modal-vue>
      <div class="card"  [@fadeInOut]="'in'" *ngIf="show" >
        <div class="card-header" (mouseenter)="showCollapseControl=true" (mouseleave)="showCollapseControl = (appService.touch) ? true : false">
          Filters
          <collapse-control [dataTarget]="'#filter'" [show]="showCollapseControl"></collapse-control>
        </div>
        <vue-control (hideVueEvent)="show=false" (modalVueEvent)="modalMode=true" *ngIf="!modalMode && !sidebarMode"></vue-control>
        <modal-controls *ngIf="modalMode || milieuService.tabletMode"></modal-controls>
        <div class="collapse show card-block" id="filter">
          <div class="form-group">
            <input type="text" class="form-control " id="title" placeholder="Title Search" #searchBox id="title-search-box" (keyup)="search(searchBox.value)">
          </div>
          <div *ngFor="let field of milieuService.config.fields">
            <hr>
            <b><p>{{field.name}}:</p></b>
            <div type="checkbox" *ngFor="let value of field.values" ><input type="checkbox" [(ngModel)]="value.filtered"  (change)="milieuService.filter('title',searchTerm)"> {{value.name}}</div>
          </div>
        </div>
      </div>
    </modal-vue>`,
  animations: [fadeInOutAnimation]
})
export class FilterVueComponent extends MilieuVue implements OnDestroy, OnInit {

  @Input() milieuService: any;
  private searchTerms = new Subject<string>();
  searchTerm: string;
  //showCollapseControl;

  constructor(public appService: AppService) {
    super();
    //this.showCollapseControl = this.appService.touch ? true : false
  }

  ngOnInit() {
    this.searchTerms.subscribe((term) => this.searchTerm = term)
  }

  search(term: string): void {
    this.searchTerms.next(term);
    this.milieuService.filter('title', term);
  }

  ngOnDestroy() {
    this.searchTerms.unsubscribe();
  }
}

@Component({
  selector: 'intro-vue',
  template:
    `<modal-vue>
      <div [ngClass]="{'sidebar-vue': sidebarMode}">
        <div class="card" [@fadeInOut]="'in'" *ngIf="show" >
          <div (mouseenter)="showCollapseControl=true" (mouseleave)="showCollapseControl=false">
            <img [src]="milieuService.intro.img" alt="{{milieuService.config.title}}" >
            <collapse-control class="image-collapse-control" [dataTarget]="'#milieu-intro'" [show]="showCollapseControl"></collapse-control>
          </div>
          <vue-control (hideVueEvent)="show=false" (modalVueEvent)="modalMode=true" *ngIf="!modalMode && !sidebarMode"></vue-control>
          <modal-controls *ngIf="modalMode"></modal-controls>
          <div class="collapse show card-block" id="milieu-intro">
            <h2>{{milieuService.intro.title}}</h2>
            <div [innerHtml]="milieuService.intro.text"></div>
          </div>
        </div>
      </div>
    </modal-vue>`,
  animations: [fadeInOutAnimation]
})
export class IntroVueComponent extends MilieuVue {
  @Input() milieuService: any;
  showCollapseControl = false;

}

@Component({
  selector: 'item-controls',
  template: `
    <div class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown"></a>
        <div class="dropdown-menu dropdown-menu-right" >
          <a class="dropdown-item" (click)="milieuService.delete(item._id)" *ngIf="admin"><div class="material-icons">delete_forever</div>Delete</a>
          <a class="dropdown-item update" (click)="milieuService.changeSelectedItem(item)" *ngIf="admin"><div class="material-icons">create</div> Update</a>
          <a class="dropdown-item" (click)="milieuService.addFavorite(this.item._id)" *ngIf="accountService.authenticated"><div class="material-icons">favorite</div> Favorite</a>
        </div>
    </div>`
})
export class ItemControlsComponent {

  @Input() item: any;
  @Input() milieuService: any;

  constructor(private accountService: AccountService) { }

  get admin() {
    return this.accountService.admin
  }
}

@Component({
  selector: 'item-search',
  template: `
    <input #searchBox (keyup)="search(searchBox.value)" class="form-control" type="text" placeholder="Search">
      <div class='search-result' *ngIf="searchResults.length > 0">
        <a *ngFor="let result of searchResults" class="dropdown-item" routerLink="/{{result.link}}" (click)="searchBox.value=result.title; search('')" >{{result.title}}</a>
      </div>`
})
export class ItemSearchComponent implements OnInit {
  searchResults = [];
  keyWords = [];

  @Input() milieuService: any;

  ngOnInit() {
    const urlify = this.milieuService.urlify,
      directory = this.milieuService.config.directory,
      fields = this.milieuService.config.fields;

    let count = 0;

    fields.forEach((field) => {
      count++;
      field['values'].forEach((value) => {
        this.keyWords.push({ link: `${directory}/${field['name']}/${urlify(value['name'])}`, title: value['name'] });

        if (count < fields.length) {
          let subField = (fields[count]);

          subField['values'].forEach((subValue) => {
            this.keyWords.push({ link: `${directory}/${field['name']}/${urlify(value['name'])}/${subField['name']}/${urlify(subValue['name'])}`, title: `${value['name']} ${subValue['name']}` });
          });
        }
      });
    });
  }

  search(string: '') {

    this.searchResults = [];

    if (string.length > 0) {
      this.keyWords.forEach((word) => {
        let regEx = new RegExp(string, 'i')
        if (word['title'].match(regEx)) {
          this.searchResults.push(word);
        }
      });
    }
  }
}



export class ListVue extends MilieuVue {
  showBig = true;
  items: {};

  @Input() milieuService: any;

  ngOnInit() {
    this.milieuService.currentFilteredItems.subscribe(filteredItems => {
      this.items = filteredItems;
    })
  }

  trackByItem(index: number, item) {
    return item._id;
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
export class ViewPortComponent { }


//***** VUE CONTROLS & EXTENDS *****/





@Component({
  selector: 'modal-controls',
  template: `<div><a class="material-icons" ><div class="close-modal">clear</div></a></div>`
})
export class ModalControlsComponent extends VueControlComponent { }

@Component({
  selector: 'sized-items-vue-control',
  template: `
    <div class="dropdown" >
      <a class="dropdown-toggle" data-toggle="dropdown"></a>
      <div class="dropdown-menu dropdown-menu-right" >
        <!-- <a class="dropdown-item" (click)="hideVue.emit()"><div class="material-icons">remove_circle</div> Hide</a> -->
        <a class="dropdown-item" (click)="modalVue.emit()"  ><div class="material-icons">open_in_browser</div> Modal</a>
        <a class="dropdown-item" (click)="toggleItemSizeEvent.emit()"><div class="material-icons">swap_vert</div>Toggle Size</a>
      </div>
    </div>`
})
export class SizedItemsVueControlsComponent extends VueControlComponent {

  @Output() toggleItemSizeEvent = new EventEmitter();
}

@Component({
  selector: 'milieu-sidebar',
  template: `
  <div [ngClass]="{'sidebar': win.innerWidth >= largeViewPort}"   (click)="sidebarClick($event)" *ngIf="show || !hasModal">
    <div [@fadeInOut]="'in'"[ngClass]="{'drawer': win.innerWidth < largeViewPort && hasModal }">
      <div [ngClass]="{'modal-vue-content': win.innerWidth < largeViewPort && hasModal}">
        <ng-content></ng-content>
      </div>
    </div>
  </div>`,
  animations: [fadeInOutAnimation, flyInOut]
})
export class MilieuSideBarComponent extends MilieuVue {

  win = window;
  largeViewPort = this.appService.media.lg;
  @Input() hasModal = null;
  show = (window.innerWidth < this.largeViewPort) ? false : true;

  constructor(public milieuService: MilieuService, public appService: AppService) { super(milieuService); }

  sidebarClick(e) { if (e.target.className.search(/modal-mode/) > -1 || e.target.className.search(/close-modal/) > -1) this.show = false }
}
/* Copyright AEO all rights reserved */
