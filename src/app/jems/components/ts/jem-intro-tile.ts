import { Component } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';

@Component({
  selector: 'jem-intro-tile',
  templateUrl: '../html/jem-intro-tile.html',
  styles: [`.topright {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 18px;
}`]
})
export class JemIntroTileComponent extends DashBoardTileComponent{

}
