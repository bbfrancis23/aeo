import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AeoHeaderComponent} from './aeo-header.component';
import {DashboardComponent} from './dashboard.component';

import {HttpModule} from '@angular/http';
import {DataService} from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    AeoHeaderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
