import { Component } from '@angular/core';
import { DashBoardComponent} from '../../../dash-board/components/ts/dash-board';

@Component({
  selector: 'jem-dash-board',
  templateUrl: '../html/jem-dash-board.html',
  styles: [`.dashboard-controls{
            padding-top: 5px;
            padding-bottom: 5px;
          }

          h1{
            font-size: 1.5em;
          }`]
})
export class JemDashBoardComponent {
  
}
