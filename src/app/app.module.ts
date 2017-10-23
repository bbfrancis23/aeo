import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AeoHeaderComponent } from './aeo-header.component';
import { AppComponent } from './app.component';
import { FilterVueComponent } from './millieu/filter-vue.component';
import { IntroVueComponent } from './millieu/intro-vue.component';
import { ItemControlsComponent } from './millieu/item-controls.component';
import { JemAddTileComponent } from './jems/jem-add-tile.component';
import { JemDashBoardComponent } from './jems/jem-dash-board.component';
import { JemListTileComponent } from './jems/jem-list-tile.component';
import { JemUpdateTileComponent } from './jems/jem-update-tile.component';
import { JemCollectionTileComponent } from './jems/jem-collection-tile.component';
import { ModalMillieuVueComponent } from './millieu/modal-millieu-vue.component';
import { SizedItemsVueControlsComponent } from './millieu/sized-items-vue-controls.component';
import { VueControlsComponent } from './millieu/vue-controls.component';
import { JemComponent } from './jems/jem.component';
import { JemSmallComponent } from './jems/jem-sm.component';

import { CollectionService } from './collection.service';
import { MillieuService } from './millieu/millieu.service';
import { DataService } from './data.service';
import { Utilities } from './utilities';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    AeoHeaderComponent,
    FilterVueComponent,
    IntroVueComponent,
    ItemControlsComponent,
    JemAddTileComponent,
    JemCollectionTileComponent,
    JemComponent,
    JemDashBoardComponent,
    JemListTileComponent,
    JemSmallComponent,
    JemUpdateTileComponent,
    ModalMillieuVueComponent,
    SizedItemsVueControlsComponent,
    VueControlsComponent
  ],
  providers: [
    CollectionService, MillieuService, DataService, Utilities
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
