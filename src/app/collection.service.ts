import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Collection } from './collection';

@Injectable()
export class CollectionService{

  private headers = new Headers({'Content-Type': 'application/json'});
  private collectionUrl = 'api/collection';

  constructor(private http: Http){}

  getCollectionByName(name: string): Promise<Collection>{
    const url = `${this.collectionUrl}/${name}`;
    let result = this.http.get(url).toPromise().then((response) =>{ let r = response.json().data as Collection; return r;}).catch(this.handleError);
    return result;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
