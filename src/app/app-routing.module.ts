import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountMilieuComponent } from './account/account-milieu.component';
import { JemMilieuComponent } from './jems/jem-milieu.component';
import { HomeComponent} from './home.component';
import { MagicHandsHealingComponent } from './jody/magic-hands-healing.component';
import { RealEstateAgentMilieuComponent} from './real-estate/real-estate-milieu.component';

const routes: Routes = [
  { path: 'account', component: AccountMilieuComponent },
  { path: 'code-jems', component: JemMilieuComponent },
  { path: 'code-jems/tech/:tech', component: JemMilieuComponent },
  { path: 'code-jems/type/:type', component: JemMilieuComponent },
  { path: 'code-jems/tech/:tech/type/:type', component: JemMilieuComponent },
  { path: 'jody', component: MagicHandsHealingComponent},
  { path: 'real-estate-agent', component: RealEstateAgentMilieuComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
