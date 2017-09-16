import { Component } from '@angular/core';
import {DataService} from './data.service';

console.log("Hello Mcfly");

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  showFilterArea = true;
  showListArea = true;
  showDetailArea = false;
  showEditArea = true;


  filterButtonClick(): void{
    this.showFilterArea = this.showFilterArea ? false : true;
    this._checkContentArea();
  }

  listButtonClick(): void{
    this.showListArea = this.showListArea ? false : true;
  }

  detailButtonClick(): void{
    this.showDetailArea = this.showDetailArea ? false : true;
  }

  editButtonClick(): void{
    this.showEditArea = this.showEditArea ? false : true;
  }

  _checkContentArea(): void{
    if(this.showFilterArea){
      //console.log('change content area to 10');
    }else{
      //console.log('change content area to 12');
    }
  }

}
