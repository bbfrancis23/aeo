import { Location } from '@angular/common';
import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from "@angular/router";
import { JEM_CONFIG } from './jem-config';
import { MilieuService } from '../milieu/milieu.service';

@Injectable()
export class JemService extends MilieuService{

  constructor(public route: ActivatedRoute, protected readonly http: Http,  public readonly location: Location) {
    super(route,http,location);
    this.config = JEM_CONFIG;
    this.init();
  }
}
