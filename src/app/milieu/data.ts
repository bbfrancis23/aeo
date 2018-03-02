import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

'use strict';

// FieldRaw converts to Field to make config files easier to understand for the user.

export class Config {
  title: string;
  name: string;
  directory: string;

  intro?: string;
  img?: string;

  itemsMode: boolean;
  requireAuth?: boolean;

  fieldsRaw?: FieldRaw[];
  fields?: Field[];
  fieldsDetail?: {};
}

export class Field {
  name: string;
  values = [{ name: '', filtered: false }];
}

export class FieldRaw {
  name: string;
  values: string[];
}


@Injectable()
export class MilieuService {

  config: Config;
  protected readonly headers = new Headers({ 'Content-Type': 'application/json' });

  api = 'api';
  pageTitle = '';

  intro = { title: '', img: '', text: '' }

  collectionMode = false;
  collectionName = '';

  favoritesMode = false;

  private readonly itemsSource = new BehaviorSubject<{}[]>([]);
  private readonly filteredItemsSource = new BehaviorSubject<{}[]>([]);
  private readonly selectedItemSource = new BehaviorSubject<{}>({});

  readonly currentItems = this.itemsSource.asObservable();
  readonly currentFilteredItems = this.filteredItemsSource.asObservable();
  readonly currentSelectedItem = this.selectedItemSource.asObservable();

  private changeItems(items: {}[]) { this.itemsSource.next(items) }
  private changeFilteredItems(filteredItems: {}[]) { this.filteredItemsSource.next(filteredItems); }
  private changeSelectedItem(selectedItem: {}) { this.selectedItemSource.next(selectedItem) }

  constructor(readonly http: Http, readonly location: Location) { }

  init() {



    const config = this.config, rawFields = config.fieldsRaw;

    if (rawFields) {

      rawFields.forEach(rawField => {
        let newField: Field = { name: rawField.name, values: [] };
        rawField.values.forEach(value => newField.values.push({ name: value, filtered: false }));
        config.fields.push(newField);
      });
      delete config.fieldsRaw;
    }
    this.pageTitle = config.title;
    this.intro.title = config.title;
    this.intro.text = config.intro;
    this.intro.img = config.img;
  }

  populate() {

    if (this.config.itemsMode && !this.favoritesMode) {

      let items = this.http.get(`api/${this.config.name}`).toPromise().then(response => response.json().data);

      items.then(items => {
        this.changeItems(items);
        this.changeFilteredItems(items);
        this.currentItems.subscribe(items => this.changeSelectedItem(items[0]));
        this.filter();
      });
    } else if (this.config.itemsMode && this.favoritesMode) {

      let items = this.http.get(`api/${this.config.name}/favorites`).toPromise().then(response => response.json().data);


      items.then(items => {
        this.changeItems(items);
        this.changeFilteredItems(items);
        this.currentItems.subscribe(items => this.changeSelectedItem(items[0]));
        this.filter();
      });



    }
  }

  createItem(item: any): Promise<any> {
    return this.http.post(`${this.api}/${this.config.name}`, JSON.stringify({ 'item': item }), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  addFavorite(id: string): Promise<any> {
    return this.http.get(`${this.api}/${this.config.name}/add-favorite/${id}`)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  delete(id: string): Promise<any> {
    return this.http.delete(`api/${this.config.name}/${id}`).toPromise().then(res => { this.populate(); return res.json() }).catch(this.handleError);
  }

  clearFilters() {
    this.config.fields.forEach(field => {
      field.values.forEach(value => {
        value.filtered = false;
      })
    });

  }

  filter(col = "title", value = '') {
    let itemsFiltered: {}[];

    this.currentItems.subscribe(items => {
      itemsFiltered = items;

      this.config.fields.forEach(field => {
        let filtered = [], filters: string[] = [];

        field.values.forEach(value => {

          if (value.filtered) {
            filters.push(value.name);
          }
        });




        if (filters.length > 0) {




          filters.forEach(filter => {

            itemsFiltered.forEach(item => {

              if (item[field.name] === filter) {



                let regExp = new RegExp(value, "i");

                if (item[col].search(regExp) > -1) {
                  filtered.push(item);
                }
              }
            });
          });

          itemsFiltered = filtered;
        } else {

          itemsFiltered.forEach(item => {
            let regExp = new RegExp(value, "i");

            if (item[col]) {
              if (item[col].search(regExp) > -1) {
                filtered.push(item)
              }
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



    const config = this.config,
      url = config.directory;

    let qs: string = '',
      fieldPaths: string[] = [],
      queryStrings: string[] = [],
      selectedFilters: string[] = [],
      validImage = false,
      validText = false;

    if (this.favoritesMode) {
      queryStrings.push('favorites=true');
    }

    config.fields.forEach(field => {
      let filters = [];

      field.values.forEach(value => {
        if (value.filtered) {
          filters.push(value.name);

          if (this.config.fieldsDetail[value.name].img) {
            this.intro.img = this.config.fieldsDetail[value.name].img;
            validImage = true;
          }

          if (this.config.fieldsDetail[value.name].text) {
            if (validText) {
              this.intro.text += `<h3>${value.name}</h3><p>${this.config.fieldsDetail[value.name].text}</p>`;
            } else {
              this.intro.text = `<h3>${value.name}</h3><p>${this.config.fieldsDetail[value.name].text}</p>`;
            }

            validText = true;
          }
        }
      });

      if (filters.length === 1) {
        fieldPaths.push(`${this.urlify(field.name)}/${this.urlify(filters[0])}`);
        selectedFilters.push(filters[0]);
      } else if (filters.length > 1) {
        queryStrings.push(`${this.urlify(field.name)}=${this.urlify(filters.join(','))}`);
      }
    });

    if (fieldPaths.length > 0) {
      this.location.replaceState(`${url}/${fieldPaths.join('/')}`, `${queryStrings.join('&')}`);
    } else {
      this.location.replaceState(`${url}${fieldPaths.join('/')}`, `${queryStrings.join('&')}`);
    }
    this.pageTitle = selectedFilters.length > 0 ? selectedFilters.join(' ') : config.title;

    if (!validImage) {
      this.intro.img = this.config.img;
    }

    if (!validText) {
      this.intro.text = `<p>${this.config.intro}</p>`;
    }
  }


  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
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

    string = string.replace(/^\s+/, '');
    string = string.replace(/\s+$/, '');
    string = string.replace(/[^A-Za-z0-9\s\,\-]/g, '');
    string = string.replace(/\s+/g, "-");
    string = string.replace(/\-+/g, '-');
    string = string.toLowerCase();

    return string;
  }

  routeConfig(route) {

    let processingQuery = true;

    route.params.subscribe(params => {

      this.config.fields.forEach(field => {

        field.values.forEach(data => {
          data.filtered = false;
        })

        if (params[field.name]) {
          let param = this.unUrlify(params[field.name]);
          field.values[field.values.findIndex(value => value.name.toLowerCase() === param)].filtered = true;
        }
      },
        err => {
          console.log(err)
        },

      );
      if (!processingQuery) this.filter();
    });

    route.queryParams.subscribe(params => {

      //console.log(params);

      if (params.favorites) {
        this.favoritesMode = true;
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

      processingQuery = false;
    });
  }
}

/* Copyright AEO all rights reserved */
