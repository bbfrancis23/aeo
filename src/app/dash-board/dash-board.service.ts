import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Config } from './config';
import { Field } from './field';

'use strict';

@Injectable()
export class DashBoardService {

  config: Config;

  private itemsSource = new BehaviorSubject<Object[]>([]);
  private filteredItemsSource = new BehaviorSubject<Object[]>([]);
  private selectedItemSource = new BehaviorSubject<Object>({});

  currentItems = this.itemsSource.asObservable();
  currentFilteredItems = this.filteredItemsSource.asObservable();
  currentSelectedItem = this.selectedItemSource.asObservable();

  constructor(private httpG: Http) { } // todo see if we can get rid of the httpG

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
    });
  }

  changeItems(items: Object[]) { this.itemsSource.next(items) }
  changeFilteredItems(filteredItems: Object[]) { this.filteredItemsSource.next(filteredItems) }
  changeSelectedItem(selectedItem: Object) { this.selectedItemSource.next(selectedItem) }

  init() {
    this.refresh();
    this.config.fieldsRaw.forEach(fieldRaw => {
      let newField: Field = { name: fieldRaw.name, values: [] };
      fieldRaw.values.forEach(value => newField.values.push({ name: value, filtered: '' }));
      this.config.fields.push(newField);
      //this.filterTile.fields.push(newField);
    });

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

    //this.updateUrl();
  }
}
