import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {AeoHeaderComponent} from './aeo-header.component';

import {DashboardComponent} from './dashboard/dashboard.component';

import {DashBoardAreaComponent} from './dashboard/dash-board-area.component';

import {AreaContainerComponent} from './dashboard/area-container.component';

import {SidebarComponent} from './dashboard/sidebar.component';
import {LeftPaneComponent} from './dashboard/left-pane.component';
import {RightPaneComponent} from './dashboard/right-pane.component';

import {IntroAreaComponent}  from './dashboard/intro-area.component';
import {FilterAreaComponent} from './dashboard/filter-area.component';
import {ListAreaComponent} from './dashboard/list-area.component';
import {DetailAreaComponent} from './dashboard/detail-area.component';
import {CollectionAreaComponent} from './dashboard/collection-area.component';


import {TipsDashboardComponent}      from './tips/tips-dashboard.component';

import {TipsSidebarComponent} from './tips/tips-sidebar.component';
import {TipsLeftPaneComponent} from './tips/tips-left-pane.component';
import {TipsRightPaneComponent} from './tips/tips-right-pane.component';

import {TipsIntroAreaComponent}      from './tips/tips-intro-area.component';
import {TipsFilterAreaComponent}     from './tips/tips-filter-area.component';
import {TipsListAreaComponent}       from './tips/tips-list-area.component';
import {TipsDetailAreaComponent}     from './tips/tips-detail-area.componet';
import {TipsCollectionAreaComponent} from './tips/tips-collection-area.component';


import {HttpModule} from '@angular/http';
import {DataService} from './data.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AeoHeaderComponent,
    DashboardComponent,
    DashBoardAreaComponent, SidebarComponent, LeftPaneComponent, RightPaneComponent,
    IntroAreaComponent, FilterAreaComponent, ListAreaComponent, DetailAreaComponent, AreaContainerComponent, CollectionAreaComponent,
    TipsDashboardComponent,
    TipsSidebarComponent,TipsLeftPaneComponent,TipsRightPaneComponent,
    TipsIntroAreaComponent, TipsFilterAreaComponent, TipsListAreaComponent, TipsCollectionAreaComponent, TipsDetailAreaComponent

  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
