import { Injectable, OnInit} from '@angular/core';
import { MilieuService } from '../milieu/milieu.service';
import { Headers, Http } from '@angular/http';
import { Location } from '@angular/common';

import { ActivatedRoute } from "@angular/router";

import { JEM_CONFIG } from './jem-config';

@Injectable()
export class JemService extends MilieuService implements OnInit{

  //data: MilieuService;

  constructor(public route: ActivatedRoute, protected readonly http: Http,  public readonly location: Location) {
    super(route,http,location);
    this.config = JEM_CONFIG;
    this.init();

    console.log('constructor called');
  }


  ngOnInit(){
  }
}
