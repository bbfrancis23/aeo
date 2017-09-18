import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RightPaneComponent} from '../dashboard/right-pane.component';
import { TipsCollectionAreaComponent} from './tips-collection-area.component';

@Component({
  selector: 'tips-right-pane',
  templateUrl: './templates/tips-right-pane.component.html',
  //styleUrls: ['./dash-board-area.component.css']
})
export class TipsRightPaneComponent extends RightPaneComponent implements AfterViewInit{

  @ViewChild(TipsCollectionAreaComponent) collectionArea;

  ngAfterViewInit() {
    this.areas = [ this.collectionArea];
  }

}
