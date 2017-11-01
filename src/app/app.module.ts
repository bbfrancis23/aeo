import { AppRoutingModule } from './app-routing.module';
import { MilieuModule } from './milieu.module';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AeoHeaderComponent } from './aeo-header.component';
import { AppComponent } from './app.component';

import { JemAddVueComponent } from './jems/jem-add-vue.component';
import { JemMilieuComponent } from './jems/jem-milieu.component';
import { JemListVueComponent } from './jems/jem-list-vue.component';
import { JemUpdateVueComponent } from './jems/jem-update-vue.component';
import { JemCollectionVueComponent } from './jems/jem-collection-vue.component';
import { JemComponent } from './jems/jem.component';
import { JemSmallComponent } from './jems/jem-sm.component';
import { JemService } from './jems/jem.service';

import { AccountMilieuComponent } from './account/account-milieu.component';
import { MagicHandsHealingComponent } from './jody/magic-hands-healing.component';

import { CollectionService } from './collection.service';
import { Utilities } from './utilities';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MilieuModule
  ],
  declarations: [
    AppComponent,
    AeoHeaderComponent,

    JemAddVueComponent,
    JemCollectionVueComponent,
    JemComponent,
    JemMilieuComponent,
    JemListVueComponent,
    JemSmallComponent,
    JemUpdateVueComponent,

    AccountMilieuComponent,

    MagicHandsHealingComponent
  ],
  providers: [
    CollectionService, Utilities
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
