import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { MilieuModule } from './milieu.module';

import { AeoFooterComponent } from './aeo-footer.component';
import { AeoHeaderComponent } from './aeo-header.component';
import { HomeComponent } from './home.component';
import { ItemSearchComponent} from './milieu/item-search.component';
import { ViewPortComponent } from './view-port.component';

import { JemAddVueComponent } from './jems/jem-add-vue.component';
import { JemMilieuComponent } from './jems/jem-milieu.component';
import { JemListVueComponent } from './jems/jem-list-vue.component';
import { JemUpdateVueComponent } from './jems/jem-update-vue.component';
import { JemCollectionVueComponent } from './jems/jem-collection-vue.component';
import { JemComponent } from './jems/jem.component';
import { JemSmallComponent } from './jems/jem-sm.component';
import { JemService } from './jems/jem.service';

//import { AgentVueComponent} from './real-estate/agent-vue.component';
//import { RealEstateAgentMilieuComponent} from './real-estate/real-estate-milieu.component';
//import { RealEstateAgentService} from './real-estate/real-estate-agent.service';

import { AccountMilieuComponent } from './account/account-milieu.component';

//import { MagicHandsHealingComponent } from './jody/magic-hands-healing.component';

import { CollectionService } from './collection.service';
import { Utilities } from './utilities';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MilieuModule
  ],
  declarations: [
    AccountMilieuComponent,

    AeoFooterComponent,
    AeoHeaderComponent,
    AppComponent,
    HomeComponent,
    ItemSearchComponent,
    ViewPortComponent,

    JemAddVueComponent,
    JemCollectionVueComponent,
    JemComponent,
    JemListVueComponent,
    JemMilieuComponent,
    JemSmallComponent,
    JemUpdateVueComponent,

    //MagicHandsHealingComponent,

    //AgentVueComponent,
    //RealEstateAgentMilieuComponent
  ],
  providers: [
    CollectionService, Utilities, JemService, //RealEstateAgentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
