import { AppRoutingModule } from './routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MilieuModule } from './milieu/module';
import { JemsModule} from './jems/module';
import { NgModule } from '@angular/core';


import { AppComponent, AppHeaderComponent, AppFooterComponent, AppContentComponent } from './core';

import { AccountServicesComponent } from './account/services.component';

import { CreateAccountVueComponent } from "./account/create-account-vue.component";
import { AccountMilieuComponent } from './account/account-milieu.component';
import { AccountVueComponent } from './account/account-vue.component';
import { AccountService } from './account/account.service';


import { JemMilieuComponent } from './jems/jem-milieu.component';
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
    MilieuModule,
    JemsModule
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
    //JemMilieuComponent,
  ],

  exports:[ ],
  providers: [
    JemService, AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
