import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;
  private url = 'api/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get("/api/users")
      .map(result => this.result = result.json().data);
  }

  create(item: any,collection: string,name:string): Promise<any>{
    const url = `${this.url}${collection}`;
    //let json = {'jem': item};
    let something = JSON.stringify({[name] :item});
    //return item;
    return this._http
     .post(url, something, {headers: this.headers})
     .toPromise()
     .then((res) => {item._id = res.json(); //console.log(jem._id, res.json());
       return item;})
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  delete(id:string, collection:string): string{

    let url = `${this.url}/${collection}/${id}`

    console.log(url);

    this._http.delete(url).toPromise().then((response)=>{
      console.log(response);
    });



    //console.log(response);

    return 'success';
  }

}
