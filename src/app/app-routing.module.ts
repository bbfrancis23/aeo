import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountMilieuComponent} from './account/account-milieu.component';
import { AppContentComponent} from './core';
import { JemMilieuComponent } from './jems/jem-milieu.component';


const routes: Routes = [
  { path: 'account', component: AccountMilieuComponent},
  { path: 'code-jems', component: JemMilieuComponent },
  { path: 'code-jems/tech/:tech', component: JemMilieuComponent },
  { path: 'code-jems/type/:type', component: JemMilieuComponent },
  { path: 'code-jems/tech/:tech/type/:type', component: JemMilieuComponent },
  { path: '', component: AppContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
