import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Milieu } from '../milieu/milieu';
import { FilterVueComponent } from '../milieu/filter-vue.component';
import { Utilities } from '../utilities';
import { MilieuService } from '../milieu/milieu.service';
import { Property } from './property';
import { REAL_ESTATE_AGENT_CONFIG} from './real-estate.config';
import { RealEstateAgentService } from './real-estate-agent.service';
import { AgentVueComponent } from './agent-vue.component';


'use strict';

@Component({
  selector: 'real-estate-agent-vue',
  templateUrl: './real-estate-agent-milieu.component.html',
  styles: [`


  `],
  providers: [MilieuService]
})
export class RealEstateAgentMilieuComponent extends Milieu implements OnInit {

  properties: Property[];
  selectedProperty: Property;

  //@ViewChild(JemListVueComponent) listVue;
  //@ViewChild(JemAddVueComponent) addVue;
  //@ViewChild(JemUpdateVueComponent) updateVue;
  @ViewChild(AgentVueComponent) agentVue;
  //@ViewChild(FilterVueComponent) filterVue;



  constructor(protected route: ActivatedRoute, protected utils: Utilities, protected data: MilieuService) {
    super(route, utils, data);
    //data.itemsMode= false;
    data.config = REAL_ESTATE_AGENT_CONFIG;
    this.initConfig();

    console.log(data);
  }

  ngOnInit() {

    if (!this.data.dashBoard) {
      //this.addVue.show = false;
      //this.updateVue.show = false;
      //this.collectionVue.show = false;
    }

    // make jem data aviable through the app
    //this.jem.data = this.data;

    //console.log(this.jem.data);

    this.columns = [
      [this.agentVue],
      [],
      []];
    // */
  }

  toggleDashBoard() {

    this.data.dashBoard = !this.data.dashBoard;

    if (this.data.dashBoard) {
      //this.updateVue.show = true;
      //this.addVue.show = true;
      //this.collectionVue.show = true;
    } else {
      //this.updateVue.show = false;
      //this.addVue.show = false;
      //this.collectionVue.show = false;
    }

  }

  /*
  toggleFilterVue(): void {
    if (this.filterVue.show === true) {
      //this.filterVue.show = false
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
  // */

}
/* Copyright AEO all rights reserved */
