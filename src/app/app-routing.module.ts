import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JemMillieuComponent } from './jems/jem-millieu.component';

const routes: Routes = [
  { path: 'code-jems', component: JemMillieuComponent },
  { path: 'code-jems/tech/:tech', component: JemMillieuComponent },
  { path: 'code-jems/type/:type', component: JemMillieuComponent },
  { path: 'code-jems/tech/:tech/type/:type', component: JemMillieuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
