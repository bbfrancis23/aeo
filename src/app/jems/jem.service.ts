import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from "@angular/router";
import { JEM_CONFIG } from './jem-config';
import { MilieuService } from '../milieu/data';

@Injectable()
export class JemService extends MilieuService {

  constructor(public readonly http: Http, public readonly location: Location, public router: Router) {
    super(http, location);
    this.config = JEM_CONFIG;
    this.init();


    this.router.events
      .subscribe((event) => {

        this.favoritesMode = false;
        // example: NavigationStart, RoutesRecognized, NavigationEnd
        //console.log(event);
      });
  }
}
