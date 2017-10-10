import { Component, ViewChild, AfterContentInit, OnInit } from '@angular/core';
import { DashBoardComponent } from '../dash-board/dash-board.component';
import { Jem } from './jem';
//import { JemService } from './jem.service';
import { JemListTileComponent } from './jem-list-tile.component';
import { JemAddTileComponent } from './jem-add-tile.component';
import { JemUpdateTileComponent } from './jem-update-tile.component';
import { JemCollectionTileComponent } from './jem-collection-tile.component';
import { Field } from '../dash-board/field';
import { ActivatedRoute } from "@angular/router";
import { Utilities } from '../utilities';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { JEM_CONFIG } from './jem-config';
import { DashBoardService } from '../dash-board/dash-board.service';

import { IntroTileComponent } from '../dash-board/intro-tile.component';
import { FilterTileComponent } from '../dash-board/filter-tile.component';

'use strict';

@Component({
  selector: 'jem-dash-board',
  templateUrl: './jem-dash-board.component.html'
})
export class JemDashBoardComponent extends DashBoardComponent implements AfterContentInit, OnInit {



  jems: any[];
  selectedJem: Jem;
  @ViewChild(JemListTileComponent) listTile;
  @ViewChild(JemAddTileComponent) addTile;
  @ViewChild(JemUpdateTileComponent) updateTile;
  @ViewChild(JemCollectionTileComponent) collectionTile;
  @ViewChild(IntroTileComponent) introTile;
  @ViewChild(FilterTileComponent) filterTile;

  message: string = "";


  constructor(private r: ActivatedRoute, private u: Utilities, private dataService: DataService, protected data: DashBoardService) {
    super(r, u, data);
    data.config = JEM_CONFIG;
    this.initConfig();
  }

  ngOnInit(): void {
    //this.getJems();

    //this.jemService.init();
    //this.jemService.currentItems.subscribe(items => {
    //  this.jems = items;
    //  this.selectedJem = this.jems[0];
    //this.filterTile.items = this.jems;
    //  this.filterTile.itemsFiltered = this.jems;
    //this.updateTile.model = this.selectedJem;
    //  this.filterTile.filter();
    //});



  }

  /*
    getJems(){
      this.jemService.getJems().then((jems) => {
        this.jems = jems;
        this.selectedJem = this.jems[0];
        this.filterTile.items = jems;
        this.filterTile.itemsFiltered = jems;
        this.updateTile.model = this.selectedJem;
        this.filterTile.filter();

      });
    }
  // */

  selectJem(id: string): void {



    let i = 0;
    if (id) {
      i = this.jems.findIndex(jem => jem._id === id);

    }



    this.selectedJem = this.jems[i];
    this.updateTile.model = this.selectedJem;
    this.addTile.show = false;
    this.updateTile.show = true;
  }

  // todo put this in a typescript class


  ngAfterContentInit() {


  }


  /*
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
  //*/
  addNewJem($event): void {
    if ($event) {
      //this.getJems();
    }
  }


}
