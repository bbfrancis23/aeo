import { Injectable } from '@angular/core' ;

import { Headers, Http } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Config } from './config';

@Injectable()
export class DashBoardService {

    config: Config;

    private itemsSource = new BehaviorSubject<Object[]>([]);
    private filteredItemsSource = new BehaviorSubject<Object[]>([]);
    private selectedItemSource = new BehaviorSubject<Object>({})

    currentItems = this.itemsSource.asObservable();

    constructor(private httpG: Http){} // todo see if we can get rid of the httpG

    // todo see if there is a way of getting rid of observable => Promise => observable;
    refresh(){
      let items = this.httpG.get(`api/${this.config.name}`).toPromise().then(response => response.json().data);
      items.then(items=> this.changeItems(items));
    }

    changeItems( items: any[] ){ this.itemsSource.next( items ); }
}
