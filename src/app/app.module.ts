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

import {HttpModule} from '@angular/http';
import {DataService} from './data.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AeoHeaderComponent,
    DashboardComponent,
    DashBoardAreaComponent,
    IntroAreaComponent,
    FilterAreaComponent,
    ListAreaComponent,
    DetailAreaComponent,
    AreaContainerComponent,
    SidebarComponent,
    LeftPaneComponent,
    RightPaneComponent

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
