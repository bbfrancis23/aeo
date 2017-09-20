import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Jem } from './jem';

@Injectable()
export class JemService{

  private headers = new Headers({'Content-Type': 'application/json'});
  private jemUrl = 'api/jems';

  constructor(private http: Http){}

  /*getCollectionByName(name: string): Promise<Collection>{
    const url = `${this.collectionUrl}/${name}`;
    let result = this.http.get(url).toPromise().then((response) =>{ let r = response.json().data as Collection; return r;}).catch(this.handleError);
    return result;
  }*/

  getJems(): Promise<Jem[]>{
    return this.http.get(this.jemUrl).toPromise().then(response => response.json().data as Jem[]);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
