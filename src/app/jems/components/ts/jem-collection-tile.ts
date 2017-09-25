import { Component, Output, EventEmitter } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';
import { Jem } from '../../../jem';
import { JemService} from '../../../jem.service';

@Component({
  selector: 'jem-collection-tile',
  templateUrl: '../html/jem-collection.html',
  styleUrls: ['../css/jem-collection.css']
})
export class JemCollectionTileComponent extends DashBoardTileComponent{


  hideTile(){
    this.show = false;
  }
}
