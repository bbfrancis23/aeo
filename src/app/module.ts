import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './routing.module';

import { AccountModule } from './account/module';
import { JemsModule } from './jems/module';
import { MilieuModule } from './milieu/module';

import { AppComponent, AppHeaderComponent, AppFooterComponent, AppContentComponent } from './core';

import { AccountService } from './account/data';
import { AppService } from './data';
import { JemService } from './jems/jem.service';

@NgModule({
  imports: [AccountModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    JemsModule,
    HttpModule,
    MilieuModule,
    RouterModule],
  declarations: [AppFooterComponent, AppHeaderComponent, AppComponent, AppContentComponent],
  providers: [AccountService, AppService, JemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
