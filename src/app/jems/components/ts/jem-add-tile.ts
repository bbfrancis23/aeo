import { Component, Output, EventEmitter } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/dash-board-tile.component';
import { Jem } from '../../jem';
import { JemService} from '../../jem.service';

'use strict';

@Component({
  selector: 'jem-add-tile',
  templateUrl: '../html/jem-form.html'
})
export class JemAddTileComponent extends DashBoardTileComponent{
  function = "Add";
  submitted = false
  model: Jem = new Jem();
  @Output() jemAddedEvent = new EventEmitter<Jem>();


  constructor(private jemService: JemService){super();
    this.model.tech = 'Git';
    this.model.type = 'Best Practices'
  }

  onSubmit():void{
    this.jemService.createJem(this.model).then((jem)=>{ this.jemAddedEvent.emit(jem) });
    this.submitted = true;
  }
}
