import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LogInVueComponent } from './milieu/log-in-vue.component';

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
import { ModalControlsComponent } from './milieu/modal-controls.component';
import { ModalMilieuVueComponent } from './milieu/modal-milieu-vue.component';
import { SizedItemsVueControlsComponent } from './milieu/sized-items-vue-controls.component';
import { VueControlsComponent } from './milieu/vue-controls.component';
import { JemComponent } from './jems/jem.component';
import { JemSmallComponent } from './jems/jem-sm.component';
import { JemService } from './jems/jem.service';

import { AccountMilieuComponent } from './account/account-milieu.component';

import { CollectionService } from './collection.service';
import { Utilities } from './utilities';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    // global
    AppComponent,
    AeoHeaderComponent,

    // Milieu
    FilterVueComponent,
    IntroVueComponent,
    ItemControlsComponent,
    LogInVueComponent,
    ModalControlsComponent,
    ModalMilieuVueComponent,
    SizedItemsVueControlsComponent,
    VueControlsComponent,

    // Jem Milieu
    JemAddVueComponent,
    JemCollectionVueComponent,
    JemComponent,
    JemMilieuComponent,
    JemListVueComponent,
    JemSmallComponent,
    JemUpdateVueComponent,

    // Account Milieu
    AccountMilieuComponent
  ],
  providers: [
    CollectionService, Utilities
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
