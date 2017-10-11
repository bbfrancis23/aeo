import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AeoHeaderComponent } from './aeo-header.component';
import { AppComponent } from './app.component';
import { FilterTileComponent } from './dash-board/filter-tile.component';
import { IntroTileComponent } from './dash-board/intro-tile.component';
import { ItemControlsComponent } from './dash-board/item-controls.component';
import { JemAddTileComponent } from './jems/jem-add-tile.component';
import { JemDashBoardComponent } from './jems/jem-dash-board.component';
import { JemListTileComponent } from './jems/jem-list-tile.component';
import { JemUpdateTileComponent } from './jems/jem-update-tile.component';
import { JemCollectionTileComponent } from './jems/jem-collection-tile.component';
import { SizedItemsTileControlsComponent } from './dash-board/sized-items-tile-controls.component';
import { TileControlsComponent } from './dash-board/tile-controls.component';
import { JemComponent } from './jems/jem.component';
import { JemSmallComponent } from './jems/jem-sm.component';

import { CollectionService } from './collection.service';
import { DashBoardService } from './dash-board/dash-board.service';
import { DataService } from './data.service';
import { Utilities } from './utilities';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    AeoHeaderComponent,
    FilterTileComponent,
    IntroTileComponent,
    ItemControlsComponent,
    JemAddTileComponent,
    JemCollectionTileComponent,
    JemComponent,
    JemDashBoardComponent,
    JemListTileComponent,
    JemSmallComponent,
    JemUpdateTileComponent,
    SizedItemsTileControlsComponent,
    TileControlsComponent
  ],
  providers: [
    CollectionService, DashBoardService, DataService, Utilities
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
