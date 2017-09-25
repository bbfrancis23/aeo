import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tile-controls',
  templateUrl: '../html/tile-controls.html',
  styleUrls: ['../css/tile-controls.css']
})
export class TileControlsComponent {

  @Input() title: string;
  @Output() hideTileEvent = new EventEmitter();

}
