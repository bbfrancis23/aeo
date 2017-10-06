import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JemDashBoardComponent } from './jems/jem-dash-board.component';

const routes: Routes = [
  { path: 'code-jems', component: JemDashBoardComponent },
  { path: 'code-jems/tech/:tech', component: JemDashBoardComponent },
  { path: 'code-jems/type/:type', component: JemDashBoardComponent },
  { path: 'code-jems/tech/:tech/type/:type', component: JemDashBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
