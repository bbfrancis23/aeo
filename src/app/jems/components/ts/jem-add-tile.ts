import { Component } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';

@Component({
  selector: 'jem-add-tile',
  templateUrl: '../html/jem-form.html',
  styles: [`.topright {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 18px;
}`]
})
export class JemAddTileComponent extends DashBoardTileComponent{

}
