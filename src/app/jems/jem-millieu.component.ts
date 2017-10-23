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

  @ViewChild(JemListVueComponent) listTile;
  @ViewChild(JemAddVueComponent) addTile;
  @ViewChild(JemUpdateVueComponent) updateTile;
  @ViewChild(JemCollectionVueComponent) collectionTile;
  @ViewChild(IntroVueComponent) introTile;
  @ViewChild(FilterVueComponent) filterTile;

  constructor(protected route: ActivatedRoute, protected utils: Utilities, protected data: MillieuService) {
    super(route, utils, data);
    data.config = JEM_CONFIG;
    this.initConfig();
  }

  ngOnInit() {
    if (!this.data.dashBoard) {
      this.addTile.show = false;
      this.updateTile.show = false;
      this.collectionTile.show = false;
    }
  }

  toggleDashBoard() {
    this.data.dashBoard = !this.data.dashBoard;

    if (this.data.dashBoard) {
      this.updateTile.show = true;
      this.addTile.show = true;
      this.collectionTile.show = true;
    } else {
      this.updateTile.show = false;
      this.addTile.show = false;
      this.collectionTile.show = false;
    }

  }

  toggleFilterTile(): void {
    if (this.filterTile.show === true) {
      this.filterTile.show = false
    } else {
      this.filterTile.show = true;
      this.listTile.show = true;
    }
  }

  toggleListTile(): void {

    if (this.listTile.show) {
      this.filterTile.show = false;
      this.listTile.show = false;
    } else {
      this.listTile.show = true;
    }
  }

  isFirstColShown() {
    return (this.introTile.show || this.filterTile.show) ? true : false;
  }

  isSecondColShown() {
    return (this.listTile) ? true : false;
  }
}
/* Copyright AEO all rights reserved */
