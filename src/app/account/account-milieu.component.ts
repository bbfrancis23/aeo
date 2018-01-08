import { Component, ViewChild } from '@angular/core';
import { AccountService } from './account.service';
import { MilieuService } from '../milieu/milieu.service';
import { CreateAccountVueComponent } from './create-account-vue.component';


'use strict';

@Component({
  selector: 'account-milieu',
  template: `
  <view-port>
    <media><div class="media-wrapper"><img src="assets/img/code.jpg" ></div></media>
    <content>
      <div *ngIf="accountService.authenticated === false"><create-account-vue [accountService]="accountService" ></create-account-vue></div>
      <div *ngIf="accountService.authenticated === true;"><account-vue></account-vue></div>
    </content>
  </view-port>`,
  providers: [MilieuService]
})
export class AccountMilieuComponent {

  @ViewChild(CreateAccountVueComponent) createVue;

  constructor(public accountService: AccountService){

  }
}
/* Copyright AEO all rights reserved */
