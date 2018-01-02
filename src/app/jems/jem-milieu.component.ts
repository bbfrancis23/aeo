import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Milieu } from '../milieu/milieu';
import { MilieuService } from '../milieu/milieu.service';
import { FilterVueComponent } from '../milieu/filter-vue.component';
import { IntroVueComponent } from '../milieu/intro-vue.component';


import { JEM_CONFIG } from './jem-config';
import { Jem } from './jem';
import { JemAddVueComponent } from './jem-add-vue.component';
import { JemCollectionVueComponent } from './jem-collection-vue.component';
import { JemListVueComponent } from './jem-list-vue.component';
import { JemService } from './jem.service';
import { JemUpdateVueComponent } from './jem-update-vue.component';


'use strict';

@Component({
  selector: 'jem-milieu',
  templateUrl: './jem-milieu.component.html',
  styles: [`

    .container-classic{
      margin-right: auto;
      margin-left: auto;
      padding-right: 15px;
      padding-left: 15px;
      width: 100%;
      max-width: 1400px;
    }
    `],
  providers: [MilieuService]
})
export class JemMilieuComponent extends Milieu implements OnInit {

  jems: Jem[];
  selectedJem: Jem;

  state = 'active';

  toggle() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  @ViewChild(JemListVueComponent) listVue;
  @ViewChild(JemAddVueComponent) addVue;
  @ViewChild(JemUpdateVueComponent) updateVue;
  //@ViewChild(JemCollectionVueComponent) collectionVue;
  @ViewChild(IntroVueComponent) introVue;
  @ViewChild(FilterVueComponent) filterVue;



  constructor(protected route: ActivatedRoute, protected jemService: JemService) {
    super(route, jemService);
    this.routeConfig(jemService);


    console.log('jem milieu constructor called');
    jemService.refresh();
  }


  ngOnInit() {

    //this.jemService.filter();


    if (!this.jemService.dashBoard) {
      this.addVue.show = false;
      this.updateVue.show = false;
      //this.collectionVue.show = false;
    }



    this.columns = [
      [this.introVue, this.filterVue],
      [this.listVue],
      [this.addVue, this.updateVue]];
      //[this.addVue, this.updateVue, this.collectionVue]];
  }

  toggleDashBoard() {

    this.jemService.dashBoard = !this.jemService.dashBoard;

    if (this.jemService.dashBoard) {
      this.updateVue.show = true;
      this.addVue.show = true;
      //this.collectionVue.show = true;
    } else {
      this.updateVue.show = false;
      this.addVue.show = false;
      //this.collectionVue.show = false;
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
