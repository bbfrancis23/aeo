import { Component, ViewChild   } from '@angular/core';
import { TipsSidebarComponent   } from './tips-sidebar.component';
import { TipsLeftPaneComponent  } from './tips-left-pane.component';
import { TipsRightPaneComponent } from './tips-right-pane.component';
import { Collection } from '../collection';
import { CollectionService} from '../collection.service';
import {DataService} from '../data.service';


@Component({
  selector: 'tips-dashboard',
  templateUrl: './templates/tips-dashboard.component.html',
  styleUrls: ['../dashboard/styles/dashboard.component.css']
})
export class TipsDashboardComponent{

  private collection: Collection;

  @ViewChild(TipsSidebarComponent) sidebar;
  @ViewChild(TipsLeftPaneComponent) leftPane;
  @ViewChild(TipsRightPaneComponent) rightPane;



  constructor(private collectionService: CollectionService){
    this.collectionService.getCollectionByName('tips').then((collection) => {this.collection = collection; });

    //this._dataService.getUsers().subscribe(res => this.users =res);
  }

  ngAfterViewInit() {
  }

}
