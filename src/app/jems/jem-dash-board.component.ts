import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MillieuComponent } from '../millieu/millieu.component';
import { FilterVueComponent } from '../millieu/filter-vue.component';
import { IntroVueComponent } from '../millieu/intro-vue.component';
import { JemAddTileComponent } from './jem-add-tile.component';
import { JemCollectionTileComponent } from './jem-collection-tile.component';
import { JemListTileComponent } from './jem-list-tile.component';
import { JemUpdateTileComponent } from './jem-update-tile.component';
import { Utilities } from '../utilities';

import { Jem } from './jem';
import { JEM_CONFIG } from './jem-config';
import { MillieuService } from '../millieu/millieu.service';

'use strict';

@Component({
  selector: 'jem-dash-board',
  templateUrl: './jem-dash-board.component.html'
})
export class JemDashBoardComponent extends MillieuComponent implements OnInit {

  jems: Jem[];
  selectedJem: Jem;

  @ViewChild(JemListTileComponent) listTile;
  @ViewChild(JemAddTileComponent) addTile;
  @ViewChild(JemUpdateTileComponent) updateTile;
  @ViewChild(JemCollectionTileComponent) collectionTile;
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
