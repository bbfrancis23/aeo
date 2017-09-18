import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IntroAreaComponent } from './intro-area.component';
import { ListAreaComponent } from './list-area.component';
import { DetailAreaComponent } from './detail-area.component';
import { SidebarComponent} from './sidebar.component';
import { LeftPaneComponent} from './left-pane.component';
import { RightPaneComponent} from './right-pane.component';
import {DataService} from '../data.service';


@Component({
  selector: 'dashboard',
  templateUrl: './templates/dashboard.component.html',
  styleUrls: ['./styles/dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild(SidebarComponent) sidebar;
  @ViewChild(LeftPaneComponent) leftPane;
  @ViewChild(RightPaneComponent) rightPane;

  constructor() {

  }

  ngAfterViewInit() {
  }

}
