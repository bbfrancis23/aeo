import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Milieu } from '../milieu/milieu';
import { Utilities } from '../utilities';
import { LogInVueComponent } from '../milieu/log-in-vue.component';


import { Account } from './account';
import { ACCOUNT_CONFIG } from './account-config';

import { MilieuService } from '../milieu/milieu.service';

'use strict';

@Component({
  selector: 'account-milieu',
  templateUrl: './account-milieu.component.html',
  styles: [`
    .dash-board-controls{ padding-top: 56px; }
    .container-classic{
      margin-right: auto;
      margin-left: auto;
      padding-right: 15px;
      padding-left: 15px;
      width: 100%;
      max-width: 1400px;
    }

  `],
  providers: [MilieuService]
})
export class AccountMilieuComponent extends Milieu implements OnInit {

  account: Account;

  @ViewChild(LogInVueComponent) logInVue;

  constructor(protected route: ActivatedRoute, protected utils: Utilities, protected data: MilieuService) {
    super(route, utils, data);
    data.itemsMode = false;
    data.config = ACCOUNT_CONFIG;
    this.initConfig();
  }

  ngOnInit() {
    if (!this.data.dashBoard) {

    }

    this.columns = [[this.logInVue]];

    console.log(this.data);
  }

  toggleDashBoard() {
    this.data.dashBoard = !this.data.dashBoard;

    if (this.data.dashBoard) {

    } else {

    }

  }




}
/* Copyright AEO all rights reserved */
