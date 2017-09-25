import { Component } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';

@Component({
  selector: 'jem-intro-tile',
  templateUrl: '../html/jem-intro-tile.html',
  styles: [`

`]
})
export class JemIntroTileComponent extends DashBoardTileComponent{
  title: string = 'Code Jems Intro Tile'
}
