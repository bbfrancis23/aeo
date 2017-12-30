import { Injectable} from '@angular/core';
import { MilieuService } from '../milieu/milieu.service';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { Utilities } from '../utilities';
import { ActivatedRoute } from "@angular/router";
import { ACCOUNT_CONFIG } from './account-config';

@Injectable()
export class AccountService extends MilieuService {

  username: '';
  email: '';

  constructor(public route: ActivatedRoute, protected readonly http: Http, protected readonly utils: Utilities, public readonly location: Location) {
    super(route,http,utils,location);
    this.config = ACCOUNT_CONFIG;
    this.init();

    this.http.get('api/account').toPromise().then(result => {
      //console.log(result.json().data);

      this.username = result.json().data.username;
      this.email = result.json().data.email;
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
