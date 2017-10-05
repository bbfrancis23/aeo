import { Component, Output, EventEmitter } from '@angular/core';
import { DashBoardTileComponent} from '../dash-board/dash-board-tile.component';
import { Jem } from './jem';
import { DataService} from '../data.service'

'use strict';

// some comments

@Component({
  selector: 'jem-add-tile',
  templateUrl: './jem-form.component.html'
})
export class JemAddTileComponent extends DashBoardTileComponent{
  function = "Add";
  submitted = false
  model: Jem = new Jem();
  @Output() jemAddedEvent = new EventEmitter<Jem>();


  constructor(private dataService: DataService){super();
    this.model.tech = 'Git';
    this.model.type = 'Best Practices'
  }

  onSubmit():void{
    this.dataService.create(this.model,'jems','jem').then((jem)=>{ this.jemAddedEvent.emit(jem) });
    this.submitted = true;
  }
}
