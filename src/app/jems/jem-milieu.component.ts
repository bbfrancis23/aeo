import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Milieu } from '../milieu/core';
import { MilieuService } from '../milieu/milieu.service';
import { FilterVueComponent } from '../milieu/core';
import { IntroVueComponent } from '../milieu/core';


import { JEM_CONFIG } from './jem-config';
import { Jem } from './jem';
import { JemCollectionVueComponent } from './jem-collection-vue.component';
import { JemListVueComponent } from './core';
import { JemService } from './jem.service';
import { ManageJemComponent } from './manage';
import { MilieuModalComponent} from '../milieu/modals';

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
  @ViewChild('manageAdd') addVue: ManageJemComponent;
  @ViewChild('manageUpdate') updateVue: ManageJemComponent;
  @ViewChild(IntroVueComponent) introVue;
  @ViewChild(FilterVueComponent) filterVue;


  @ViewChild(MilieuModalComponent) accountServices: MilieuModalComponent;

  constructor(protected route: ActivatedRoute, protected jemService: JemService) {
    super(route, jemService);
    jemService.routeConfig(route);
    jemService.refresh();
  }


  ngOnInit() {

    console.log(this.jemService.tabletMode);

    if (!this.jemService.dashBoard) {
      this.addVue.show = false;
      this.updateVue.show = false;
    }

    //if(this.jemService.tabletMode){
    //  this.columns = [ [this.introVue], [this.listVue], [this.addVue,this.updateVue]];

    //  this.filterVue.show = false;
    //  this.filterVue.modalOnlyMode = true;

    //}else{
      this.columns = [ [this.introVue, this.filterVue], [this.listVue], [this.addVue,this.updateVue]];
    //}


    console.log(this.jemService);

  }

  toggleDashBoard() {

    this.jemService.dashBoard = !this.jemService.dashBoard;

    if (this.jemService.dashBoard) {
      //this.updateVue.show = true;
      this.addVue.show = true;
    } else {
      this.updateVue.show = false;
      this.addVue.show = false;
    }

  }

  toggleFilterVue(): void {

    //if(this.jemService.tabletMode){
    //  this.filterVue.modalChild.modalMode = true;
    //  this.filterVue.show =  true;
    //}else{
      if (this.filterVue.show === true) {
        this.filterVue.show = false
      } else {
        this.filterVue.show = true;
        this.listVue.show = true;
      }
    //}
  }

  toggleListVue(): void {
    if (this.listVue.show) {
      this.filterVue.show = false;
      this.listVue.show = false;
    } else {
      this.listVue.show = true;
    }
  }

  clickCheck(e){
    //console.log(e.target.className);
    if(e.target.className.search('update') > -1){
      this.updateVue.show = true;
      this.updateVue.modalChild.modalMode = true;
    }
  }

}
/* Copyright AEO all rights reserved */
