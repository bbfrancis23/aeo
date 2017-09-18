import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AreaContainerComponent} from './area-container.component';
import { ListAreaComponent } from './list-area.component';

@Component({
  selector: 'left-pane',
  templateUrl: './templates/left-pane.component.html',
  //styleUrls: ['./dash-board-area.component.css']
})
export class LeftPaneComponent extends AreaContainerComponent implements AfterViewInit{

  @ViewChild(ListAreaComponent) listArea;

  ngAfterViewInit() {
    this.areas = [ this.listArea];
  }

}
