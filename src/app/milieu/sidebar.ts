import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { fadeInOutAnimation } from './animations';
import { IntroVueComponent, FilterVueComponent, MilieuVue } from './core';
import { ModalDrawerComponent } from './modals';
import { MilieuService} from './data';

@Component({
  selector: 'milieu-sidebar',
  template: `
  <div [ngClass]="{'sidebar': win.innerWidth >= largeViewPort}"   (click)="sidebarClick($event)" *ngIf="show || !hasModal">
    <div [ngClass]="{'drawer': win.innerWidth < largeViewPort && hasModal }">
      <div [ngClass]="{'modal-vue-content': win.innerWidth < largeViewPort && hasModal}">
        <ng-content></ng-content>
      </div>
    </div>
  </div>`,
})
export class MilieuSideBarComponent extends MilieuVue {

  win = window;
  largeViewPort = this.milieuService.media.lg;
  @Input() hasModal = null;
  show = (window.innerWidth < this.largeViewPort) ? false : true;

  constructor(public milieuService: MilieuService){ super(milieuService);  }

  sidebarClick(e) { if(e.target.className.search(/modal-mode/) > -1  || e.target.className.search(/close-modal/) > -1) this.show = false }
}

@Component({
  selector: 'sidebar-intro-vue',
  template:
    `<modal-vue>
        <div class="card" [@fadeInOut]="'in'" *ngIf="show" >
          <vue-controls (hideVueEvent)="show=false" (modalVueEvent)="modalChild.modalMode=true" *ngIf="showControls" ></vue-controls>
          <img [src]="milieuService.config.img" alt="{{milieuService.config.title}}">
          <div class="card-block">
            <h2>{{milieuService.config.title}}</h2>
            <p>{{milieuService.config.intro}}</p>
          </div>
        </div>
    </modal-vue>`,
  animations: [ fadeInOutAnimation ],
})
export class SideBarIntroVueComponent extends IntroVueComponent {
  showControls = false;
}

@Component({
  selector: 'sidebar-filter-vue',
  template:`
    <modal-vue>
      <div class="card"  [@fadeInOut]="'in'" *ngIf="show" >
        <div class="card-header" (mouseenter)="showCollapseControl=true" (mouseleave)="showCollapseControl=false" >
        Filters
          <collapse-control [dataTarget]="'#filter'" [show]="showCollapseControl"></collapse-control>
        </div>


        <div class="collapse show card-block" id="filter">
          <div class="form-group">
            <label for="title" class="sr-only">Title Search</label>
            <input type="text" class="form-control " id="title" placeholder="Title Search" #searchBox id="title-search-box" (keyup)="search(searchBox.value)">
          </div>
          <div *ngFor="let field of milieuService.config.fields">
            {{milieuService.modalMode}}
            <hr>
            <b><p>{{field.name}}:</p></b>
            <div type="checkbox" *ngFor="let value of field.values" ><input type="checkbox" [(ngModel)]="value.filtered"  (change)="milieuService.filter('title',searchTerm)"> {{value.name}}</div>
            <br>
          </div>
        </div>
      </div>
    </modal-vue>`,
  animations: [ fadeInOutAnimation]
})
export class SidebarFilterVueComponent extends FilterVueComponent {
  showCollapseControl = false;

}
