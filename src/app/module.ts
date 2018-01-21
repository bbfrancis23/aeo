import { CommonModule }                     from '@angular/common';
import { NgModule }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import { BrowserModule }                    from '@angular/platform-browser';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';

import { AppRoutingModule } from './routing.module';

import { AccountModule } from './account/module';
import { JemsModule}     from './jems/module';
import { MilieuModule }  from './milieu/module';

import { AppComponent, AppHeaderComponent, AppFooterComponent, AppContentComponent } from './core';

import { AccountService } from './account/data';
import { JemService }     from './jems/jem.service';

@NgModule({
  imports: [
    AccountModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    JemsModule,
    HttpModule,
    MilieuModule,
    ReactiveFormsModule
  ],
  declarations: [ AppFooterComponent, AppHeaderComponent, AppComponent, AppContentComponent ],
  exports:[ ],
  providers: [ JemService, AccountService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
