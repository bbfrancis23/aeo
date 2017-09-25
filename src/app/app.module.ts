import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import {AeoHeaderComponent} from './aeo-header.component';


import {HttpModule} from '@angular/http';
import {DataService} from './data.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { CollectionService } from './collection.service';
import { JemService } from './jem.service';

import { JemDashBoardComponent } from './jems/components/ts/jem-dash-board';
import { JemIntroTileComponent } from './jems/components/ts/jem-intro-tile';
import { JemListTileComponent } from './jems/components/ts/jem-list-tile';
import { JemFilterTileComponent } from './jems/components/ts/jem-filter-tile';
import { JemAddTileComponent} from './jems/components/ts/jem-add-tile';
import { TileControlsComponent} from './dash-board/components/ts/tile-controls';



@NgModule({
  declarations: [
    AppComponent,
    AeoHeaderComponent,
    JemDashBoardComponent,
    JemIntroTileComponent,
    JemListTileComponent,
    JemFilterTileComponent,
    JemAddTileComponent,
    TileControlsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    FormsModule,
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'code-jems',
        component: JemDashBoardComponent
      },{
        path: 'code-jems/:techId',
        component: JemDashBoardComponent
      },{
        path: 'code-jems/:techId/:typeId',
        component: JemDashBoardComponent
      }
    ]),
    HttpModule,
  ],
  providers: [DataService, CollectionService, JemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
