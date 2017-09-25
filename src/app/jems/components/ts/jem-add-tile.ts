import { Component, Output, EventEmitter } from '@angular/core';
import { DashBoardTileComponent} from '../../../dash-board/components/ts/dash-board-tile';
import { Jem } from '../../../jem';
import { JemService} from '../../../jem.service';

@Component({
  selector: 'jem-add-tile',
  templateUrl: '../html/jem-form.html',
  styles: [`.topright {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 18px;}

    .ng-valid[required], .ng-valid.required  {
    border: 2px solid #42A948; /* green */
    }

    .ng-invalid:not(form)  {
      border: 2px solid #a94442; /* red */
      //is-invalid
    }

    .ng-untouched:not(form)  {
      border: 1px solid gray; /* red */
      //is-invalid
    }

    `]
})
export class JemAddTileComponent extends DashBoardTileComponent{
  function = "Add";

  submitted = false
  onSubmit():void{

    this.jemService.createJem(this.model).then((jem)=>{ this.jemAddedEvent.emit(jem) });

    this.submitted = true;

    //console.log(this.model);
  }
  get diagnostic() {return JSON.stringify(this.model);}

  model: Jem = new Jem();

  @Output() jemAddedEvent = new EventEmitter<Jem>();

  constructor(private jemService: JemService){super();
    this.model.tech = 'Git';
    this.model.type = 'Best Practices'
  }

  hideTile(){
    this.show = false;
  }
}
