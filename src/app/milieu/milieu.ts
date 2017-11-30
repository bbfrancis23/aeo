import { ActivatedRoute } from "@angular/router";
import { MilieuService } from './milieu.service';
import { Utilities } from '../utilities';

'use strict';

export abstract class Milieu {

  columns: any[];

  constructor(protected readonly route: ActivatedRoute, protected readonly utils: Utilities, protected readonly data: any) { }

  initConfig() {
    //this.data.init();
    //console.log(this.data)
    //this.routeConfig();
  }

  routeConfig(milieuService) {

    this.route.params.subscribe(params => {
      milieuService.config.fields.forEach(field => {
        if (params[field.name]) {
          let param = this.utils.unUrlify(params[field.name]);
          field.values[field.values.findIndex(value => value.name.toLowerCase() === param)].filtered = true;
        }
      });
    });

    this.route.queryParams.subscribe(params => {

      if (params['dash-board'] ) {
        milieuService.dashBoard = true;
      }

      milieuService.config.fields.forEach(field => {
        if (params[field.name]) {
          let values: string[] = params[field.name].split(',');
          values.forEach(value => {
            let param = this.utils.unUrlify(value);
            field.values[field.values.findIndex(value => value.name.toLowerCase() === param)].filtered = true;
          });
        }
      });
    });

  }

  isColumnVisible(index) {
    let result = this.columns[index].find(vue => vue.show === true);
    return result ? result : false;
  }

}

/* Copyright AEO all rights reserved */
