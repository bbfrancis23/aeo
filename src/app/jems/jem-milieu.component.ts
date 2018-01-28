import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Milieu, FilterVueComponent, IntroVueComponent } from '../milieu/core';
import { MilieuModalComponent} from '../milieu/modals';
import { MilieuService } from '../milieu/data';

import { JemListVueComponent } from './core';
import { JemService } from './jem.service';
import { ManageJemComponent } from './core';

'use strict';

@Component({
  selector: 'jem-milieu',
  template: `




    <div (click)="clickCheck($event)">
      <div class="sticky-top container-fluid">
        <div class="row" >
          <div class="col-6 headline" ><h1>{{jemService.pageTitle}}</h1></div>
          <div class="col-6" >



            <div class="ml-2 float-right d-none d-md-block d-lg-block" *ngIf="jemService.authenticated === true">
              <button class="btn btn-outline-secondary material-icons" title="Dash Board" [ngClass]="{'active': jemService.dashBoard}"  (click)="toggleDashBoard()">dashboard</button>
            </div>
            <div class="btn-group float-right d-none d-md-block d-lg-block" *ngIf="jemService.dashBoard" >
              <button class="btn material-icons" (click)="introVue.show = !introVue.show" [ngClass]="{'active': introVue.show}"  title="Jem Info View">info_outline</button>
              <button class="btn material-icons" (click)="toggleFilterVue();" [ngClass]="{'active':filterVue.show}"  title="Jem Filter View" >filter_list</button>
              <button class="btn material-icons" (click)="toggleListVue();" [ngClass]="{'active': listVue.show}"  title="Jem List View">list</button>
              <button class="btn material-icons" (click)="addVue.show = !addVue.show" [ngClass]="{'active': addVue.show}"  title="Add Jem View">add</button>
              <button class="btn material-icons" (click)="updateVue.show = !updateVue.show" [ngClass]="{'active': updateVue.show}"  title="Edit Jem View">create</button>
            </div>
          </div>
        </div>
      </div>


      <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar" ngClass="{}">

          <div class="sidebar-sticky">


              <sidebar-intro-vue [milieuService]="jemService"></sidebar-intro-vue>
              <filter-vue  class="jem-filter-vue" [milieuService]="jemService"></filter-vue>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">


        <div class="row">
          <div  [ngClass]=" isColumnVisible(2) ? 'col-lg-6' : 'col-lg-12'">
            <jem-list-vue  (selectItemEvent)="selectJem($event)" [jemService]="jemService"></jem-list-vue>
          </div>
          <div  [ngClass]=" isColumnVisible(1) ? 'col-lg-6' : 'col-lg-12'">
            <manage-jem [jemService]="jemService" [manageType]="'Add'"  #manageAdd></manage-jem>
            <manage-jem [jemService]="jemService" [manageType]="'Update'" #manageUpdate></manage-jem>
          </div>
        </div>



        </main>
      </div>
    </div>
</div>

      <!-- <div class="milieu-content container-fluid">
        <div class="row">
          <div [ngClass]=" (isColumnVisible(0) && isColumnVisible(1) && isColumnVisible(2)) ? 'col-lg-2' : 'col-lg-3' " style="position: sticky; overflow-y: scroll">
            <intro-vue id="jem-intro-vue" [milieuService]="jemService"></intro-vue>
            <filter-vue  class="jem-filter-vue" [milieuService]="jemService"></filter-vue>
          </div>
          <div [ngClass]="isColumnVisible(0) ? (   (isColumnVisible(0) && isColumnVisible(1) && isColumnVisible(2)) ? 'col-lg-10' : 'col-lg-9' ) : 'col-lg-12'">
            <div class="row">
              <div  [ngClass]=" isColumnVisible(2) ? 'col-lg-6' : 'col-lg-12'">
                <jem-list-vue  (selectItemEvent)="selectJem($event)" [jemService]="jemService"></jem-list-vue>
              </div>
              <div  [ngClass]=" isColumnVisible(1) ? 'col-lg-6' : 'col-lg-12'">
                <manage-jem [jemService]="jemService" [manageType]="'Add'"  #manageAdd></manage-jem>
                <manage-jem [jemService]="jemService" [manageType]="'Update'" #manageUpdate></manage-jem>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    <milieu-modal id="filter-modal"><filter-vue  class="jem-filter-vue" [milieuService]="jemService"></filter-vue></milieu-modal>`,

  styles: [`

    /*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 122px;
  bottom: 0;
  left: 0;
  z-index: 6; /* Behind the navbar */
  padding: 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 48px; /* Height of navbar */
  height: calc(100vh - 122px);
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}




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

  @ViewChild(JemListVueComponent) listVue;
  @ViewChild('manageAdd') addVue: ManageJemComponent;
  @ViewChild('manageUpdate') updateVue: ManageJemComponent;
  @ViewChild(IntroVueComponent) introVue;
  @ViewChild(FilterVueComponent) filterVue;

  @ViewChild(MilieuModalComponent) accountServices: MilieuModalComponent;

  constructor(protected route: ActivatedRoute, protected jemService: JemService) {
    super(route, jemService);
    jemService.routeConfig(route);
  }






  ngOnInit() {
    if (!this.jemService.dashBoard) {
      this.addVue.show = false;
      this.updateVue.show = false;
    }
    this.columns = [ [this.introVue, this.filterVue], [this.listVue], [this.addVue,this.updateVue]];
  }


  toggleDashBoard() {

    this.jemService.dashBoard = !this.jemService.dashBoard;

    if (this.jemService.dashBoard) {
      this.addVue.show = true;
    } else {
      this.updateVue.show = false;
      this.addVue.show = false;
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

  clickCheck(e){
    if(e.target.className.search('update') > -1){
      this.updateVue.show = true;
      this.updateVue.modalChild.modalMode = true;
    }
  }

  // */
}
/* Copyright AEO all rights reserved */
