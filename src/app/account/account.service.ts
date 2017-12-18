import { Injectable} from '@angular/core';
import { MilieuService } from '../milieu/milieu.service';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { Utilities } from '../utilities';

import { ActivatedRoute } from "@angular/router";

import { ACCOUNT_CONFIG } from './account-config';

@Injectable()
export class AccountService extends MilieuService {

  //data: MilieuService;

  constructor(public route: ActivatedRoute, protected readonly http: Http, protected readonly utils: Utilities, public readonly location: Location) {
    super(route,http,utils,location);
    this.config = ACCOUNT_CONFIG;
    this.init();


  }



}
