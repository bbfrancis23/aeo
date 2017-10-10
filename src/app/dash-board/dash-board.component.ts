import { ActivatedRoute } from "@angular/router";
import { DashBoardService } from '../dash-board/dash-board.service';
import { Component } from '@angular/core';
import { Field } from './field';
import { Utilities } from '../utilities';

'use strict';

export class DashBoardComponent {
  constructor(protected route: ActivatedRoute, protected utils: Utilities, protected data: DashBoardService) { }

  initConfig() {
    this.data.init();
    this.configRouteFilters();
  }

  configRouteFilters() {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.data.config.fields.forEach(field => {
        if (params[field.name]) {
          let param = this.utils.unUrlify(params[field.name]);
          field.values[field.values.findIndex(value => value.name.toLowerCase() === param)].filtered = true;
        }
      });
    });

    this.route.queryParams.subscribe((params) => {
      this.data.config.fields.forEach(field => {
        if (params[field.name]) {
          let values = params[field.name].split(',');
          values.forEach((value) => {
            let param = this.utils.unUrlify(value);
            field.values[field.values.findIndex(value => value.name.toLowerCase() === param)].filtered = true;
          });
        }
      });
    });
  }

}

/* Copyright AEO all rights reserved */
