import { Component, Input } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';
import { Jem } from '../../../jem';

@Component({
  selector: 'jem-list-tile',
  templateUrl: '../html/jem-list-tile.html',
  styles: [`.topright {
    position: absolute;
    top: 5px;
    right: 5px;
}`]
})
export class JemListTileComponent extends DashBoardTileComponent{
  @Input() jems: Jem[];

  showBig = true;

  constructor() { super(); console.log(this.jems);}
}
