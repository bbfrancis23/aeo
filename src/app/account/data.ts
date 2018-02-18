import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from "@angular/router";

import { Config, MilieuService } from '../milieu/data';

export const ACCOUNT_CONFIG: Config = {
  title: 'User Account',
  name: 'accounts',
  directory: 'account',

  itemsMode: false
};

export class Account {
  _id?: string; // DO NOT CHANGE - other code depends on no default value;

  username = '';
  email = '';
  password = '';
}

@Injectable()
export class AccountService extends MilieuService {

  email = { min: 5, max: 64, value: '' };
  username = { min: 4, max: 16, pattern: /^[\w]+$/, value: '' };
  password = { min: 4, max: 16, pattern: /^[^\s]+$/ };

  authenticated = false;
  admin = false;
  user = false;

  constructor(public http: Http, public location: Location, public router: Router) {
    super(http, location);
    this.config = ACCOUNT_CONFIG;

    this.http.get('api/session').toPromise().then(result => {

      if (result.json().message === 'Admin') {
        this.admin = true;

        this.authenticated = true;
      } else if (result.json().message === 'User') {
        this.user = true;
        this.authenticated = true;

      } else {
        this.authenticated = false;
      }
    });

    this.init();

    this.http.get('api/account').toPromise().then(result => {
      if (result.json().data) {
        this.username.value = result.json().data.username;
        this.email.value = result.json().data.email;
      }
    });
  }

  logOut() {
    this.http.get('api/logout').toPromise().then(response => {
      //console.log(response);
      window.location.reload();
    });
  }

  resetPassword(email) {
    return this.http.post('api/reset-password', JSON.stringify({ 'email': email }), { headers: this.headers }).toPromise().then(response => {
      return response.json().mailsent;
    });
  }

  uniqueUserName(username) {
    return this.http.post(`api/unique-user-name`, JSON.stringify({ 'username': username }), { headers: this.headers }).toPromise().then(response => {
      return response.json().unique;
    }).catch(this.handleError);
  }

  uniqueEmail(email) {
    return this.http.post('api/unique-email', JSON.stringify({ 'email': email }), { headers: this.headers }).toPromise().then(response => {
      return response.json().unique;
    }).catch(this.handleError);
  }

  updateEmail(email) {
    return this.http.post(`api/update-email`, JSON.stringify({ 'email': email }), { headers: this.headers }).toPromise().then(response => {
      return response.json();
    }).catch(this.handleError);
  }

  updateUserName(username) {
    return this.http.post(`api/update-user-name`, JSON.stringify({ 'username': username }), { headers: this.headers }).toPromise().then(response => {
      return response.json();
    }).catch(this.handleError);
  }

  updatePassword(password: string, token?: string) {
    if (token) {
      return this.http.post(`api/reset-pw`, JSON.stringify({ 'password': password, 'resetToken': token }), { headers: this.headers }).toPromise().then(response => {
        return response.json();
      }).catch(this.handleError);
    } else {
      return this.http.post(`api/update-password`, JSON.stringify({ 'password': password }), { headers: this.headers }).toPromise().then(response => {
        return response.json();
      }).catch(this.handleError);
    }
  }

  validResetId(id) {
    return this.http.post('api/valid-reset-id', JSON.stringify({ 'resetCode': id }), { headers: this.headers }).toPromise().then(response => {
      return response.json().valid;
    });
  }

  login(logInFields) {

    return this.http.post(`api/login`, logInFields, { headers: this.headers }).toPromise().then(response => {


      //console.log(response.json().message);
      if (response.json().login) {

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }

      return response.json();
    }).catch(this.handleError);


  }
}
/* copyright 2017 AEO All Rights Reserved. */
