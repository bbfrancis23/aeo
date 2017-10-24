import { ActivatedRoute } from "@angular/router";
import { MilieuService } from './milieu.service';
import { Field } from './field';
import { Utilities } from '../utilities';

'use strict';

export class MilieuComponent {

  columns: any[];

  constructor(protected readonly route: ActivatedRoute, protected readonly utils: Utilities, protected readonly data: MilieuService) { }

  initConfig() {
    this.data.init();
    this.routeConfig();
  }

  routeConfig() {

    this.route.params.subscribe(params => {
      this.data.config.fields.forEach(field => {
        if (params[field.name]) {
          let param = this.utils.unUrlify(params[field.name]);
          field.values[field.values.findIndex(value => value.name.toLowerCase() === param)].filtered = true;
        }
      });
    });

    this.route.queryParams.subscribe(params => {

      if (params['dash-board']) {
        this.data.dashBoard = true;
      }

      this.data.config.fields.forEach(field => {
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
