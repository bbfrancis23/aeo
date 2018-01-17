import { Injectable} from '@angular/core';
import { MilieuService } from '../milieu/milieu.service';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { ACCOUNT_CONFIG } from './account-config';

@Injectable()
export class AccountService extends MilieuService {

  email = {min:5, max:64, value: ''};
  username = { min: 4, max: 16, pattern: /^[\w]+$/, value: ''};
  password = { min: 4, max: 16, pattern: /^[^\s]+$/};

  constructor(public route: ActivatedRoute, protected readonly http: Http, public readonly location: Location) {
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

  resetPassword(){
    this.http.get('api/reset-password').toPromise().then(response => {
      console.log(response);
    })
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

  updatePassword(password){
    return this.http.post(`api/update-password`, JSON.stringify({'password':password}), { headers: this.headers }).toPromise().then(response => {
      //console.log(response.json());
      return response.json();
    }).catch(this.handleError);
  }
}
