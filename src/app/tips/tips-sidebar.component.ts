import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SidebarComponent} from '../dashboard/sidebar.component';
import { TipsIntroAreaComponent } from './tips-intro-area.component';
import { TipsFilterAreaComponent} from './tips-filter-area.component';

@Component({
  selector: 'tips-sidebar',
  templateUrl: './templates/tips-sidebar.component.html',
  //styleUrls: ['./dash-board-area.component.css']
})
export class TipsSidebarComponent extends SidebarComponent implements AfterViewInit{

  @ViewChild(TipsIntroAreaComponent) introArea;
  @ViewChild(TipsFilterAreaComponent) filterArea;

  ngAfterViewInit() {
    this.areas = [ this.filterArea, this.introArea];
  }

}
