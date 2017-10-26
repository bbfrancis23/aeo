import { Component } from '@angular/core';
import { MilieuVueComponent } from '../milieu/milieu-vue.component';
import { MilieuService } from '../milieu/milieu.service';

'use strict';

@Component({
  selector: 'log-in-vue',
  template: `
    <div class="card border-primary tile text-white" style="margin-top: 10px">
      <div class="card-header bg-primary"><h4>Log In</h4></div>
      <div class="card-block p-3" >
        <div >
          <form >

            <div class="form-group">
              <label for="email" class="sr-only">Email</label>
              <input type="text" class="form-control " id="email"  name="Email" placeholder="Email" required>
            </div>
            <div class="form-group">
              <label for="email" class="sr-only">Password</label>
              <input type="text" class="form-control " id="password"  name="Password" placeholder="Password" required>
            </div>
            <button type="submit" class="btn btn-outline-info float-right"  >Log In</button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class LogInVueComponent extends MilieuVueComponent {
  //submitted = false
  //model: Jem = new Jem();

  constructor(protected data: MilieuService) {
    super(data);
  }

  onSubmit(): void {
  }


}

/* Copyright AEO all rights reserved */
