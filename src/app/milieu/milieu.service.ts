import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Config } from './data-classes';
import { Field } from './data-classes';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Location } from '@angular/common';
import { Utilities } from '../utilities';

'use strict';

// opt-js //

@Injectable()
export class MilieuService {

  config: Config;

  private readonly headers = new Headers({ 'Content-Type': 'application/json' });
  api = 'api';
  _dashBoard = false;
  dashBoardPermission = 'admin';
  pageTitle = '';
  itemsMode = true;
  authenticated = false;
  admin = false;
  requireAuth = false;


  private readonly itemsSource = new BehaviorSubject<{}[]>([]);
  private readonly filteredItemsSource = new BehaviorSubject<{}[]>([]);
  private readonly selectedItemSource = new BehaviorSubject<{}>({});

  readonly currentItems = this.itemsSource.asObservable();
  readonly currentFilteredItems = this.filteredItemsSource.asObservable();
  readonly currentSelectedItem = this.selectedItemSource.asObservable();

  changeItems(items: {}[]) { this.itemsSource.next(items) }
  changeFilteredItems(filteredItems: {}[]) { this.filteredItemsSource.next(filteredItems) }
  changeSelectedItem(selectedItem: {}) { this.selectedItemSource.next(selectedItem) }

  constructor(protected route: ActivatedRoute, protected readonly http: Http, protected readonly utils: Utilities, protected readonly location: Location) { }

  get dashBoard() { return this._dashBoard; }
  set dashBoard(b: boolean) {
    if(this.dashBoardPermission === 'admin' && this.admin || !(this.dashBoardPermission === 'admin'))
    this._dashBoard = b;
    this.updateUrl();
  }
  //create(item: any): Promise<any> {
  login(logInFields){

    return this.http.post(`api/login`, logInFields, { headers: this.headers }).toPromise().then(response => {

      //console.log(response.json().message);
      return response.json().message;
    }).catch(this.handleError);


  }

  // todo see if there is a way of getting rid of observable => Promise => observable;
  refresh() {

    this.http.get('api/session').toPromise().then(result => {

      if(result.json().message === 'Admin'){
        this.admin = true;

        this.authenticated = true;
      }
    });

    //console.log(this.itemsMode);

    if (this.itemsMode === true) {
      let items = this.http.get(`api/${this.config.name}`).toPromise().then(response => response.json().data);
      items.then(items => {
        this.changeItems(items);
        this.changeFilteredItems(items);
        this.currentItems.subscribe(items => {
          this.changeSelectedItem(items[0]);
        });
        this.filter();
      });


    }
    
  }

  init() {


    if(this.config.itemsMode === false){
      this.itemsMode = false;
    }


    if(this.config.requireAuth === true){
      this.requireAuth = true;
    }

    this.refresh();
    // takes fieldsRaw ['Git', 'JavaScript', 'HTML'] and converts them to [name: 'Git', filtered: false ]
    // this saves typing / time on config file creation.


    this.config.fieldsRaw.forEach(fieldRaw => {
      let newField: Field = { name: fieldRaw.name, values: [] };
      fieldRaw.values.forEach(value => newField.values.push({ name: value, filtered: false }));
      this.config.fields.push(newField);
    });
    delete this.config.fieldsRaw;
    this.pageTitle = this.config.title;

  }

  // todo: overhaul on this after doing the server side //
  create(item: any): Promise<any> {
    const url = `${this.api}/${this.config.name}`;
    let something = JSON.stringify({ 'jem': item }); // this need to change to data
    return this.http
      .post(url, something, { headers: this.headers })
      .toPromise()
      .then((res) => {
        //item._id = res.json(); //console.log(jem._id, res.json());
        return item;
      })
      .catch(this.handleError);
  }

  // todo over hault on this after doing the server side //
  delete(id: string): string {

    let url = `api/${this.config.name}/${id}`

    //console.log(url);

    this.http.delete(url).toPromise().then((response) => {
      //console.log(response);
    });

    this.refresh();

    //console.log(response);

    return 'success';
  }

  /*
  filter() {

    let itemsFiltered: any[];
    this.currentItems.subscribe(items => {
      itemsFiltered = items;

      this.config.fields.forEach(field => {
        let filtered = [], filters: string[] = [];

        field.values.forEach(value => { if (value.filtered) filters.push(value.name) });

        if (filters.length > 0) {
          filters.forEach(filter => {
            itemsFiltered.forEach(item => {
              if (item[field.name] === filter){
                filtered.push(item);
              }
            });
          });
          itemsFiltered = filtered;
        }
      });

    });

    this.changeFilteredItems(itemsFiltered);

    this.updateUrl();
  }
  */ //


  filter(col = "title", value = ''){

    let itemsFiltered: {}[];
    this.currentItems.subscribe(items => {
      itemsFiltered = items;

      this.config.fields.forEach(field => {
        let filtered = [], filters: string[] = [];

        field.values.forEach(value => { if (value.filtered) filters.push(value.name) });

        if (filters.length > 0) {
          filters.forEach(filter => {
            itemsFiltered.forEach(item => {
              if (item[field.name] === filter) {
                let regExp = new RegExp(value, "i")
                if(item[col].search(regExp) > -1){
                  filtered.push(item);
                }
              }
            });
          });
          itemsFiltered = filtered;
        }else{
          itemsFiltered.forEach(item => {

            //console.log();

            let regExp = new RegExp(value, "i")
            if(item[col].search(regExp) > -1){
              filtered.push(item);
            }
          });
          itemsFiltered = filtered;
        }
      });

    });

    //console.log(itemsFiltered.length);

    this.changeFilteredItems(itemsFiltered);
    this.updateUrl();
  }

  private updateUrl(): void {

    //console.log(this.dashBoard);

    let url = this.config.directory, qs: string = '', fieldPaths: string[] = [], queryStrings: string[] = [], selectedFilters: string[] = [];


    if (this.dashBoard) {
      queryStrings.push(`dash-board=true`);
    }

    this.config.fields.forEach(field => {
      let filters = [];
      field.values.forEach(value => { if (value.filtered) filters.push(value.name) });

      if (filters.length === 1) {
        fieldPaths.push(`${this.utils.urlify(field.name)}/${this.utils.urlify(filters[0])}`);
        selectedFilters.push(filters[0]);

      } else if (filters.length > 1) {
        queryStrings.push(`${this.utils.urlify(field.name)}=${this.utils.urlify(filters.join(','))}`);
      }
    });

    this.location.replaceState(`${url}/${fieldPaths.join('/')}`, `${queryStrings.join('&')}`);
    this.pageTitle = selectedFilters.length > 0 ? selectedFilters.join(' ') : this.config.title;
  }

  searchItems(term: string){
    return ['your mom', 'my mom', 'our mom'];
  }

  // over hault this after backend
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }




}

/* Copyright AEO all rights reserved */
