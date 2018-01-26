import { Config } from '../milieu/data-classes';
import { Injectable} from '@angular/core';
import { MilieuService } from '../milieu/milieu.service';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";


'use strict';

export const ACCOUNT_CONFIG: Config = {
  title: 'User Account',
  name: 'accounts',
  directory: 'account',
  itemsMode: false
};


export class Account {

  _id?: string ;
  username = '';
  email = '';
  password = '';
}

@Injectable()
export class AccountService extends MilieuService {

  email = {min:5, max:64, value: ''};
  username = { min: 4, max: 16, pattern: /^[\w]+$/, value: ''};
  password = { min: 4, max: 16, pattern: /^[^\s]+$/};

  constructor(public route: ActivatedRoute, protected readonly http: Http, public readonly location: Location, public router: Router) {
    super(route,http,location);
    this.config = ACCOUNT_CONFIG;
    this.init();

    this.http.get('api/account').toPromise().then(result => {

      if(result.json().data){

              this.username.value = result.json().data.username;
              this.email.value = result.json().data.email;
      }

    });
  }

  validResetId(id){
    return this.http.post('api/valid-reset-id', JSON.stringify({'resetCode':id}), { headers: this.headers }).toPromise().then(response => {

      return response.json().valid;
    });
  }

  resetPassword(email){
    return this.http.post('api/reset-password', JSON.stringify({'email':email}), { headers: this.headers }).toPromise().then(response => {
      return response.json().mailsent;
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


  updateUserName(username){
    return this.http.post(`api/update-user-name`, JSON.stringify({'username':username}), { headers: this.headers }).toPromise().then(response => {
      //console.log(response.json());
      return response.json();
    }).catch(this.handleError);
  }

  updateEmail(email){
    return this.http.post(`api/update-email`, JSON.stringify({'email':email}), { headers: this.headers }).toPromise().then(response => {
      //console.log(response.json());
      return response.json();
    }).catch(this.handleError);
  }

  updatePassword(password:string, token?:string){

    console.log(token);

    if(token){
      return this.http.post(`api/reset-pw`, JSON.stringify({'password':password, 'resetToken': token}), { headers: this.headers }).toPromise().then(response => {
        return response.json();
      }).catch(this.handleError);
    }else{
      return this.http.post(`api/update-password`, JSON.stringify({'password':password}), { headers: this.headers }).toPromise().then(response => {
        return response.json();
      }).catch(this.handleError);
    }
  }
}
/* copyright 2017 AEO All Rights Reserved. */