import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AeoHeaderComponent } from './aeo-header.component';
import { AppComponent } from './app.component';
import { FilterVueComponent } from './milieu/filter-vue.component';
import { IntroVueComponent } from './milieu/intro-vue.component';
import { ItemControlsComponent } from './milieu/item-controls.component';
import { JemAddVueComponent } from './jems/jem-add-vue.component';
import { JemMilieuComponent } from './jems/jem-milieu.component';
import { JemListVueComponent } from './jems/jem-list-vue.component';
import { JemUpdateVueComponent } from './jems/jem-update-vue.component';
import { JemCollectionVueComponent } from './jems/jem-collection-vue.component';
import { ModalMilieuVueComponent } from './milieu/modal-milieu-vue.component';
import { SizedItemsVueControlsComponent } from './milieu/sized-items-vue-controls.component';
import { VueControlsComponent } from './milieu/vue-controls.component';
import { JemComponent } from './jems/jem.component';
import { JemSmallComponent } from './jems/jem-sm.component';

import { CollectionService } from './collection.service';
import { MilieuService } from './milieu/milieu.service';
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
    JemMilieuComponent,
    JemListVueComponent,
    JemSmallComponent,
    JemUpdateVueComponent,
    ModalMilieuVueComponent,
    SizedItemsVueControlsComponent,
    VueControlsComponent
  ],
  providers: [
    CollectionService, MilieuService, DataService, Utilities
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
