import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Config } from './config';
import { Field } from './field';

import { Utilities } from '../utilities';

import { Location } from '@angular/common';

import { ActivatedRoute } from "@angular/router";

'use strict';

@Injectable()
export class DashBoardService {

  config: Config;

  private itemsSource = new BehaviorSubject<Object[]>([]);
  private filteredItemsSource = new BehaviorSubject<Object[]>([]);
  private selectedItemSource = new BehaviorSubject<Object>({});
  private readonly headers = new Headers({ 'Content-Type': 'application/json' });

  currentItems = this.itemsSource.asObservable();
  currentFilteredItems = this.filteredItemsSource.asObservable();
  currentSelectedItem = this.selectedItemSource.asObservable();

  constructor(private route: ActivatedRoute, private httpG: Http, private utils: Utilities, private location: Location) { } // todo see if we can get rid of the httpG

  // todo see if there is a way of getting rid of observable => Promise => observable;
  // todo add filtering in here
  refresh() {

    let items = this.httpG.get(`api/${this.config.name}`).toPromise().then(response => response.json().data);
    items.then(items => {
      this.changeItems(items);
      this.changeFilteredItems(items);
      this.currentItems.subscribe(items => {
        this.changeSelectedItem(items[0]);
      });
      this.filter();
    });
  }

  changeItems(items: Object[]) { this.itemsSource.next(items) }
  changeFilteredItems(filteredItems: Object[]) { this.filteredItemsSource.next(filteredItems) }
  changeSelectedItem(selectedItem: Object) { this.selectedItemSource.next(selectedItem) }

  init() {
    this.refresh();
    this.config.fieldsRaw.forEach(fieldRaw => {
      let newField: Field = { name: fieldRaw.name, values: [] };
      fieldRaw.values.forEach(value => newField.values.push({ name: value, filtered: false }));
      this.config.fields.push(newField);
    });
    //this.filter();




    //this.config.fields[0].values[0].filtered = true;
    //console.log(this.config.fields[0].values[0].filtered);

  }

  create(item: any): Promise<any> {
    const url = `api/${this.config.name}`;
    //let json = {'jem': item};
    let something = JSON.stringify({ 'jem': item });
    //return item;
    return this.httpG
      .post(url, something, { headers: this.headers })
      .toPromise()
      .then((res) => {
        item._id = res.json(); //console.log(jem._id, res.json());
        return item;
      })
      .catch(this.handleError);
  }

  delete(id: string): string {

    let url = `api/${this.config.name}/${id}`

    //console.log(url);

    this.httpG.delete(url).toPromise().then((response) => {
      //console.log(response);
    });

    this.refresh();

    //console.log(response);

    return 'success';
  }

  filter(): void {

    //this.itemsFiltered = this.items;

    //console.log('You called filter');

    let itemsFiltered: Object[];
    this.currentItems.subscribe(items => {
      itemsFiltered = items;

      this.config.fields.forEach(field => {
        let filtered = [], filters: String[] = [];

        field.values.forEach(value => { if (value.filtered) filters.push(value.name) });

        if (filters.length > 0) {
          filters.forEach(filter => {
            itemsFiltered.forEach(item => {
              if (item[field.name] === filter) filtered.push(item);
            });
          });
          itemsFiltered = filtered;
        }
      });

    });

    this.changeFilteredItems(itemsFiltered);

    this.updateUrl();
  }

  private updateUrl(): void {

    let url: string = 'code-jems'; // todo put this in as a config var
    let qs: string = '';
    let fieldPaths: String[] = [];
    let queryStrings = [];


    this.config.fields.forEach(field => {
      let filters = [];
      field.values.forEach(value => { if (value.filtered) filters.push(value.name) });

      if (filters.length === 1) {
        fieldPaths.push(`${this.utils.urlify(field.name)}/${this.utils.urlify(filters[0])}`);
      } else if (filters.length > 1) {
        queryStrings.push(`${this.utils.urlify(field.name)}=${this.utils.urlify(filters.join(','))}`);
      }
    });

    this.location.replaceState(`${url}/${fieldPaths.join('/')}`, `${queryStrings.join('&')}`);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }




}

/* Copyright AEO all rights reserved */
