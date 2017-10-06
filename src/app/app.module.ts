import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule}      from '@angular/http';
import { NgbModule }      from '@ng-bootstrap/ng-bootstrap';
import { NgModule }       from '@angular/core';
import { RouterModule}    from '@angular/router';

import { AeoHeaderComponent }               from './aeo-header.component';
import { AppComponent }                     from './app.component';
import { FilterTileComponent }              from './dash-board/filter-tile.component';
import { IntroTileComponent }               from './dash-board/intro-tile.component';
import { ItemControlsComponent }            from './dash-board/item-controls.component';
import { JemAddTileComponent }              from './jems/jem-add-tile.component';
import { JemDashBoardComponent }            from './jems/jem-dash-board.component';
import { JemListTileComponent }             from './jems/jem-list-tile.component';
import { JemUpdateTileComponent }           from './jems/jem-update-tile.component';
import { JemCollectionTileComponent }       from './jems/jem-collection-tile.component';
import { SizedItemsTileControlsComponent }  from './dash-board/sized-items-tile-controls.component';
import { TileControlsComponent }            from './dash-board/tile-controls.component';

import { CollectionService }  from './collection.service';
import { DataService }        from './data.service';
import { JemService }         from './jems/jem.service';

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
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'code-jems',
        component: JemDashBoardComponent
      },
      {
        path: 'code-jems/tech/:tech',
        component: JemDashBoardComponent
      },
      {
        path: 'code-jems/type/:type',
        component: JemDashBoardComponent
      },
      {
        path: 'code-jems/tech/:tech/type/:type',
        component: JemDashBoardComponent
      }
    ]),
  ],
  providers: [
     CollectionService, DataService, JemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
