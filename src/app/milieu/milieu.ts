import { ActivatedRoute } from "@angular/router";
import { MilieuService } from './milieu.service';

'use strict';

export abstract class Milieu {

  columns: any[];

  constructor(protected readonly route: ActivatedRoute, public milieuService: MilieuService) { }



  routeConfig(milieuService) {

    this.route.params.subscribe(params => {
      milieuService.config.fields.forEach(field => {
        if (params[field.name]) {

          field.values.forEach(data=>{
            data.filtered = false;
          })

          let param = this.milieuService.unUrlify(params[field.name]);
          field.values[field.values.findIndex(value => value.name.toLowerCase() === param)].filtered = true;
        }
        milieuService.filter();
        //console.log(field);
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
            let param = this.milieuService.unUrlify(value);
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
