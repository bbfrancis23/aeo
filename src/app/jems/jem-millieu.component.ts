import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MillieuComponent } from '../millieu/millieu.component';
import { FilterVueComponent } from '../millieu/filter-vue.component';
import { IntroVueComponent } from '../millieu/intro-vue.component';
import { JemAddVueComponent } from './jem-add-vue.component';
import { JemCollectionVueComponent } from './jem-collection-vue.component';
import { JemListVueComponent } from './jem-list-vue.component';
import { JemUpdateVueComponent } from './jem-update-vue.component';
import { Utilities } from '../utilities';

import { Jem } from './jem';
import { JEM_CONFIG } from './jem-config';
import { MillieuService } from '../millieu/millieu.service';

'use strict';

@Component({
  selector: 'jem-vue',
  templateUrl: './jem-millieu.component.html'
})
export class JemMillieuComponent extends MillieuComponent implements OnInit {

  jems: Jem[];
  selectedJem: Jem;

  @ViewChild(JemListVueComponent) listVue;
  @ViewChild(JemAddVueComponent) addVue;
  @ViewChild(JemUpdateVueComponent) updateVue;
  @ViewChild(JemCollectionVueComponent) collectionVue;
  @ViewChild(IntroVueComponent) introVue;
  @ViewChild(FilterVueComponent) filterVue;



  constructor(protected route: ActivatedRoute, protected utils: Utilities, protected data: MillieuService) {
    super(route, utils, data);
    data.config = JEM_CONFIG;
    this.initConfig();
  }

  ngOnInit() {
    if (!this.data.dashBoard) {
      this.addVue.show = false;
      this.updateVue.show = false;
      this.collectionVue.show = false;
    }

    this.columns = [
      [this.introVue, this.filterVue],
      [this.listVue],
      [this.addVue, this.updateVue, this.collectionVue]];
  }

  toggleDashBoard() {
    this.data.dashBoard = !this.data.dashBoard;

    if (this.data.dashBoard) {
      this.updateVue.show = true;
      this.addVue.show = true;
      this.collectionVue.show = true;
    } else {
      this.updateVue.show = false;
      this.addVue.show = false;
      this.collectionVue.show = false;
    }

  }

  toggleFilterVue(): void {
    if (this.filterVue.show === true) {
      this.filterVue.show = false
    } else {
      this.filterVue.show = true;
      this.listVue.show = true;
    }
  }

  toggleListVue(): void {

    if (this.listVue.show) {
      this.filterVue.show = false;
      this.listVue.show = false;
    } else {
      this.listVue.show = true;
    }
  }


}
/* Copyright AEO all rights reserved */
