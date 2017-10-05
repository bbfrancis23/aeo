import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;
  private url = 'api/';

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get("/api/users")
      .map(result => this.result = result.json().data);
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
