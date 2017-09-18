import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'dash-board-area',
  templateUrl: './templates/dash-board-area.component.html',
  styleUrls: ['./styles/dash-board-area.component.css']
})
export class DashBoardAreaComponent implements OnInit{
  //showArea = true;
  //@Input('showArea') showArea: boolean;
  showArea = true;

  @Output() showAreaChange = new EventEmitter();

  constructor() {
    //this.showArea = false;
  }

  ngOnInit(): void{
    //console.log(this.showArea);
    //this.showArea = false;

  }


  toggleShowArea(): void{
    this.showArea = this.showArea ? false : true;
    this.showAreaChange.emit();
  }

}
