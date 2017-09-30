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
import { JemService } from './jems/jem.service';

import { JemDashBoardComponent } from './jems/components/ts/jem-dash-board';
import { IntroTileComponent } from './dash-board/components/ts/intro-tile';
import { JemListTileComponent } from './jems/components/ts/jem-list-tile';
import { FilterTileComponent } from './dash-board/components/ts/filter-tile';
import { JemAddTileComponent } from './jems/components/ts/jem-add-tile';
import { JemUpdateTileComponent } from './jems/components/ts/jem-update-tile';
import { JemCollectionTileComponent} from './jems/components/ts/jem-collection-tile';
import { TileControlsComponent } from './dash-board/components/ts/tile-controls';
import { SizedItemsTileControlsComponent } from './dash-board/components/ts/sized-items-tile-controls';
import { ItemControlsComponent } from './dash-board/components/ts/item-controls';



@NgModule({
  declarations: [
    AppComponent,
    AeoHeaderComponent,
    JemDashBoardComponent,
    IntroTileComponent,
    JemListTileComponent,
    FilterTileComponent,
    JemAddTileComponent,
    JemUpdateTileComponent,
    JemCollectionTileComponent,
    TileControlsComponent,
    SizedItemsTileControlsComponent,
    ItemControlsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    FormsModule,
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'code-jems',
        component: JemDashBoardComponent
      }

    ]),
    HttpModule,
  ],
  providers: [
    DataService, CollectionService, JemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
