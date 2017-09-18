import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { LeftPaneComponent} from '../dashboard/left-pane.component';
import { TipsListAreaComponent } from './tips-list-area.component';
import { TipsDetailAreaComponent} from './tips-detail-area.componet';

@Component({
  selector: 'tips-left-pane',
  templateUrl: './templates/tips-left-pane.component.html',
  //styleUrls: ['./dash-board-area.component.css']
})
export class TipsLeftPaneComponent extends LeftPaneComponent implements AfterViewInit{

  @ViewChild(TipsListAreaComponent) listArea;
  @ViewChild(TipsDetailAreaComponent) detailArea;

  ngAfterViewInit() {
    this.areas = [ this.listArea, this.detailArea];
  }

}
