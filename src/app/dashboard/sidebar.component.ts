import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AreaContainerComponent} from './area-container.component';
import { IntroAreaComponent } from './intro-area.component';
import {FilterAreaComponent} from './filter-area.component';

@Component({
  selector: 'sidebar',
  templateUrl: './templates/sidebar.component.html',
  //styleUrls: ['./dash-board-area.component.css']
})
export class SidebarComponent extends AreaContainerComponent implements AfterViewInit{

  @ViewChild(IntroAreaComponent) introArea;
  @ViewChild(FilterAreaComponent) filterArea;

  ngAfterViewInit() {
    this.areas = [ this.filterArea, this.introArea];
  }

}
