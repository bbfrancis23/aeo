import { Component } from '@angular/core';
import { AccountService } from './account.service';
import { MilieuService } from '../milieu/milieu.service';

'use strict';

@Component({
  selector: 'account-milieu',
  template: `
  <view-port>
    <media><div class="media-wrapper"><img src="assets/img/code.jpg" ></div></media>
    <content>
      <create-account-vue [accountService]="accountService"></create-account-vue>
    </content>
  </view-port>`,
  providers: [MilieuService]
})
export class AccountMilieuComponent{
  constructor(public accountService: AccountService){
  }
}
/* Copyright AEO all rights reserved */
