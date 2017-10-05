import { Component, Output, EventEmitter } from '@angular/core';
import { DashBoardTileComponent} from '../dash-board/dash-board-tile.component';
import { Jem } from './jem';
import { DataService} from '../data.service'

'use strict';

@Component({
  selector: 'jem-update-tile',
  templateUrl: './jem-form.component.html'
})
export class JemUpdateTileComponent extends DashBoardTileComponent{
  function = "Update";
  model: Jem = new Jem();
  submitted = false

  @Output() jemUpdatedEvent = new EventEmitter<Jem>();


  onSubmit():void{
    this.dataService.create(this.model,'jems','jem').then((jem)=>{});
    this.submitted = true;
  }

  constructor(private dataService: DataService){super(); }


}
