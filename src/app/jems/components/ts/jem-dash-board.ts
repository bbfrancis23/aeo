import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DashBoardComponent} from '../../../dash-board/components/ts/dash-board';
import { Jem } from '../../../jem';
import { JemService} from '../../../jem.service';
import { JemIntroTileComponent} from './jem-intro-tile';
import { JemListTileComponent} from './jem-list-tile';

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
export class JemDashBoardComponent implements AfterViewInit{

  jems: Jem[];
  @ViewChild(JemIntroTileComponent) introTile;
  @ViewChild(JemListTileComponent) listTile;

  constructor(private jemService: JemService){
    this.jemService.getJems().then((jems) => {this.jems = jems; console.log(jems[0].title)});

    //this.jemService.getJems().subscribe(res => this.users =res);
  }


  ngAfterViewInit() {
  }
}
