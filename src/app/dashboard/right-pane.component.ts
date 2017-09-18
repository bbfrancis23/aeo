import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AreaContainerComponent} from './area-container.component';
import { DetailAreaComponent } from './detail-area.component';

@Component({
  selector: 'right-pane',
  templateUrl: './templates/right-pane.component.html',
  //styleUrls: ['./dash-board-area.component.css']
})
export class RightPaneComponent extends AreaContainerComponent implements AfterViewInit{

  @ViewChild(DetailAreaComponent) detailArea;

  ngAfterViewInit() {
    this.areas = [ this.detailArea];
  }

}
