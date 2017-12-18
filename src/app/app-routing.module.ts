import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JemMilieuComponent } from './jems/jem-milieu.component';
import { AppContentComponent} from './app.content.component';

const routes: Routes = [
  //{ path: 'account', component: AccountMilieuComponent },
  { path: 'code-jems', component: JemMilieuComponent },
  { path: 'code-jems/tech/:tech', component: JemMilieuComponent },
  { path: 'code-jems/type/:type', component: JemMilieuComponent },
  { path: 'code-jems/tech/:tech/type/:type', component: JemMilieuComponent },
  //{ path: 'jody', component: MagicHandsHealingComponent},
  //{ path: 'real-estate-agent', component: RealEstateAgentMilieuComponent },
  { path: '', component: AppContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //exports: [RouterModule]
})
export class AppRoutingModule { }
