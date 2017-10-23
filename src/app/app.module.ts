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
import { JemAddVueComponent } from './jems/jem-add-vue.component';
import { JemMillieuComponent } from './jems/jem-millieu.component';
import { JemListVueComponent } from './jems/jem-list-vue.component';
import { JemUpdateVueComponent } from './jems/jem-update-vue.component';
import { JemCollectionVueComponent } from './jems/jem-collection-vue.component';
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
    JemAddVueComponent,
    JemCollectionVueComponent,
    JemComponent,
    JemMillieuComponent,
    JemListVueComponent,
    JemSmallComponent,
    JemUpdateVueComponent,
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
