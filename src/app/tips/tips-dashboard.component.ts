import { Component, ViewChild   } from '@angular/core';
import { TipsSidebarComponent   } from './tips-sidebar.component';
import { TipsLeftPaneComponent  } from './tips-left-pane.component';
import { TipsRightPaneComponent } from './tips-right-pane.component';
import {DataService} from '../data.service';


@Component({
  selector: 'tips-dashboard',
  templateUrl: './templates/tips-dashboard.component.html',
  styleUrls: ['../dashboard/styles/dashboard.component.css']
})
export class TipsDashboardComponent{

  @ViewChild(TipsSidebarComponent) sidebar;
  @ViewChild(TipsLeftPaneComponent) leftPane;
  @ViewChild(TipsRightPaneComponent) rightPane;

  constructor() {

  }

  ngAfterViewInit() {
    console.log(this.rightPane.collectionArea);
    console.log(this.leftPane.detailArea);
  }

}
