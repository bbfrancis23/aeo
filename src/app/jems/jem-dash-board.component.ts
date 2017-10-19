import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DashBoardComponent } from '../dash-board/dash-board.component';
import { FilterTileComponent } from '../dash-board/filter-tile.component';
import { IntroTileComponent } from '../dash-board/intro-tile.component';
import { JemAddTileComponent } from './jem-add-tile.component';
import { JemCollectionTileComponent } from './jem-collection-tile.component';
import { JemListTileComponent } from './jem-list-tile.component';
import { JemUpdateTileComponent } from './jem-update-tile.component';
import { Utilities } from '../utilities';

import { Jem } from './jem';
import { JEM_CONFIG } from './jem-config';
import { DashBoardService } from '../dash-board/dash-board.service';

'use strict';

@Component({
  selector: 'jem-dash-board',
  templateUrl: './jem-dash-board.component.html'
})
export class JemDashBoardComponent extends DashBoardComponent implements OnInit {

  jems: Jem[];
  selectedJem: Jem;

  @ViewChild(JemListTileComponent) listTile;
  @ViewChild(JemAddTileComponent) addTile;
  @ViewChild(JemUpdateTileComponent) updateTile;
  @ViewChild(JemCollectionTileComponent) collectionTile;
  @ViewChild(IntroTileComponent) introTile;
  @ViewChild(FilterTileComponent) filterTile;

  constructor(protected route: ActivatedRoute, protected utils: Utilities, protected data: DashBoardService) {
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



}
/* Copyright AEO all rights reserved */
