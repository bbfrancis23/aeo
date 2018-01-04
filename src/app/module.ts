import { AppRoutingModule } from './routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MilieuModule } from './milieu/module';
import { NgModule } from '@angular/core';


import { AppComponent, AppHeaderComponent, AppFooterComponent, AppContentComponent } from './core';

import { AccountServicesComponent } from './account/services.component';

import { CreateAccountVueComponent } from "./account/create-account-vue.component";
import { AccountMilieuComponent } from './account/account-milieu.component';
import { AccountVueComponent } from './account/account-vue.component';
import { AccountService } from './account/account.service';

import { JemAddVueComponent } from './jems/jem-add-vue.component';
import { JemMilieuComponent } from './jems/jem-milieu.component';
import { JemListVueComponent } from './jems/jem-list-vue.component';
import { JemUpdateVueComponent } from './jems/jem-update-vue.component';
import { JemCollectionVueComponent } from './jems/jem-collection-vue.component';
import { JemComponent } from './jems/jem.component';
import { JemSmallComponent } from './jems/jem-sm.component';
import { JemService } from './jems/jem.service';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MilieuModule
  ],
  exports:[
  ],
  declarations: [
    AppFooterComponent,
    AppHeaderComponent,
    AccountServicesComponent,
    AppComponent,
    AppContentComponent,

    AccountMilieuComponent,
    AccountVueComponent,
    CreateAccountVueComponent,

    JemAddVueComponent,
    JemCollectionVueComponent,
    JemComponent,
    JemListVueComponent,
    JemMilieuComponent,
    JemSmallComponent,
    JemUpdateVueComponent,
  ],
  providers: [
    JemService, AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
