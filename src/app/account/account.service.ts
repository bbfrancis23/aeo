import { Injectable} from '@angular/core';
import { MilieuService } from '../milieu/milieu.service';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { ACCOUNT_CONFIG } from './account-config';

@Injectable()
export class AccountService extends MilieuService {

  username: '';
  email: '';

  constructor(public route: ActivatedRoute, protected readonly http: Http, public readonly location: Location) {
    super(route,http,location);
    this.config = ACCOUNT_CONFIG;
    this.init();

    this.http.get('api/account').toPromise().then(result => {

      if(result.json().data){

              this.username = result.json().data.username;
              this.email = result.json().data.email;
      }

    });
  }

  uniqueUserName(username){
    return this.http.post(`api/unique-user-name`, JSON.stringify({'username':username}), { headers: this.headers }).toPromise().then(response => {
      return response.json().unique;
    }).catch(this.handleError);
  }

  uniqueEmail(email){
    return this.http.post('api/unique-email', JSON.stringify({'email':email}), { headers: this.headers}).toPromise().then(response => {
      return response.json().unique;
    }).catch(this.handleError);
  }

}
