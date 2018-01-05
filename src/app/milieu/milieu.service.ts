import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Config, Field } from './data-classes';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Location } from '@angular/common';

'use strict';

// opt-js //

@Injectable()
export class MilieuService {

  config: Config;

  protected readonly headers = new Headers({ 'Content-Type': 'application/json' });
  api = 'api';
  _dashBoard = false;
  dashBoardPermission = 'admin';
  pageTitle = '';
  itemsMode = true;
  authenticated = null;
  admin = false;
  user = false;
  requireAuth = false;

  //filterMode = false;


  private readonly itemsSource = new BehaviorSubject<{}[]>([]);
  private readonly filteredItemsSource = new BehaviorSubject<{}[]>([]);
  private readonly selectedItemSource = new BehaviorSubject<{}>({});

  readonly currentItems = this.itemsSource.asObservable();
  readonly currentFilteredItems = this.filteredItemsSource.asObservable();
  readonly currentSelectedItem = this.selectedItemSource.asObservable();

  changeItems(items: {}[]) { this.itemsSource.next(items) }
  changeFilteredItems(filteredItems: {}[]) { this.filteredItemsSource.next(filteredItems);}
  changeSelectedItem(selectedItem: {}) { this.selectedItemSource.next(selectedItem) }

  //private readonly itemSource = new BehaviorSubject<{}[]>([]);
  //readonly currentItem = this.itemSource.asObservable();

  constructor(public route: ActivatedRoute, protected readonly http: Http, public readonly location: Location) { }

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
      if(response.json().message === 'Login Successful'){

        window.location.reload();
      }

      return response.json().message;
    }).catch(this.handleError);


  }

  // todo see if there is a way of getting rid of observable => Promise => observable;
  refresh() {

    //console.log('refresh called');

    this.http.get('api/session').toPromise().then(result => {

      if(result.json().message === 'Admin'){
        this.admin = true;

        this.authenticated = true;
      }else{
        //console.log(result.json().message);
        this.authenticated = true;
        this.admin = true;
      }
    });

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

  logOut(){
    this.http.get('api/logout').toPromise().then(response => {
      //console.log(response);
      window.location.reload();
    });
  }

  init() {

    if(this.config.itemsMode === false){
      this.itemsMode = false;
    }

    if(this.config.requireAuth === true){
      this.requireAuth = true;
    }

    this.http.get('api/session').toPromise().then(result => {

      if(result.json().message === 'Admin'){
        this.admin = true;

        this.authenticated = true;
      }else if (result.json().message === 'User'){
        this.user = true;
        this.authenticated = true;

      }else{
        this.authenticated = false;
      }

    });



    if (this.itemsMode === true) {
      let items = this.http.get(`api/${this.config.name}`).toPromise().then(response => response.json().data);
      items.then(items => {
        this.changeItems(items);
        this.changeFilteredItems(items);
        this.currentItems.subscribe(items => {
          this.changeSelectedItem(items[0]);
        });

      });


    }
    // takes fieldsRaw ['Git', 'JavaScript', 'HTML'] and converts them to [name: 'Git', filtered: false ]
    // this saves typing / time on config file creation.

    if(this.config.fieldsRaw){
      this.config.fieldsRaw.forEach(fieldRaw => {
        let newField: Field = { name: fieldRaw.name, values: [] };
        fieldRaw.values.forEach(value => newField.values.push({ name: value, filtered: false }));
        this.config.fields.push(newField);
      });
      delete this.config.fieldsRaw;
    }



    this.pageTitle = this.config.title;

  }

  // todo: overhaul on this after doing the server side //
  create(item: any): Promise<any> {
    const url = `${this.api}/${this.config.name}`;
    let something = JSON.stringify({ 'jem' : item }); // this need to change to data
    //console.log(something);
    return this.http
      .post(url, something, { headers: this.headers })
      .toPromise()
      .then((res) => {
        return item;
      })
      .catch(this.handleError);
  }

  createItem(item: any){
    const url = `${this.api}/${this.config.name}`;
    let something = JSON.stringify({ 'item' : item });
    return this.http
      .post(url, something, { headers: this.headers })
      .toPromise()
      .then((res) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  // todo over hault on this after doing the server side //
  delete(id: string): string {

    let url = `api/${this.config.name}/${id}`

    this.http.delete(url).toPromise().then((response) => {
    });

    this.refresh();

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

    //console.log('filter called');

    let itemsFiltered: {}[];
    this.currentItems.subscribe(items => {

      //console.log(items);

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

            let regExp = new RegExp(value, "i")
            if(item[col].search(regExp) > -1){
              filtered.push(item);
            }
          });
          itemsFiltered = filtered;
        }
      });

    });
    this.changeFilteredItems(itemsFiltered);
    this.updateUrl();
  }

  private updateUrl(): void {


    let url = this.config.directory, qs: string = '', fieldPaths: string[] = [], queryStrings: string[] = [], selectedFilters: string[] = [];


    if (this.dashBoard) {
      queryStrings.push(`dash-board=true`);
    }

    this.config.fields.forEach(field => {
      let filters = [];
      field.values.forEach(value => { if (value.filtered) filters.push(value.name) });

      if (filters.length === 1) {
        fieldPaths.push(`${this.urlify(field.name)}/${this.urlify(filters[0])}`);
        selectedFilters.push(filters[0]);

      } else if (filters.length > 1) {
        queryStrings.push(`${this.urlify(field.name)}=${this.urlify(filters.join(','))}`);
      }
    });

    this.location.replaceState(`${url}/${fieldPaths.join('/')}`, `${queryStrings.join('&')}`);
    this.pageTitle = selectedFilters.length > 0 ? selectedFilters.join(' ') : this.config.title;


  }

  searchItems(term: string){
    return ['your mom', 'my mom', 'our mom'];
  }

  // over hault this after backend
  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }



  unUrlify(string: string) {
    string = string || '';

    string = string.replace(/[^A-Za-z0-9\s\-]/g, '');
    string.trim();
    string = string.replace(/\-+/g, " ");
    string = string.toLowerCase();

    return string;
  }


  urlify(string: string): string {
    string = string || '';

    string = string.replace(/[^A-Za-z0-9\s\,\-]/g, '');
    string.trim();
    string = string.replace(/\s+/g, "-");
    string = string.toLowerCase();

    return string;
  }


  routeConfig(route) {

    route.params.subscribe(params => {

      this.config.fields.forEach(field => {

        field.values.forEach(data=>{
          data.filtered = false;
        })

        if (params[field.name]) {



          let param = this.unUrlify(params[field.name]);
          field.values[field.values.findIndex(value => value.name.toLowerCase() === param)].filtered = true;
        }
        this.filter();
        //console.log(field);
      });
    });

    route.queryParams.subscribe(params => {

      if (params['dash-board'] ) {
        this.dashBoard = true;
      }

      this.config.fields.forEach(field => {
        if (params[field.name]) {
          let values: string[] = params[field.name].split(',');
          values.forEach(value => {
            let param = this.unUrlify(value);
            field.values[field.values.findIndex(value => value.name.toLowerCase() === param)].filtered = true;
          });
        }
      });
    });

  }
}

/* Copyright AEO all rights reserved */
