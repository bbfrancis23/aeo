import { Injectable, OnInit} from '@angular/core';
import { MilieuService } from '../milieu/milieu.service';
import { Headers, Http } from '@angular/http';
import { Location } from '@angular/common';
import { Utilities } from '../utilities';

import { ActivatedRoute } from "@angular/router";

import { JEM_CONFIG } from './jem-config';

@Injectable()
export class JemService extends MilieuService implements OnInit{

  //data: MilieuService;

  constructor(protected route: ActivatedRoute, protected readonly http: Http, protected readonly utils: Utilities, protected readonly location: Location) {
    super(route,http,utils,location);
    this.config = JEM_CONFIG;
    this.init();

    console.log(this);
  }


  ngOnInit(){
    //this.init();


    console.log('init called');
  }
}
